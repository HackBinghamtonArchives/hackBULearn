const ObjectId = require('mongodb').ObjectId;
const async = require('async');
const db = require('../config/db');

exports.create = function(title, description, thumbnail, callback) {
  var course = {
    title: title,
    description: description,
    thumbnail: thumbnail
  };

  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('courses').save(course, callback);
  });
}

exports.read = function(id, callback) {
  async.waterfall([
    function(cb) {
      db.get(cb);
    },
    function(database, cb) {
      if(!ObjectId.isValid(id)) return cb(new Error('Invalid ID'));
      database.collection('courses').findOne({_id: ObjectId(id)}, function(error, course) {
        if(error) cb(error);
        cb(null, database, course);
      });
    },
    function(database, course, cb) {
      database.collection('videos').find({_id: {$in: course.videos}}, function(error, videos) {
        cb(null, videos, course);
      });
    },
    function(videos, course, cb) {
      videos.toArray(function(error, videoArray) {
        course.videos = videoArray;
        cb(null, course);
      });
    }
  ], callback);
}

exports.update = function(id, data, callback) {
  if(!ObjectId.isValid(id)) return callback(new Error("Invalid ID"));
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('courses').findOneAndUpdate({_id: ObjectId(id)}, callback);
  });
}

exports.delete = function(id, callback) {
  if(!ObjectId.isValid(id)) return callback(new Error("Invalid ID"));
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('courses').findOneAndDelete({_id: ObjectId(id)}, callback);
  });
}

exports.all = function(callback) {
  return db.get(function(error, database) {
    if(error) return callback(error);
    database.collection('courses').find({}).toArray(callback);
  });
}
