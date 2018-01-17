//
// ./api/v1/inverter.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Inverter = require('../model/inverter.model');
var Location = require('../model/location.model');

//
// Geef een lijst van alle inverters.
//
routes.get('/inverters', function (req, res) {
    res.contentType('application/json');

    Inverter.find({})
        .then(function (inverters) {
            res.status(200).json(inverters);
        })
        .catch((error) => {
        res.status(400).json(error);
        });
});

routes.get('/inverters/:id', function (req, res) {
    res.contentType('application/json');
    Inverter.findById(req.params.id)
    .then((inverter) => {
        // console.log(inverters);
        res.status(200).json(inverter);
    })
    .catch((error) => res.status(401).json(error));
});

routes.get('/inverters/:id/solar-panels', function (req, res) {
    res.contentType('application/json');
    Inverter.findById(req.params.id)
        //.populate("solarpanels") werkt niet want dan moet mongo een refrence hebben
        .then((inverter) => {
            solarpanels = inverter.rawData;
            console.log(inverter);
            res.status(200).json(solarpanels);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/inverters/:id/solar-panels', function (req, res) {
    res.contentType('application/json');
    Inverter.findById(req.params.id)
        //.populate("solarpanels") werkt niet want dan moet mongo een refrence hebben
        .then((inverter) => {
            solarpanels = inverter.rawData;
            console.log(inverter);
            res.status(200).json(solarpanels);
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/inverters', function (req, res) {
    res.contentType('application/json');
    locationID = req.body.locationID;
    newInverter = new Inverter({
        SN: req.body.SN,
        DeviceName: req.body.DeviceName,
        Online: req.body.Online,
        Location: req.body.Location,
        DeviceModel: req.body.DeviceModel,
        DisplaySoftwareVersion: req.body.DisplaySoftwareVersion,
        MasterControlSoftwareVersion: req.body.MasterControlSoftwareVersion,
        SlaveControlVersion: req.body.SlaveControlVersion})

        Location.findById(locationID)
        .then(location => {
            location.inverters.push(newInverter)
            newInverter.save()
            .then(() => {
                location.save()
                .then(res.send("opgeslagen"))
                .catch(error => console.log(error));
            })
            .catch((error) => res.status(401).json(error))
        })
        .catch((error) => res.status(401).json(error))
        
});

routes.put('/inverters/:id', function (req, res) {

});

routes.delete('/inverters/:id', function (req, res) {

});

module.exports = routes;