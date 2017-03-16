const async = require('async');
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;
const strings = require('../config/strings');
const isEmail = require('validator/lib/isEmail');
const _ = require('lodash');

// Generate model
const schema = Schema({
  local: {
    username: { type: String, required: [true, strings.missingUsername] },
    password: { type: String, required: [true, strings.missingPassword] },
    email: { type: String, required: [true, strings.missingEmail] },
    firstname: { type: String, required: [true, strings.missingFirstName] },
    lastname: { type: String, required: [true, strings.missingLastName] }
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  permission: { type: String, required: true, default: 'member' }
});

// Authentication methods
schema.methods.generateHash = function(password, callback) {
  return bcrypt.hash(password, 10, callback);
}

schema.methods.validatePassword = function(password, callback) {
  return bcrypt.compare(password, this.local.password, callback);
}

// Create model based on schema
const User = mongoose.model('User', schema);

// Add uniqueness validator for username
User.schema.path('local.username').validate(function(value, callback) {
  if(!this.isModified('local.username')) return callback(true);

  User.find({ 'local.username': value.toLowerCase() }, function(err, results) {
    callback(err || results.length === 0);
  });
}, strings.usernameTaken);

// Add uniqueness validator for email
User.schema.path('local.email').validate(function(value, callback) {
  if(!this.isModified('local.email')) return callback(true);

  User.find({ 'local.email': value.toLowerCase() }, function(err, results) {
    callback(err || results.length === 0);
  });
}, strings.emailTaken);

// Add syntax validator for email
User.schema.path('local.email').validate(function(value, callback) {
  if(!this.isModified('local.email')) return callback(true);

  callback(isEmail(value));
}, strings.emailMalformed);

// Add length validator for password
User.schema.path('local.password').validate(function(value, callback) {
  callback(value.length >= 10);
}, strings.passwordTooShort);

// Add password encryption middleware
User.schema.pre('save', function(next) {
  if(!this.isModified('local.password')) return next();

  var user = this;
  this.generateHash(user.local.password, function(err, hash) {
    if(err) return next(err);
    user.local.password = hash;
    next();
  });
});

module.exports = User;
