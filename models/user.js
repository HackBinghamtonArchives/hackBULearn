const async = require('async');
var bcrypt   = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

// Generate model
const schema = Schema({
  local: {
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String
  },
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
  permission: Number
});

// Authentication methods
schema.methods.generateHash = function(password, callback) {
  return bcrypt.hash(password, 10, callback);
}

schema.methods.validatePassword = function(password, callback) {
  return bcrypt.compare(password, this.local.password, callback);
}

module.exports = mongoose.model('User', schema);
