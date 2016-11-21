var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/hackBULearn';
var db = null

exports.get = function(callback) {
  if(db) return callback(null, db);
  MongoClient.connect(url, callback);
};
