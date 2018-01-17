//
// ./api/v1/location.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Location = require('../model/location.model');

//
// Geef een lijst van alle locations.
//
routes.get('/locations', function (req, res) {
    res.contentType('application/json');

    Location.find({})
        .then(function (locations) {
            res.status(200).json(locations);
        })
        .catch((error) => {
        res.status(400).json(error);
        });
});

routes.get('/locations/:id', function(req, res) {   
    res.contentType('application/json');
    Location.findById(req.params.id)
    .then((location) => {
        // console.log(location);
        res.status(200).json(location);
    })
    .catch((error) => res.status(401).json(error));
    });

    routes.post('/locations', function(req, res) {
        var new_location = new Location(req.body);
        new_location.save(function(err, task) {
          if (err)
            res.send(err);
            res.json(task);
        });
    });

    routes.get('/locations/:id/inverters', function (req, res) {
        res.contentType('application/json');
        Location.findById(req.params.id)
            .then((location) => {
                inverters = location.inverters;
                console.log(location);
                res.status(200).json(inverters);
            })
            .catch((error) => res.status(401).json(error));
    });

    routes.put('/locations/:id', function(req, res) {
        
        res.contentType('application/json');
        var id = req.params.id;
    
        var update = { 
            "name" : req.body.name, 
            "adress" : req.body.adress,
            "inverters": req.body.inverters
        };
        Location.findById(id)
            .then( location => {
                location.set(update);
                location.save();
                res.status(200).json(location);
                
            })
            .catch((error) => res.status(401).json(error));
    });

routes.delete('/locations/:id', function(req, res) {
    var id = req.params.id;
    
    Location.findById(id)
        .then(location => { 
            location.remove();
            res.status(200).send("Location verwijderd");
        })
        .catch(error => res.status(401).json(error));
});


module.exports = routes;