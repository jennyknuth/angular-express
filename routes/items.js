var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI)
var Items = db.get('items')

router.get('/', function(req, res) {
  Items.find({}, function (err, items) {
    if (err) res.send(err)
    res.status(200).json(items)
  })
});

router.post('/', function(req, res) {
  Items.insert({name: 'test item'}, function (err, item) {
    if (err) res.send(err)
    res.status(201).json(item)
  })
})

router.get('/:id', function (req, res) {
  Items.findOne({_id: req.params.id}, function (err, item) {
    if (err) res.send(err)
    res.status(200).json(item)
  })
})

router.put('/:id', function (req, res) {
  Items.findAndModify({_id: req.params.id}, req.body, function (err, item) {
    if (err) res.send(err)
    res.status(200).json(item)
  })
})

router.delete('/:id', function (req, res) {
  Items.remove({_id: req.params.id}, function (err, item) {
    if (err) res.send(err)
    res.status(200).json(item + ' items deleted!')
  })
})
module.exports = router;
