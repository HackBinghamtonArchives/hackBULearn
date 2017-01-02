// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var constants = require('./config/constants');

// Connect to database
const env = process.env.NODE_ENV;
const dbUrl = constants.dburl[env];
mongoose.connect(dbUrl);

// Configure Authentication Library
require('./config/passport')(passport);

// Initialize App
var app = express();

// Configure Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if(env !== 'test') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Configure passport
app.use(passport.initialize());
app.use(passport.session());

// Attach Routes
require('./routes/login')(app, passport);
app.use('/api/courses', require('./routes/api/courses'));
app.use('/api/hackathons', require('./routes/api/hackathons'));

// Attach 404 Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler - Dev
if (app.get('env') === 'dev' ||
    app.get('env') === 'test') {
  app.use(function(err, req, res, next) {
    res.json(err);
  });
}

// Error Handler - Prod
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
