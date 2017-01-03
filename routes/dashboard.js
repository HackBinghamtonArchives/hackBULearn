var router = require('express').Router();

router.get('/*', function(req, res) {
  if(req.isAuthenticated())
    return res.render('dashboard', { title: 'HackBU Learn' });
  res.redirect('/login');
});

module.exports = router;
