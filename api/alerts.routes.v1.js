//
// ./api/v1/inverter.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Alert = require('../model/alert.model');

//
// Geef een lijst van alle alerts.
//
routes.get('/alerts', function (req, res) {
    res.contentType('application/json');

    Alert.find({})
        .then(function (alerts) {
            res.status(200).json(alerts);
        })
        .catch((error) => {
        res.status(400).json(error);
        });
});


routes.get('/alerts/:id', function (req, res) {
    res.contentType('application/json');
    Alert.findById(req.params.id)
    .then((alert) => {
        // console.log(alerts);
        res.status(200).json(alert);
    })
    .catch((error) => res.status(401).json(error));
});


routes.post('/alerts', function (req, res) {
    res.contentType('application/json');
    Alert.create({
        SN: req.body.SN,
        Time: req.body.Time,
        EventID: req.body.EventID},


        function(err, result) {
            if (err) return res.status(401).json(error);
            res.send(result);
        });
});

routes.put('/alerts/:id', function (req, res) {
  console.log(req.body);
  var id = req.params.id;

  var update = {
    "SN" : req.body.SN,
    "Time": req.body.Time,
    "EventID": req.body.EventID
  }

  Alert.findById(id)
  .then(alert => {
    alert.set(update);
    alert.save()
    .then(() => {
      res.status(200).send("Alert aangepast");
    })
    .catch(error => res.status(401).json(error))

  })
  .catch (error => res.status(401).json(error));

});

routes.delete('/alerts/:id',  function(req, res) {
    var id = req.params.id;

    Alert.findById(id)
        .then(alert => {
            alert.remove();
            res.status(200).send("Alert verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;
