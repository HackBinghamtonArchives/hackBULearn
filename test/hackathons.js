process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var request = require('supertest');

var app = require('../app.js');
var Hackathon = require('../models/hackathon');
var User = require('../models/user');

// Configure Chai
chai.use(chaiHttp);

describe('Hackathons', function() {
  /**
   * Auth block:
   * Creates new superuser account
   * before running tests.
   */
  var agent = request.agent(app);

  before(function(done) {
    User.remove({}, function(err) {
      agent
        .post('/login')
        .send({
          username: 'test',
          password: 'testtesttest',
          firstname: 'Test',
          lastname: 'User',
          email: 'test@hackbu.org',
          register: true
        })
        .end(function(err, res) {
          User.findOneAndUpdate({}, {
            permission: 'superuser'
          }, function(err) {
            done();
          });
        });
    });
  });

  /**
   * Clean-up block:
   * Removes all records from test DB
   * before running tests.
   */
  beforeEach(function(done){
    Hackathon.remove({}, function(err) {
      done();
    });
  });

  /**
   * GET /hackathons block:
   * Tests to see if route provides
   * list of available hackathons.
   */
  describe('GET /hackathons', function() {
    it('should get all hackathons', function(done) {
      agent
        .get('/api/hackathons')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * GET /hackathons/:id block:
   * Tests to see if route provides
   * a specific hackathons document.
   */
  describe('GET /hackathons/:id', function() {
    it('should get a specific hackathon', function(done) {
      const sample = {
        name : 'Hackathon A',
        location : {
          facility      : 'Test Complex',
          university    : 'Test University',
          streetAddress : '123 Test Street',
          city          : 'Testville',
          state         : 'South Test',
          zipCode       : '000000',
          country       : 'USA'
        },
        dates : {
          start : '2016-11-05T05:00:00.000Z',
          end   : '2017-11-06T05:00:00.000Z'
        },
        bannerImage : '#',
        websiteURL : '#',
        registrationURL : '#',
        capacity : 100
      }

      const hackathon = new Hackathon(sample);
      hackathon.save(function(err, hackathon) {
        agent
          .get('/api/hackathons/' + hackathon.id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql(sample.name);
            res.body.should.have.property('location');
            res.body.location.should.be.a('object');
            res.body.location.should.have.property('facility')
              .eql(sample.location.facility);
            res.body.location.should.have.property('university')
              .eql(sample.location.university);
            res.body.location.should.have.property('streetAddress')
              .eql(sample.location.streetAddress);
            res.body.location.should.have.property('city')
              .eql(sample.location.city);
            res.body.location.should.have.property('state')
              .eql(sample.location.state);
            res.body.location.should.have.property('zipCode')
              .eql(sample.location.zipCode);
            res.body.location.should.have.property('country')
              .eql(sample.location.country);
            res.body.should.have.property('dates');
            res.body.dates.should.be.a('object');
            res.body.dates.should.have.property('start')
              .eql(sample.dates.start);
            res.body.dates.should.have.property('end')
              .eql(sample.dates.end);
            res.body.should.have.property('bannerImage')
              .eql(sample.bannerImage);
            res.body.should.have.property('websiteURL').eql(sample.websiteURL);
            res.body.should.have.property('registrationURL')
              .eql(sample.registrationURL);
            res.body.should.have.property('capacity').eql(sample.capacity);
            done();
          });
      });
    });
  });

  /**
   * POST /hackathons block:
   * Tests to see if route creates
   * a new hackathon and validates inputs.
   */
  describe('POST /hackathons', function() {
    // Check if new hackathon is created
    it('should create a new hackathon', function(done) {
      const sample = {
        name : 'Hackathon B',
        location : {
          facility      : 'Test Complex',
          university    : 'Test University',
          streetAddress : '123 Test Street',
          city          : 'Testville',
          state         : 'South Test',
          zipCode       : '000000',
          country       : 'USA'
        },
        dates : {
          start : '2016-11-05T05:00:00.000Z',
          end   : '2017-11-06T05:00:00.000Z'
        },
        bannerImage : '#',
        websiteURL : '#',
        registrationURL : '#',
        capacity : 100
      }

      agent
        .post('/api/hackathons')
        .send(sample)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(sample.name);
          res.body.should.have.property('location');
          res.body.location.should.be.a('object');
          res.body.location.should.have.property('facility')
            .eql(sample.location.facility);
          res.body.location.should.have.property('university')
            .eql(sample.location.university);
          res.body.location.should.have.property('streetAddress')
            .eql(sample.location.streetAddress);
          res.body.location.should.have.property('city')
            .eql(sample.location.city);
          res.body.location.should.have.property('state')
            .eql(sample.location.state);
          res.body.location.should.have.property('zipCode')
            .eql(sample.location.zipCode);
          res.body.location.should.have.property('country')
            .eql(sample.location.country);
          res.body.should.have.property('dates');
          res.body.dates.should.be.a('object');
          res.body.dates.should.have.property('start')
            .eql(sample.dates.start);
          res.body.dates.should.have.property('end')
            .eql(sample.dates.end);
          res.body.should.have.property('bannerImage')
            .eql(sample.bannerImage);
          res.body.should.have.property('websiteURL').eql(sample.websiteURL);
          res.body.should.have.property('registrationURL')
            .eql(sample.registrationURL);
          res.body.should.have.property('capacity').eql(sample.capacity);
          done();
        });
    });

    // Check if validation error is thrown
    it('should throw validation errors', function(done) {
      const sample = {
        location : {
          facility      : 'Test Complex',
          university    : 'Test University',
          streetAddress : '123 Test Street',
          city          : 'Testville',
          state         : 'South Test',
          zipCode       : '000000',
          country       : 'USA'
        },
        dates : {
          start : '2016-11-05T05:00:00.000Z',
          end   : '2017-11-06T05:00:00.000Z'
        },
        bannerImage : '#',
        websiteURL : '#',
        registrationURL : '#',
        capacity : 100
      }

      agent
        .post('/api/hackathons')
        .send(sample)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name
            .should.have.property('kind').eql('required');
          done();
        });
    });
  });

  /**
   * PUT /hackathons/:id block:
   * Tests to see if route updates
   * an existing hackathon.
   */
  describe('PUT /hackathons/:id', function() {
    it('should update an existing hackathon', function(done) {
      const sample = {
        name : 'Hackathon D',
        location : {
          facility      : 'Test Complex',
          university    : 'Test University',
          streetAddress : '123 Test Street',
          city          : 'Testville',
          state         : 'South Test',
          zipCode       : '000000',
          country       : 'USA'
        },
        dates : {
          start : '2016-11-05T05:00:00.000Z',
          end   : '2017-11-06T05:00:00.000Z'
        },
        bannerImage : '#',
        websiteURL : '#',
        registrationURL : '#',
        capacity : 100
      }

      const hackathon = new Hackathon(sample);
      hackathon.save(function(err, hackathon) {
        agent
          .put('/api/hackathons/' + hackathon.id)
          .send({ name: 'Test' })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Test');
            res.body.should.have.property('location');
            res.body.location.should.be.a('object');
            res.body.location.should.have.property('facility')
              .eql(sample.location.facility);
            res.body.location.should.have.property('university')
              .eql(sample.location.university);
            res.body.location.should.have.property('streetAddress')
              .eql(sample.location.streetAddress);
            res.body.location.should.have.property('city')
              .eql(sample.location.city);
            res.body.location.should.have.property('state')
              .eql(sample.location.state);
            res.body.location.should.have.property('zipCode')
              .eql(sample.location.zipCode);
            res.body.location.should.have.property('country')
              .eql(sample.location.country);
            res.body.should.have.property('dates');
            res.body.dates.should.be.a('object');
            res.body.dates.should.have.property('start')
              .eql(sample.dates.start);
            res.body.dates.should.have.property('end')
              .eql(sample.dates.end);
            res.body.should.have.property('bannerImage')
              .eql(sample.bannerImage);
            res.body.should.have.property('websiteURL').eql(sample.websiteURL);
            res.body.should.have.property('registrationURL')
              .eql(sample.registrationURL);
            res.body.should.have.property('capacity').eql(sample.capacity);
            done();
          });
      });
    });
  });

  /**
   * DELETE /hackathons/:id block:
   * Tests to see if route deletes
   * an existing hackathon.
   */
  describe('DELETE /hackathons/:id', function() {
    it('should delete an existing hackathon', function(done) {
      const sample = {
        name : 'Hackathon E',
        location : {
          facility      : 'Test Complex',
          university    : 'Test University',
          streetAddress : '123 Test Street',
          city          : 'Testville',
          state         : 'South Test',
          zipCode       : '000000',
          country       : 'USA'
        },
        dates : {
          start : '2016-11-05T05:00:00.000Z',
          end   : '2017-11-06T05:00:00.000Z'
        },
        bannerImage : '#',
        websiteURL : '#',
        registrationURL : '#',
        capacity : 100
      }

      const hackathon = new Hackathon(sample);
      hackathon.save(function(err, hackathon) {
        agent
          .delete('/api/hackathons/' + hackathon.id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.eql({});
            done();
          });
      });
    });
  });
});
