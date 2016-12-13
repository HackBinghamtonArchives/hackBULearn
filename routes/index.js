module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.get('/dashboard*', function(req, res) {
    if(req.isAuthenticated())
      return res.render('dashboard', { title: 'HackBU Learn' });
    res.redirect('/login');
  });
}
