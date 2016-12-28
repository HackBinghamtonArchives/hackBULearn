const async = require('async');
var User = require('../models/user');
var Hackathon = require('../models/hackathon');
const validators = require('../config/validators');
const validate = require('validate.js');

module.exports = function(app) {
  const publicFields = 'name location dates bannerImage websiteURL registrationURL';

  app.get('/hackathons', function(req, res) {
    Hackathon.find({}, publicFields, function(error, results) {
      if(error) throw error;
      res.json(results);
    })
  });

  app.post('/hackathons/update', function(req, res) {
    if(!req.isAuthenticated() || req.user['permission'] > 2)
      return res.json({ error: 'Access Denied' });

    async.waterfall([
      function(next) {
        // Validate inputs
        return next(validate(req.body, validators.hackathonForm));
      },
      function(next) {
        // Map form data to schema
        var formData = {
          name : req.body.name,
          location : {
            facility : req.body.facility,
            university : req.body.university,
            streetAddress : req.body.streetAddress,
            city : req.body.city,
            state : req.body.state,
            zipCode : req.body.zipCode,
            country : req.body.country
          },
          dates : {
            start : req.body.startDate,
            end : req.body.endDate
          },
          bannerImage : req.body.bannerImage,
          websiteURL : req.body.websiteURL,
          registrationURL : req.body.registrationURL,
          capacity : req.body.capacity
        };

        Hackathon.findOneAndUpdate({_id: req.body._id},
          formData, { new: true }, next);
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

  app.post('/hackathons/create', function(req, res) {
    if(!req.isAuthenticated() || req.user['permission'] <= 2)
      return res.json({ error: 'Access Denied' });

    async.waterfall([
      function(next) {
        // Validate inputs
        return next(validate(req.body, validators.hackathonForm));
      },
      function(next) {
        // Map form data to schema
        var formData = {
          name : req.body.name,
          location : {
            facility : req.body.facility,
            university : req.body.university,
            streetAddress : req.body.streetAddress,
            city : req.body.city,
            state : req.body.state,
            zipCode : req.body.zipCode,
            country : req.body.country
          },
          dates : {
            start : req.body.startDate,
            end : req.body.endDate
          },
          bannerImage : req.body.bannerImage,
          websiteURL : req.body.websiteURL,
          registrationURL : req.body.registrationURL,
          capacity : req.body.capacity,
          users: [],
          creator: req.user['_id']
        };

        const hackathon = new Hackathon(formData);
        hackathon.save(next);
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

  app.post('/hackathons/:id/register', function(req, res) {
    if(!req.isAuthenticated()) return res.json({ error: 'Access Denied' });
    async.waterfall([
      function(next) {
        // Locate the requested hackathon
        Hackathon.findById(req.params.id, next);
      },
      function(hackathon, next) {
        // Add the new video to the User's video array
        if(!hackathon) return next('Hackathon not found');
        if(hackathon.users.indexOf(req.user['_id']) == -1) {
          hackathon.users.push(req.user['_id']);
        }
        next(null, hackathon);
      },
      function(hackathon, next) {
        // Update the Hackathon document
        Hackathon.findOneAndUpdate({ _id: hackathon._id }, { users: hackathon.users },
          { new: true, fields: publicFields }, next);
      }
    ], function(error, results) {
      // Return the results
      if(error) throw error;
      res.json(results);
    });
  });
}
