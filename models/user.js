const ObjectId = require('mongodb').ObjectId;
const async = require('async');
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');

// Generate model
const schema = mongoose.Schema({
  local: {
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String
  }
});

// Authentication methods
schema.methods.generateHash = function(password, callback) {
  return bcrypt.hash(password, 10, callback);
}

schema.methods.validatePassword = function(password, callback) {
  return bcrypt.compare(password, this.local.password, callback);
}

module.exports = mongoose.model('User', schema);
