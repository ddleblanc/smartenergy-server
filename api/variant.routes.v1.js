var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Variant = require('../model/variant.model');

routes.get('/variants', function(req, res) {
    res.contentType('application/json');
    Variant.find({})
        .then((variants) => {
            res.status(200).json(variants);
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/variants', function(req, res) {
    var new_variant = new Variant(req.body);
    new_variant.save(function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
    });
});

routes.post('/variants/config', function(req, res) {
    var update = 
    {
        "variant": req.body.variant,
        "config" :
        { 
            "name" : req.body.name,
            "time" : req.body.time,
            "energy" : req.body.energy
        }
    };
    Variant.findOne({variant : req.body.variant})
    .then(variant => {
        variant.set(update);
        variant.save();
        res.status(200).json(variant);
    })
    .catch((error) => res.status(401).json(error))
});

module.exports = routes;