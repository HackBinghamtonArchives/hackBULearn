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
var errorHandler = require('./middleware/errorHandler');

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
require('./routes/user')(app);
app.use('/login', require('./routes/login'));
app.use('/dashboard', require('./routes/dashboard'));

// Attach API
app.use('/api', require('./routes/api/v1'));

// Attach 404 Handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use(errorHandler);

// Serve application
app.listen(3000);
