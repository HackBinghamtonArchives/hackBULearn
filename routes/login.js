var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.render('login', { title: 'HackBU Learn' })
});

router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/dashboard'
}));

module.exports = router;
