var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DataSchema = new Schema({},{strict : false});
const Data = mongoose.model('data', DataSchema);

//
// Geef een lijst van alle solar data.  
//
routes.get('/solar-panel', function(req, res) {
    res.contentType('application/json');
    Energy.find({})
        .then((energy) => {
            // console.log(energy);
            res.status(200).json(energy);
        })
        .catch((error) => res.status(401).json(error));
});

//
// Retourneer één specifieke game. Hier maken we gebruik van URL parameters.
// Vorm van de URL: http://hostname:3000/api/v1/energy/23
//
routes.get('/solar-panel/:id', function(req, res) {
    res.contentType('application/json');
    Data.findById(req.params.id)
        .then((data) => {
            // console.log(games);
            res.status(200).json(data);
        })
        .catch((error) => res.status(401).json(error));
});

//post 
//geen schema slaat alles op wat er in de body staat van de post
routes.post('/solar-panel', function(req, res) {
    var new_data = new Data(req.body);
    new_data.save(function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
    });
});

routes.delete('/solar-panel/:id', function(req, res) {
    var id = req.params.id;

    Data.findById(id)
        .then(data => { 
            data.remove();
            res.status(200).send("data verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;