var _ = require('lodash');
var router = require('express').Router();
var User = require('../../../models/user');
var passport = require('passport');

/**
 * Route: POST /session
 * Authenticates: user
 * Returns: Session status
 */
router.post('/', passport.authenticate('local'), function(req, res, next) {
  res.json({ ok: true });
});

/**
 * Route: DELETE /session
 * Deletes: User session
 * Returns: Session status
 */
router.delete('/', function(req, res, next) {
  req.logout();
  res.json({ ok: true });
});

module.exports = router;
