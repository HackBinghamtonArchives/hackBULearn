const async = require('async');
var User = require('../models/user');
var Video = require('../models/video');
var minimumRole = require('../middleware').roles;

module.exports = function(app) {
  const publicFields = 'local.username local.firstname local.lastname videos permission';
  const adminFields = publicFields + ' local.email';

  app.get('/users', minimumRole('administrator'), function(req, res) {
    User.find({}, adminFields, function(err, users) {
      if(err) throw err;
      res.json(users);
    });
  });

  app.get('/user/info', minimumRole('member'), function(req, res) {
    User.findOne({ _id: req.user.id }, publicFields,
      function(error, results) {
        if(error) throw error;
        res.json(results);
      })
  });

  app.post('/user/videos/add/:id', minimumRole('member'), function(req, res) {
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

  app.post('/user/update', minimumRole('superuser'), function(req, res) {
    async.waterfall([
      function(next) {
        // Map form data to schema
        var formData = {
          local: {
            firstname : req.body.local.firstname,
            lastname : req.body.local.lastname,
            username : req.body.local.username,
            email : req.body.local.email
          },
          permission: req.body.permission
        };

        User.findOneAndUpdate({_id: req.body._id},
          formData, { new: true }, next);
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });

  app.post('/user/delete', minimumRole('superuser'), function(req, res) {
    if(req.body._id == req.user['_id'])
      return res.status(500).json({ error: 'Cannot delete self' });

    async.waterfall([
      function(next) {
        User.remove({_id: req.body._id}).exec(next);
      },
      function(result, next) {
        User.find({}, adminFields, next)
      }
    ], function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });
}
