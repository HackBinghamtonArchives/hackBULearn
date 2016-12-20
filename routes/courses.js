var Course = require('../models/course');

module.exports = function(app) {
  app.get('/courses', function(req, res) {
    Course.find({}, 'title description thumbnail', function(error, results) {
      if(error) throw error;
      res.json(results);
    })
  });

  app.get('/courses/:id', function(req, res) {
    Course.findOne({ _id: req.params.id })
          .populate('videos')
          .exec(function(error, results) {
            if(error) throw error;
            res.json(results);
          });
  });
}
