//
// ./api/v1/inverter.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Inverter = require('../model/inverter.model');
var MasterData = require('../model/master-data.model');

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

routes.get('/inverters/export', function (req, res) {
    res.contentType('application/json');
    Inverter.find({})
        .populate("masterData")
        .then(inverters => {
            exportJson = []
            console.log("inverters : ")
            console.log(inverters);
            inverters.forEach(inverter => {
                console.log('inverter')
                console.log(inverter);
                inverter.masterData.forEach(masterdata => {
                    console.log("masterdata : ")
                    console.log(masterdata);
                    newdata = { "time": masterdata.time, "SN": inverter.SN, "energy": masterdata.energy }
                    exportJson.push(newdata);
                })
            })
            res.status(200).json(exportJson)
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/inverters/total/:month', function (req, res) {
    res.contentType('application/json');
    Inverter.find()
        .populate("masterData")
        .then(inverters => {
            exportJson = []
            console.log("inverters : ")
            console.log(inverters);
            inverters.forEach(inverter => {
                console.log('inverter')
                console.log(inverter);
                inverter.masterData.forEach(masterdata => {
                    console.log("masterdata : ")
                    console.log(masterdata);
                    if(  (masterdata.time.getMonth() + 1) == req.params.month){
                    newdata = { "time": masterdata.time, "SN": inverter.SN, "energy": masterdata.energy }
                    exportJson.push(newdata);
                    }
                })
            })
            res.status(200).json(exportJson)
        })
        .catch((error) => res.status(401).json(error));
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

routes.get('/inverters/:id/total', function (req, res) {
    res.contentType('application/json');
    Inverter.findById(req.params.id)
        .populate("masterData")
        .then((inverter) => {
            var totalEnergy = 0;
            data = inverter.masterData;
            data.forEach(masterdata => { 
                console.log(totalEnergy);
                totalEnergy = totalEnergy + masterdata.energy
                console.log(totalEnergy);
            })
            res.status(200).json(totalEnergy);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/inverters/:id/energy/:month', function (req, res) {
    res.contentType('application/json');
    Inverter.findById(req.params.id)
        .populate("masterData")
        .then((inverter) => {
            var totalEnergy = [];
            data = inverter.masterData;
            data.forEach(masterdata => {
                if(  (masterdata.time.getMonth() + 1) == req.params.month){
                    newdata = { "time": masterdata.time, "energy": masterdata.energy}
                    totalEnergy.push(newdata);
                    console.log(totalEnergy);
                    }
            })
            res.status(200).json(totalEnergy);
        })
        .catch((error) => res.status(401).json(error));
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