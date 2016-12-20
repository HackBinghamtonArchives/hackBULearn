const async = require('async');
var User = require('../models/user');
var Video = require('../models/video');

module.exports = function(app) {
  const publicFields = 'local.username local.firstname videos';

  app.get('/user/info', function(req, res) {
    if(!req.isAuthenticated()) return res.json({ error: 'Access Denied' });

    User.findOne({ _id: req.user.id }, publicFields,
      function(error, results) {
        if(error) throw error;
        res.json(results);
      })
  });

  app.get('/user/videos/add/:id', function(req, res) {
    if(!req.isAuthenticated()) return res.json({ error: 'Access Denied' });
    async.waterfall([
      function(next) {
        // Find the current User and the requested Video
        async.parallel({
          user: function(callback) {
            User.findById(req.user['_id'], callback);
          },
          video: function(callback) {
            Video.findById(req.params.id, callback);
          }
        }, next);
      },
      function(results, next) {
        // Add the new video to the User's video array
        if(!results.user || !results.video) return next('User and/or Video not found');
        if(results.user.videos.indexOf(results.video._id) == -1) {
          results.user.videos.push(results.video._id);
        }
        next(null, results.user);
      },
      function(user, next) {
        // Update the User document
        User.findOneAndUpdate({ _id: user._id }, { videos: user.videos },
          { new: true, fields: publicFields }, next);
      }
    ], function(error, results) {
      // Return the results
      if(error) throw error;
      res.json(results);
    });
  });
}
