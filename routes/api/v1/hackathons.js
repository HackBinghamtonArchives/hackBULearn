var _ = require('lodash');
var router = require('express').Router();
var Hackathon = require('../../../models/hackathon');
var minimumRole = require('../../../middleware').roles;

const publicFields = [
  '_id', 'name', 'location', 'dates',
  'bannerImage', 'websiteURL', 'registrationURL', 'capacity'
];

/**
 * Route: GET /hackathons
 * Returns: Array of all hackathons
 */
router.get('/', minimumRole('member'), function(req, res, next) {
  Hackathon.find({}, publicFields.join(' '), function(err, hackathons) {
    if(err) return next(err);
    return res.json(hackathons);
  });
});

/**
 * Route: GET /hackathons/:id
 * Returns: Specific hackathon
 */
router.get('/:id', minimumRole('member'), function(req, res, next) {
  Hackathon.findOne({ _id: req.params.id }, publicFields.join(' '),
    function(err, results) {
      if(err) return next(err);
      return res.json(results);
    });
});

/**
 * Route: POST /hackathons
 * Creates: Hackathon document
 * Returns: New hackathon
 */
router.post('/', minimumRole('administrator'), function(req, res, next) {
  const formData = _.omitBy({
    name : req.body.name,
    location : _.omitBy({
      facility      : req.body.location.facility,
      university    : req.body.location.university,
      streetAddress : req.body.location.streetAddress,
      city          : req.body.location.city,
      state         : req.body.location.state,
      zipCode       : req.body.location.zipCode,
      country       : req.body.location.country
    }, _.isNil),
    dates : _.omitBy({
      start : req.body.dates.start,
      end   : req.body.dates.end
    }, _.isNil),
    bannerImage : req.body.bannerImage,
    websiteURL : req.body.websiteURL,
    registrationURL : req.body.registrationURL,
    capacity : req.body.capacity
  }, _.isNil);

  const hackathon = new Hackathon(formData);
  hackathon.save(function(err, hackathon) {
    if(err) return next(err);
    return res.json(_.pick(hackathon, publicFields));
  });
});

/**
 * Route: PUT /hackathons/:id
 * Modifies: Hackahton document
 * Returns: Modified hackathon
 */
router.put('/:id', minimumRole('administrator'), function(req, res, next) {
  const locationData = _.omitBy({
    facility      : req.body.location.facility,
    university    : req.body.location.university,
    streetAddress : req.body.location.streetAddress,
    city          : req.body.location.city,
    state         : req.body.location.state,
    zipCode       : req.body.location.zipCode,
    country       : req.body.location.country
  }, _.isNil);

  const datesData = _.omitBy({
    start : req.body.dates.start,
    end   : req.body.dates.end
  }, _.isNil);

  const formData = _.omitBy({
    name : req.body.name,
    bannerImage : req.body.bannerImage,
    websiteURL : req.body.websiteURL,
    registrationURL : req.body.registrationURL,
    capacity : req.body.capacity
  }, _.isNil);

  if(!_.isEmpty(locationData)) formData.location = locationData;
  if(!_.isEmpty(datesData)) formData.dates = datesData;

  Hackathon.findByIdAndUpdate(req.params.id, formData, {
    new: true,
    runValidators: true,
    select: publicFields.join(' ')
  }, function(err, hackathon) {
    if(err) return next(err);
    return res.json(hackathon);
  });
});

/**
 * Route: DELETE /hackathons/:id
 * Deletes: Hackathon document
 * Returns: Empty object
 */
router.delete('/:id', minimumRole('administrator'), function(req, res, next) {
  Hackathon.findByIdAndRemove(req.params.id, function(err){
    if(err) return next(err);
    return res.json({});
  })
});

module.exports = router;
