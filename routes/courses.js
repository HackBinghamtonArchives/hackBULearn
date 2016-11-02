var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var validator = require('validator');

var BC_LEVEL = 10;
var db = null;
var courses = null;
var url = 'mongodb://localhost:27017/hackBULearn';

MongoClient.connect(url, function(err, database) {
    if(err != null) {
        console.error("Alert: no db connection :(");
    }
    else {
        db = database;
        courses = db.collection('courses');
        console.log("Connected correctly to courses");
    }
});

router.get('/allCourses', function(req, res, next) {
    if(db == null) {
        res.status(500);
        res.send("No mongo connection, please try again later");
        return;
    }

    courses.find({}).toArray(function(err, docs) {
        res.send(docs);
    });
});
module.exports = router;
