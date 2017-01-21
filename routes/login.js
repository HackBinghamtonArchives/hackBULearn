var router = require('express').Router();

router.get('/', function(req, res) {
  if(req.isAuthenticated()) return res.redirect('/dashboard');
  res.render('login', { title: 'HackBU Learn' });
});

module.exports = router;
