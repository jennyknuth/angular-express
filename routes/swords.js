var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI)
var Swords = db.get('swords')

router.get('/', function(req, res) {
  Swords.find({}, function(err, swords) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(swords);
  })
});

router.post('/', function(req, res) {
  Swords.insert(req.body, function(err, sword) {
    if (err) {
      res.send(err);
    }
    res.status(201).json(sword);
  });
});

router.get('/:id', function(req, res) {
  console.log(req.params.id);
  Swords.findOne({_id: req.params.id}, function (err, doc) {
    if (err) {
      res.send(err)
    }
    res.status(200).json(doc)
  })
});

router.put('/:id', function(req, res) {
  Swords.findAndModify({query: {_id: req.params.id}, options: {new: true}, update: {$set: req.body}}, function(err, sword) {
    if (err) {
      throw err
    }
    console.log(sword);
    res.status(200).json(sword)
  })});

router.delete('/:id', function(req, res) {
  Swords.remove({_id: req.params.id}, function (err, doc) {
    console.log("to delete: ", doc)
    res.status(200).json(doc + " documents deleted!")
  })
});

module.exports = router;
