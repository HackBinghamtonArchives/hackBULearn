var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var bcrypt = require('bcrypt');

var BC_LEVEL = 10;
var db = null;
var users = null;
var url = 'mongodb://localhost:27017/hackBULearn';

MongoClient.connect(url, function(err, database) {
  if(err != null) {
    console.error("Alert: no db connection");
  }
  else {
    db = database;
    users = db.collection('users');
    console.log("Connected correctly to server");
  }
});

router.get('/login', function(req, res, next) {
  if(db == null) {
    res.status(500);
    res.send("No mongo connection, please try again later");
    return;
  }
  async.waterfall([
    function(callback) {
      users.findOne({'user': req.query.user}, function(err, docs) {
        if(!docs) {
          err = "Invalid user";
          callback(err, docs);
          return;
        }
        callback(err, docs);
      });
    },
    function(docs, callback) {
      bcrypt.compare(req.query.pass, docs.password, function(err, res) {
        if(res) {
          req.session.user = docs.user;
        }
        else {
          err = "Invalid password";
        }
        callback(err, docs);
      });
    }
  ],
  function(err, result) {
    if(err) {
      res.status(401);
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
});

router.post('/create', function(req, res, next) {
  if(db == null) {
    res.status(500);
    res.send("No mongo connection, please try again later");
    return;
  }
  async.waterfall([
    function(callback) {
      users.findOne({'user': req.body.user}, function(err, docs) {
        if(docs)
          err = "User exists";
        callback(err, docs);
      });
    },
    function(docs, callback) {
      bcrypt.hash(req.body.pass, BC_LEVEL, function(err, hash) {
        if(err) {
          callback(err);
          return;
        }
        console.log(hash);
        callback(err, hash);
      });
    },
    function(hash, callback) {
      users.insertOne({'user': req.body.user, 'password': hash}, function(err, result) {
        callback(err, result);
      });
    }
  ],
  function(err, result) {
    if(err) {
      res.status(400);
      res.send(err);
      return;
    }
    res.send(result);
  });
});

router.get('/logout', function(req, res, next) {
    //req.session.user = null;
    req.session.destroy();
    res.redirect('/');
});

router.get('/me', function(req, res, next) {
  if(db == null) {
    res.status(500);
    res.send("No mongo connection, please try again later");
    return;
  }
  if(!req.session.user) {
    res.status(401);
    res.send("Not logged in");
    return;
  }
  users.findOne({'user': req.session.user}, function(err, docs) {
    res.send(docs);
  });
});

module.exports = router;
