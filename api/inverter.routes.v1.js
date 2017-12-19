//
// ./api/v1/inverter.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Inverter = require('../model/inverter.model');

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
    Inverter.findOne({_id: req.params._id},function(err,result){
        res.status(200).json(result);
    });
});


routes.post('/inverters', function (req, res) {
    res.contentType('application/json');
    Inverter.create({
        SN: req.body.SN,
        DeviceName: req.body.DeviceName,
        Online: req.body.Online,
        Location: req.body.Location,
        DeviceModel: req.body.DeviceModel,
        DisplaySoftwareVersion: req.body.DisplaySoftwareVersion,
        MasterControlSoftwareVersion: req.body.MasterControlSoftwareVersion,
        SlaveControlVersion: req.body.SlaveControlVersion},


        function(err, result) {
            if (err) return res.status(401).json(error);
            res.send(result);
        });
});

routes.put('/inverters/:id', function (req, res) {

});

routes.delete('/inverters/:id', function (req, res) {

});

module.exports = routes;