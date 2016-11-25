var express = require('express');
var router = express.Router();
var Course = require('../models/course');

router.get('/', function(req, res, next) {
  Course.all(function(error, results) {
    if(error) throw error;
    res.json(results);
  })
});

router.get('/:id', function(req, res, next) {
  Course.read(req.params.id, function(error, results) {
    if(error) throw error;
    res.json(results);
  })
});
module.exports = router;
