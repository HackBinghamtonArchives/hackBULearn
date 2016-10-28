var express = require('express');
var session = require('express-session');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var bcrypt = require('bcrypt');
var validator = require('validator');

var BC_LEVEL = 10;
var db = null;
var users = null;
var courses = null;
var url = 'mongodb://localhost:27017/hackBULearn';

MongoClient.connect(url, function(err, database) {
    if(err != null) {
        console.error("Alert: no db connection :(");
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
            console.log(req.query.email);
            users.findOne({'email': validator.normalizeEmail(req.query.email)}, function(err, docs) {
                if(!docs) {
                    err = "Invalid email";
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
                    err = "There is already an account with that username";
                else if(!req.body.user)
                    err = "Invalid username";

                callback(err, docs);
            });
        },
        function(docs, callback) {
            users.findOne({'email': validator.normalizeEmail(req.body.email)}, function(err, docs) {
                if(docs)
                    err = "There is already an account with that email";
                else if(!req.body.email || !validator.isEmail(req.body.email))
                    err = "Invalid email";
                else if (req.body.pass.length < 8)
                    err = "Password is not long enough";
                else if(req.body.pass == req.body.pass.replace(/[A-Z]/g, '') ||
                        req.body.pass == req.body.pass.replace(/[a-z]/g, '') || 
                        req.body.pass == req.body.pass.replace(/[0-9]/g, '')) {
                    err = "Password is missing: ";
                    if(req.body.pass == req.body.pass.replace(/[A-Z]/g, ''))
                        err += "\nUppercase letters";
                    if(req.body.pass == req.body.pass.replace(/[a-z]/g, ''))
                        err += "\nLowercase letters";
                    if(req.body.pass == req.body.pass.replace(/[0-9]/g, '')) 
                        err += "\nNumbers";
                }

                callback(err, docs);
            });
        },
        function(docs, callback) {
            bcrypt.hash(req.body.pass, BC_LEVEL, function(err, hash) {
                if(err) {
                    callback(err);
                    return;
                }
                callback(err, hash);
            });
        },
        function(hash, callback) {
            users.insertOne({'user': req.body.user, 'email': validator.normalizeEmail(req.body.email), 'password': hash}, function(err, result) {
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

router.get('/courses', function(req, res, next) {
    if(!req.session.user) {
        res.status(401);
        res.send("Not logged in");
        return;
    }
    if(db == null) {
        res.status(500);
        res.send("No mongo connection, please try again later");
        return;
    }

    var user = req.session.user;
    courses = db.collection('courses');
    courses.find({
        user: user
    }).toArray(function(err, docs) {
        res.send(docs);
    });
});

router.post('/addProduct', function(req, res, next) {
    if(!req.session.user) {
        res.status(401);
        res.send("Not logged in");
        return;
    }
    if(db == null) {
        res.status(500);
        res.send("No mongo connection, please try again later");
        return;
    }

    courses = db.collection('courses');
    product = req.body;
    product.user = req.session.user;
    courses.insertOne(product, function(err, result) {
        if(err) {
            res.status(500);
            res.send(err);
            return;
        }
        res.send(result);
    });
});

router.post('/updateProduct', function(req, res, next) {
    if(!req.session.user) {
        res.status(401);
        res.send("Not logged in");
        return;
    }
    if(db == null) {
        res.status(500);
        res.send("No mongo connection, please try again later");
        return;
    }

    courses = db.collection('courses');
    product = req.body;
    product.user = req.session.user;
    courses.updateOne({ "_id": new ObjectID(product._id) }, { $set: { "qty": product.qty }}, function(err, result) {
        if(err) {
            res.status(500);
            res.send(err);
            return;
        }
        res.send(result);
    });
});

router.post('/deleteProduct', function(req, res, next) {
    if(!req.session.user) {
        res.status(401);
        res.send("Not logged in");
        return;
    }
    if(db == null) {
        res.status(500);
        res.send("No mongo connection, please try again later");
        return;
    }

    courses = db.collection('courses');
    courses.removeOne({'_id': ObjectID(req.body._id)}, function(err, results) {
        if(err) {
            res.status(500);
            res.send(err);
            return;
        }
        res.send(results);
    });
});

module.exports = router;
