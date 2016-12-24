const async = require('async');
var User = require('../models/user');
var Hackathon = require('../models/hackathon');

module.exports = function(app) {
  const publicFields = 'name location dates bannerImage websiteURL registrationURL';

  app.get('/hackathons', function(req, res) {
    Hackathon.find({}, publicFields, function(error, results) {
      if(error) throw error;
      res.json(results);
    })
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
