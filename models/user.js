const ObjectId = require('mongodb').ObjectId;
const async = require('async');
const db = require('../config/db');

// Authentication Logic
exports.authenticate = function(username, password, callback) {
  return async.waterfall([
    db.get,
    function(database, done) {
      if(error) return done(error);
      database.collection('users').findOne({ username: username }, done);
    },
    function(user, done) {
      if(!user) {
        return done(null, false, { message: 'Invalid Username' });
      }

      if(!user.validPassword(password)) {
        return done(null, false, { message: 'Invalid Password' });
      }

      return done(null, user);
    },
    callback
  ])
}

// Serialization Logic
exports.serializeUser = function(user, callback) {
  return callback(null, user.id);
}

// Deserialization Logic
exports.deserializeUser = function(id, callback) {
  return User.findById(id, callback);
}
