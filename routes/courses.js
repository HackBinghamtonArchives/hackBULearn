const async = require('async');
const validators = require('../config/validators');
const validate = require('validate.js');
var Course = require('../models/course');

module.exports = function(app) {
  app.get('/courses', function(req, res) {
    Course.find({}, 'title description thumbnail', function(error, results) {
      if(error) throw error;
      res.json(results);
    })
  });

  app.get('/courses/:id', function(req, res) {
    Course.findOne({ _id: req.params.id })
          .populate('videos')
          .exec(function(error, results) {
            if(error) throw error;
            res.json(results);
          });
  });

  app.post('/courses/update', function(req, res) {
    if(!req.isAuthenticated() || req.user['permission'] > 2)
      return res.json({ error: 'Access Denied' });

    async.waterfall([
      function(next) {
        // Validate inputs
        return next(validate(req.body, validators.courseForm));
      },
      function(next) {
        // Map form data to schema
        var formData = {
          title : req.body.title,
          description: req.body.description,
          thumbnail: req.body.thumbnail
        };

        Course.findOneAndUpdate({_id: req.body._id},
          formData, { new: true }, next);
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

  app.post('/courses/delete', function(req, res) {
    if(!req.isAuthenticated() || req.user['permission'] > 2)
      return res.json({ error: 'Access Denied' });

    async.waterfall([
      function(next) {
        Course.remove({_id: req.body._id}).exec(next);
      },
      function(result, next) {
        Course.find({}, 'title description thumbnail', next)
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

  app.post('/courses/create', function(req, res) {
    if(!req.isAuthenticated() || req.user['permission'] > 2)
      return res.json({ error: 'Access Denied' });

    async.waterfall([
      function(next) {
        // Validate inputs
        return next(validate(req.body, validators.courseForm));
      },
      function(next) {
        // Map form data to schema
        var formData = {
          title : req.body.title,
          description: req.body.description,
          thumbnail: req.body.thumbnail
        };

        Course.create(formData, next);
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });
}
