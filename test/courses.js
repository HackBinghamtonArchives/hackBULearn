process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var request = require('supertest');

var app = require('../app.js');
var Course = require('../models/course');
var User = require('../models/user');

// Configure Chai
chai.use(chaiHttp);

describe('Courses', function() {
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
    Course.remove({}, function(err) {
      done();
    });
  });

  /**
   * GET /courses block:
   * Tests to see if route provides
   * list of available courses.
   */
  describe('GET /courses', function() {
    it('should get all courses', function(done) {
      agent
        .get('/api/courses')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * GET /courses/:id block:
   * Tests to see if route provides
   * a specific course document.
   */
  describe('GET /courses/:id', function() {
    it('should get a specific course', function(done) {
      const sample = {
        title: 'Test Course A',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        thumbnail: 'css'
      }

      const course = new Course(sample);
      course.save(function(err, course) {
        agent
          .get('/api/courses/' + course.id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(sample.title);
            res.body.should.have.property('description')
              .eql(sample.description);
            res.body.should.have.property('thumbnail').eql(sample.thumbnail);
            done();
          });
      });
    });
  });

  /**
   * POST /courses block:
   * Tests to see if route creates
   * a new course and validates inputs.
   */
  describe('POST /courses', function() {
    // Check if new course is created
    it('should create a new course', function(done) {
      const sample = {
        title: 'Test Course B',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        thumbnail: 'css'
      }

      agent
        .post('/api/courses')
        .send(sample)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(sample.title);
          res.body.should.have.property('description').eql(sample.description);
          res.body.should.have.property('thumbnail').eql(sample.thumbnail);
          done();
        });
    });

    // Check if validation error is thrown
    it('should throw validation errors', function(done) {
      const sample = {
        title: 'Test Course C',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      }

      agent
        .post('/api/courses')
        .send(sample)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('thumbnail');
          res.body.errors.thumbnail
            .should.have.property('kind').eql('required');
          done();
        });
    });
  });

  /**
   * PUT /courses/:id block:
   * Tests to see if route updates
   * an existing course.
   */
  describe('PUT /courses/:id', function() {
    it('should update an existing course', function(done) {
      const sample = {
        title: 'Test Course D',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        thumbnail: 'css'
      }

      const course = new Course(sample);
      course.save(function(err, course) {
        agent
          .put('/api/courses/' + course.id)
          .send({ title: 'Test' })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Test');
            res.body.should.have.property('description').eql(sample.description);
            res.body.should.have.property('thumbnail').eql(sample.thumbnail);
            done();
          });
      });
    });
  });

  /**
   * DELETE /courses/:id block:
   * Tests to see if route deletes
   * an existing course.
   */
  describe('DELETE /courses/:id', function() {
    it('should delete an existing course', function(done) {
      const sample = {
        title: 'Test Course E',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        thumbnail: 'css'
      }

      const course = new Course(sample);
      course.save(function(err, course) {
        agent
          .delete('/api/courses/' + course.id)
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
