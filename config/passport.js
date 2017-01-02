const waterfall = require('async/waterfall');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const strings = require('./strings');
const validators = require('./validators');
const validate = require('validate.js');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, username, password, callback) {
    if(req.body.register) {
      // Register a new user
      waterfall([
        function(next) {
          // Validate inputs
          return next(validate(req.body, validators.userRegistration));
        },
        function(next) {
          // Check if username is taken
          return User.findOne({'local.username': username}, next);
        },
        function(user, next) {
          // Create new user
          if(user) return next({ username: [ strings.usernameTaken ] });
          var newUser = new User({
            local: {
              username: username,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email
            },
            permission: 'member',
            videos: []
          });
          next(null, newUser);
        },
        function(user, next) {
          // Encrypt password
          return user.generateHash(password, function(err, hash) {
            next(err, user, hash);
          });
        },
        function(user, password, next) {
          // Save password hash
          user.local.password = password;
          user.save(next);
        }
      ], function(err, user) {
        // Return to router
        return callback(err, user);
      });
    } else {
      // Login an existing user
      waterfall([
        function(next) {
          // Validate inputs
          return next(validate(req.body, validators.userLogin));
        },
        function(next) {
          // Find if user exists
          return User.findOne({'local.username': username}, next);
        },
        function(user, next) {
          // Check if password matches
          if(!user) return next({ username: [ strings.userNotFound ] });
          return user.validatePassword(password, function(err, isValid) {
            next(err, isValid, user);
          });
        },
        function(isValid, user, next) {
          // Send error message if password is invalid
          if(!isValid) return next({ password: [ strings.wrongPassword ] });
          return callback(null, user);
        }
      ], function(err, user) {
        // Return to router
        return callback(err, user);
      });
    }
  }));
}
