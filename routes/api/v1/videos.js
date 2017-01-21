var _ = require('lodash');
var router = require('express').Router();
var Video = require('../../../models/video');
var minimumRole = require('../../../middleware').roles;

const publicFields = ['_id', 'title', 'videoid'];

/**
 * Route: GET /videos
 * Returns: Array of all videos
 */
router.get('/', minimumRole('member'), function(req, res, next) {
  Video.find({}, publicFields.join(' '), function(err, videos) {
    if(err) return next(err);
    return res.json(videos);
  });
});

/**
 * Route: GET /videos/:id
 * Returns: Specific video
 */
router.get('/:id', minimumRole('member'), function(req, res, next) {
  Video.findOne({ _id: req.params.id }, publicFields.join(' '),
    function(err, results) {
      if(err) return next(err);
      return res.json(results);
    });
});

/**
 * Route: POST /videos
 * Creates: Video document
 * Returns: New video
 */
router.post('/', minimumRole('administrator'), function(req, res, next) {
  const formData = _.omitBy({
    title : req.body.title,
    videoid : req.body.videoid
  }, _.isNil);

  const video = new Video(formData);
  video.save(function(err, video) {
    if(err) return next(err);
    return res.json(_.pick(video, publicFields));
  });
});

/**
 * Route: PUT /videos/:id
 * Modifies: videos document
 * Returns: Modified video
 */
router.put('/:id', minimumRole('administrator'), function(req, res, next) {
  const formData = _.omitBy({
    title : req.body.title,
    videoid : req.body.videoid
  }, _.isNil);

  Video.findByIdAndUpdate(req.params.id, formData, {
    new: true,
    runValidators: true,
    select: publicFields.join(' ')
  }, function(err, video) {
    if(err) return next(err);
    return res.json(video);
  });
});

/**
 * Route: DELETE /video/:id
 * Deletes: Video document
 * Returns: Empty object
 */
router.delete('/:id', minimumRole('administrator'), function(req, res, next) {
  Video.findByIdAndRemove(req.params.id, function(err){
    if(err) return next(err);
    return res.json({});
  })
});

module.exports = router;
