var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET dashboard page. TODO: improve this logic */
router.get('/dashboard*', function(req, res, next) {
  res.render('dashboard', { title: 'HackBU Learn' });
});

module.exports = router;
