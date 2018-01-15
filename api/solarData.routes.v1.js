var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DataSchema = new Schema({},{strict : false});
const Data = mongoose.model('data', DataSchema);

var Inverter = require('../model/inverter.model');

//
// Geef een lijst van alle solar data.  
//
routes.get('/solar-panels', function(req, res) {
    res.contentType('application/json');
    Data.find({})
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
routes.get('/solar-panels/:id', function(req, res) {
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
routes.post('/solar-panels/:SN', function(req, res) {
    var new_data = new Data(req.body);
    console.log(req.params);
    var currentSN = req.params.SN;
    Inverter.findOne({ SN: currentSN })
    .then(inverter => {
        console.log(inverter.SN);
        inverter.rawData.push(new_data)
        new_data.save()
        .then(() => {
            inverter.save()
                .then(res.send("opgeslagen"))
                .catch(error => console.log(error));
            
        })
        .catch(error => console.log(error));
});
});

routes.delete('/solar-panels/:id', function(req, res) {
    var id = req.params.id;

    Data.findById(id)
        .then(data => { 
            data.remove();
            res.status(200).send("data verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;