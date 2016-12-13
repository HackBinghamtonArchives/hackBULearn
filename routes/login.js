const strings = require('../config/strings');

module.exports = function(app, passport) {
  app.get('/login', isAuthenticated, function(req, res) {
    res.render('login', { title: 'HackBU Learn' });
  });

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.json({ success: strings.welcome });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  function isAuthenticated(req, res, next) {
    if(!req.isAuthenticated()) return next();
    res.redirect('/dashboard');
  }
}
