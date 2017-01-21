var _ = require('lodash');
var router = require('express').Router();
var map = require('async/map');
var Course = require('../../../models/course');
var Video = require('../../../models/video');
var minimumRole = require('../../../middleware').roles;

const publicFields = ['_id', 'title', 'description', 'thumbnail', 'videos'];

/**
 * Route: GET /courses
 * Returns: Array of all courses
 */
router.get('/', minimumRole('member'), function(req, res, next) {
  Course.find({})
    .select(publicFields.join(' '))
    .populate('videos')
    .exec(function(err, courses) {
      if(err) return next(err);
      return res.json(courses);
    });
});

/**
 * Route: GET /courses/:id
 * Returns: Specific course
 */
router.get('/:id', minimumRole('member'), function(req, res, next) {
  Course.findOne({ _id: req.params.id })
    .select(publicFields.join(' '))
    .populate('videos')
    .exec(function(err, results) {
      if(err) return next(err);
      return res.json(results);
    });
});

/**
 * Route: POST /courses
 * Creates: Course document
 * Returns: New course
 */
router.post('/', minimumRole('administrator'), function(req, res, next) {
  map(req.body.videos, function(video, callback) {
    Video.create(_.omit(video, '_id'), callback);
  }, function(err, videos) {
    if(err) return next(err);

    const formData = _.omitBy({
      title: req.body.title,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      videos: videos
    }, _.isNil);

    const course = new Course(formData);
    course.save(function(err, course) {
      if(err) return next(err);
      return res.json(_.pick(course, publicFields));
    });
  });
});

/**
 * Route: PUT /courses/:id
 * Modifies: Course document
 * Returns: Modified course
 */
router.put('/:id', minimumRole('administrator'), function(req, res, next) {
  map(req.body.videos, function(video, callback) {
    Video.findByIdAndUpdate(video._id, video, { new: true }, callback);
  }, function(err, videos) {
    if(err) return next(err);

    const formData = _.omitBy({
      title: req.body.title,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      videos: videos
    }, _.isNil);

    Course.findByIdAndUpdate(req.params.id, formData, {
      new: true,
      runValidators: true,
      select: publicFields.join(' ')
    })
    .populate('videos')
    .exec(function(err, course) {
      if(err) return next(err);
      return res.json(course);
    });
  });
});

/**
 * Route: DELETE /courses/:id
 * Deletes: Course document
 * Returns: Empty object
 */
router.delete('/:id', minimumRole('administrator'), function(req, res, next) {
  Course.findByIdAndRemove(req.params.id, function(err){
    if(err) return next(err);
    return res.json({});
  })
});

module.exports = router;
