const ObjectId = require('mongodb').ObjectId;
const db = require('../config/db');

exports.create = function(title, course, videoid, callback) {
  var video = {
    title: title,
    course: course,
    videoid: videoid
  };

  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('videos').save(video, callback);
  });
}

exports.read = function(id, callback) {
  if(!ObjectId.isValid(id)) return callback(new Error("Invalid ID"));
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('videos').findOne({_id: ObjectId(id)}, callback);
  });
}

exports.update = function(id, data, callback) {
  if(!ObjectId.isValid(id)) return callback(new Error("Invalid ID"));
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('videos').findOneAndUpdate({_id: ObjectId(id)}, callback);
  });
}

exports.delete = function(id, callback) {
  if(!ObjectId.isValid(id)) return callback(new Error("Invalid ID"));
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('videos').findOneAndDelete({_id: ObjectId(id)}, callback);
  });
}

exports.all = function(callback) {
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('videos').find({}).toArray(callback);
  });
}
