const waterfall = require('async/waterfall');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const strings = require('./strings');

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
    usernameField : 'local[username]',
    passwordField : 'local[password]',
    passReqToCallback : true
  }, function(req, username, password, next) {
    User.findOne({ 'local.username': username }, function(err, user) {
      if(err) return next(err);
      if(!user) return next({
        name: 'ValidationError',
        message: strings.userNotFound
      });

      user.validatePassword(password, function(err, isValid) {
        if(err) return next(err);
        if(!isValid) return next({
          name: 'ValidationError',
          message: strings.wrongPassword
        });

        return next(null, user);
      });
    });
  }));
}
