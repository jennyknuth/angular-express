// require the app we exported from app.js
var app = require('./../app.js');

// connect to the local database (this won't need to run in production)
var db = require('monk')('localhost/magic')
var swords = db.get('swords');


// We're using the built in assert module for our tests.
// https://nodejs.org/api/assert.html
var assert = require('assert');

// And supertest to run our app and send it requests.
var request = require('supertest');

before(function(done) {
  swords.remove({}, function() {
    swords.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
      done()
    });
  });
});

describe('GET api/swords', function () {
  it('shows all resources', function (done) {
    request(app)
      .get('/api/swords')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log(res.body);
          assert.equal(res.body.length, '1')
          done()
        }
      })
  });
});

describe('POST api/swords', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/swords')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          done()
        }
      })
  });
});

describe('PUT api/swords/:id', function () {
  it('updates a resource', function (done) {
    request(app)
      .put('/api/swords/55c050595ae876b6b79ad318')
      .send({title: 'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log("title:", res.body.title);
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

describe('GET api/swords/:id', function () {
  it('shows a resource', function (done) {
    request(app)
      .get('/api/swords/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log(res.body);
          assert.equal(res.body.title, 'from test')
          done()
        }
      })
  });
});

describe('DELETE api/swords/:id', function () {
  it('deletes a resource', function (done) {
    request(app)
      .delete('/api/swords/55c050595ae876b6b79ad318')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log(res.body);
          assert.equal(res.body, "1 documents deleted!")
          done()
        }
      })
  });
});
