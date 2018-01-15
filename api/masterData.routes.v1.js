var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var MasterData = require('../model/master-data.model');

var Inverter = require('../model/inverter.model');

//
// Geef een lijst van alle solar data.  
//
routes.get('/master-data', function(req, res) {
    res.contentType('application/json');
    MasterData.find({})
        .then((data) => {
            // console.log(data);
            res.status(200).json(data);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke game. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/data/23
//
routes.get('/master-data/:id', function(req, res) {
    res.contentType('application/json');
    MasterData.findById(req.params.id)
        .then((data) => {
            // console.log(games);
            res.status(200).json(data);
        })
        .catch((error) => res.status(401).json(error));
});

//post 
//geen schema slaat alles op wat er in de body staat van de post
routes.post('/master-data', function(req, res) {
    var new_data = new MasterData(req.body);
    new_data.save(

    function(err, result) {
        if (err) return res.status(401).json(error);
        res.send(result);
    });
});

routes.delete('/master-data/:id', function(req, res) {
    var id = req.params.id;

    MasterData.findById(id)
        .then(data => { 
            data.remove();
            res.status(200).send("data verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;