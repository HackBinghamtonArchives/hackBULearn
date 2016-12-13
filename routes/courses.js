var Video = require('../models/video');
var Course = require('../models/course');

module.exports = function(app) {
  app.get('/courses', function(req, res, next) {
    Course.find({}, 'title description thumbnail', function(error, results) {
      if(error) throw error;
      res.json(results);
    })
  });

  app.get('/courses/:id', function(req, res, next) {
    Course.findOne({ _id: req.params.id })
          .populate('videos')
          .exec(function(error, results) {
            if(error) throw error;
            res.json(results);
          });
  });
}
