var _ = require('lodash');
var router = require('express').Router();
var ObjectId = require('mongoose/lib/types/objectid');
var User = require('../../../models/user');
var Video = require('../../../models/video');
var minimumRole = require('../../../middleware').roles;

const publicFields = [
  '_id', 'local.username', 'local.firstname', 'local.lastname',
  'local.email', 'videos', 'permission'
];

/**
 * Route: GET /users
 * Returns: Array of all users
 */
router.get('/', minimumRole('administrator'), function(req, res, next) {
  User.find({}, publicFields.join(' '), function(err, users) {
    if(err) return next(err);
    return res.json(users);
  });
});

/**
 * Route: GET /users/me
 * Returns: Current user
 */
router.get('/me', minimumRole('member'), function(req, res, next) {
  res.json(_.pick(req.user, publicFields))
});

/**
 * Route: GET /users/:id
 * Returns: Specific user
 */
router.get('/:id', minimumRole('administrator'), function(req, res, next) {
  User.findOne({ _id: req.params.id }, publicFields.join(' '),
    function(err, results) {
      if(err) return next(err);
      return res.json(results);
    });
});

/**
 * Route: POST /users/me
 * Creates: User document
 * Returns: New user (public)
 */
router.post('/me', function(req, res, next) {
  const formData = _.omitBy({
    'local.username': req.body.local && req.body.local.username,
    'local.firstname': req.body.local && req.body.local.firstname,
    'local.lastname': req.body.local && req.body.local.lastname,
    'local.email': req.body.local && req.body.local.email,
    'local.password': req.body.local && req.body.local.password
  }, _.isNil);

  const user = new User(formData);
  user.save(function(err, user) {
    if(err) return next(err);
    return res.json(_.pick(user, publicFields));
  });
});

/**
 * Route: POST /users
 * Creates: User document
 * Returns: New user (administrative)
 */
router.post('/', minimumRole('administrator'), function(req, res, next) {
  const formData = _.omitBy({
    'local.username': req.body.local && req.body.local.username,
    'local.firstname': req.body.local && req.body.local.firstname,
    'local.lastname': req.body.local && req.body.local.lastname,
    'local.email': req.body.local && req.body.local.email,
    'local.password': req.body.local && req.body.local.password,
    'permission': req.body.permission
  }, _.isNil);

  const user = new User(formData);
  user.save(function(err, user) {
    if(err) return next(err);
    return res.json(_.pick(user, publicFields));
  });
});

/**
 * Route: PUT /users/me
 * Modifies: users document
 * Returns: Modified current user
 */
router.put('/me', minimumRole('member'), function(req, res, next) {

  User.findById(req.user._id, function(err, user) {
    if(err) return next(err);

    if(req.body.local) {
      const local = req.body.local;
      if(local.username) user.local.username = local.username;
      if(local.password) user.local.password = local.password;
      if(local.firstname) user.local.firstname = local.firstname;
      if(local.lastname) user.local.lastname = local.lastname;
      if(local.email) user.local.email = local.email;
    }

    if(req.body.videos) {
      user.videos = req.body.videos.map(function(video) {
        return ObjectId(video);
      })
    }

    user.save(function(err, results) {
      if(err) return next(err);
      res.json(_.pick(results, publicFields));
    });
  });
});

/**
 * Route: PUT /users/:id
 * Modifies: users document
 * Returns: Modified user
 */
router.put('/:id', minimumRole('superuser'), function(req, res, next) {
  const formData = _.omitBy({
    'local.username': req.body.local && req.body.local.username,
    'local.firstname': req.body.local && req.body.local.firstname,
    'local.lastname': req.body.local && req.body.local.lastname,
    'local.email': req.body.local && req.body.local.email,
    'local.password': req.body.local && req.body.local.password,
    'permission': req.body.permission
  }, _.isNil);

  User.findByIdAndUpdate(req.params.id, formData, {
    new: true,
    runValidators: true,
    select: publicFields.join(' ')
  }, function(err, user) {
    if(err) return next(err);
    return res.json(user);
  });
});

/**
 * Route: DELETE /users/me
 * Deletes: User document
 * Returns: Empty object
 */
router.delete('/me', minimumRole('member'), function(req, res, next) {
  User.findByIdAndRemove(req.user._id, function(err){
    if(err) return next(err);
    return res.json({});
  })
});

/**
 * Route: DELETE /users/:id
 * Deletes: User document
 * Returns: Empty object
 */
router.delete('/:id', minimumRole('superuser'), function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err){
    if(err) return next(err);
    return res.json({});
  })
});

module.exports = router;
