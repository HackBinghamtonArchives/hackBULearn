var router = require('express').Router();

router.get('/', function(req, res) {
  res.json({
    version: '1.0.0',
    message: 'Welcome to the HackBU API.'
  })
});

router.use('/courses', require('./courses.js'));
router.use('/hackathons', require('./hackathons.js'));
router.use('/videos', require('./videos.js'));

module.exports = router;
