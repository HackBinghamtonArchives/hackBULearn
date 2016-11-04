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

/* GET api page. TODO: DEFINITELY improve this logic */
router.get('/api/courses.json', function(req, res, next) {
  res.json({
    courses: [
      {
        id: 0,
        title: 'Intro to Web Development',
        video_count: 5,
        src: '#'
      },
      {
        id: 1,
        title: 'Intro to C++',
        video_count: 10,
        src: '#'
      }
    ]
  })
});

module.exports = router;
