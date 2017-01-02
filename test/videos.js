process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var request = require('supertest');

var app = require('../app.js');
var Video = require('../models/video');
var User = require('../models/user');

// Configure Chai
chai.use(chaiHttp);

describe('Videos', function() {
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
    Video.remove({}, function(err) {
      done();
    });
  });

  /**
   * GET /videos block:
   * Tests to see if route provides
   * list of available videos.
   */
  describe('GET /videos', function() {
    it('should get all videos', function(done) {
      agent
        .get('/api/videos')
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * GET /videos/:id block:
   * Tests to see if route provides
   * a specific video document.
   */
  describe('GET /videos/:id', function() {
    it('should get a specific video', function(done) {
      const sample = {
        title: 'Test Video A',
        videoid: 'dQw4w9WgXcQ'
      }

      const video = new Video(sample);
      video.save(function(err, video) {
        agent
          .get('/api/videos/' + video.id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql(sample.title);
            res.body.should.have.property('videoid').eql(sample.videoid);
            done();
          });
      });
    });
  });

  /**
   * POST /videos block:
   * Tests to see if route creates
   * a new video and validates inputs.
   */
  describe('POST /videos', function() {
    // Check if new video is created
    it('should create a new video', function(done) {
      const sample = {
        title: 'Test Video B',
        videoid: 'dQw4w9WgXcQ'
      }

      agent
        .post('/api/videos')
        .send(sample)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title').eql(sample.title);
          res.body.should.have.property('videoid').eql(sample.videoid);
          done();
        });
    });

    // Check if validation error is thrown
    it('should throw validation errors', function(done) {
      const sample = {
        videoid: 'dQw4w9WgXcQ'
      }

      agent
        .post('/api/videos')
        .send(sample)
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          res.body.errors.title
            .should.have.property('kind').eql('required');
          done();
        });
    });
  });

  /**
   * PUT /videos/:id block:
   * Tests to see if route updates
   * an existing videos.
   */
  describe('PUT /videos/:id', function() {
    it('should update an existing video', function(done) {
      const sample = {
        title: 'Test Video D',
        videoid: 'dQw4w9WgXcQ'
      }

      const video = new Video(sample);
      video.save(function(err, video) {
        agent
          .put('/api/videos/' + video.id)
          .send({ title: 'Test' })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Test');
            res.body.should.have.property('videoid').eql(sample.videoid);
            done();
          });
      });
    });
  });

  /**
   * DELETE /videos/:id block:
   * Tests to see if route deletes
   * an existing video.
   */
  describe('DELETE /videos/:id', function() {
    it('should delete an existing video', function(done) {
      const sample = {
        title: 'Test Video D',
        videoid: 'dQw4w9WgXcQ'
      }

      const video = new Video(sample);
      video.save(function(err, video) {
        agent
          .delete('/api/videos/' + video.id)
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
