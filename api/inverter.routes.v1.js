//
// ./api/v1/inverter.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Inverter = require('../model/inverter.model');
var Location = require('../model/location.model');
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
    console.log(req.body.inverter);
    newInverter = new Inverter({
        SN: req.body.inverter.SN,
        DeviceName: req.body.inverter.DeviceName,
        Online: req.body.inverter.Online,
        Location: req.body.inverter.Location,
        DeviceModel: req.body.inverter.DeviceModel,
        DisplaySoftwareVersion: req.body.inverter.DisplaySoftwareVersion,
        MasterControlSoftwareVersion: req.body.inverter.MasterControlSoftwareVersion,
        SlaveControlVersion: req.body.inverter.SlaveControlVersion})

        Location.findById(req.body.inverter.locationID)
        .then(location => {
            console.log(location);
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

routes.put('/inverters/:id', function(req, res) {
    console.log(req.body);
    res.contentType('application/json');
    var id = req.params.id;

    var update = { 
        "SN": req.body.inverter.SN,
        "DeviceName": req.body.inverter.DeviceName,
        "Online": req.body.inverter.Online,
        "Location": req.body.inverter.Location,
        "DeviceModel": req.body.inverter.DeviceModel,
        "DisplaySoftwareVersion": req.body.inverter.DisplaySoftwareVersion,
        "MasterControlSoftwareVersion": req.body.inverter.MasterControlSoftwareVersion,
        "SlaveControlVersion": req.body.inverter.SlaveControlVersion
    };
    Inverter.findById(id)
        .then( inverter => {
            inverter.set(update);
            inverter.save();
            res.status(200).json(inverter);
            
        })
        .catch((error) => res.status(401).json(error));
});

routes.delete('/inverters/:id', function(req, res) {
var id = req.params.id;

Inverter.findById(id)
    .then(inverter => { 
        inverter.remove()
        .then(() => res.status(200).send("Inverter verwijderd"))
        .catch(error => res.status(401).json(error))
        
    })
    .catch(error => res.status(401).json(error));
});


module.exports = routes;