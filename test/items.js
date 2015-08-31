// require the app we exported from app.js
var app = require('./../app.js');

// connect to the local database (this won't need to run in production)
var db = require('monk')('localhost/magic')
var items = db.get('items');


// We're using the built in assert module for our tests.
// https://nodejs.org/api/assert.html
var assert = require('assert');

// And supertest to run our app and send it requests.
var request = require('supertest');

before(function(done) {
  items.remove({}, function() {
    items.insert({name: 'Armor', _id: '55c050595ae876b6b79ad314'}, function() {
      done()
    });
  });
});

describe('GET api/items', function () {
  it('shows all resources', function (done) {
    request(app)
      .get('/api/items')
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

describe('POST api/items', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/items')
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

describe('PUT api/items/:id', function () {
  it('updates a resource', function (done) {
    request(app)
      .put('/api/items/55c050595ae876b6b79ad314')
      .send({name: 'test item'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log("name:", res.body.name);
          assert.equal(res.body.name, 'test item')
          done()
        }
      })
  });
});

describe('GET api/items/:id', function () {
  it('shows a resource', function (done) {
    request(app)
      .get('/api/items/55c050595ae876b6b79ad314')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log(res.body);
          assert.equal(res.body.name, 'test item')
          done()
        }
      })
  });
});

describe('DELETE api/items/:id', function () {
  it('deletes a resource', function (done) {
    request(app)
      .delete('/api/items/55c050595ae876b6b79ad314')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          console.log(res.body);
          assert.equal(res.body, "1 items deleted!")
          done()
        }
      })
  });
});
