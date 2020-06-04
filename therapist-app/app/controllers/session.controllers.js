const Session = require('../models/session.model.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Client = require("../models/client.model.js");
const Therapist = require("../models/therapist.model.js");

//Default Controller
exports.root= (req, res) => {
        console.log("My Sessions App. Use the app to manage your favourite sessions!")
        return res.status(200).send({
            message: "My Sessions App. Use the app to manage your favourite sessions!"
        });
    };
// Create a new Session and save to the database
exports.create = (req, res) => {

    // Create a new Session (using schema)
    const session = new Session({
      _id : new mongoose.Types.ObjectId(),
      date: req.body.date,
      time: req.body.time,
      client: req.body.clientId,
      therapist: req.body.therapistId,
      session: req.body.sessionId,
      fee: req.body.fee,
      sessionNum: req.body.sessionNum,
      duration: req.body.duration,
      specify: req.body.secify,
      sessionType: req.body.sessionType,
      other: req.body.other,
      issueFlag: req.body.issueFlag,
      notes: req.body.notes
    });

    // Save Session in the database
    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Session."
        });
    });
};

// Return all Sessions in the database
exports.findAll = (req, res) => {
    Session.find()
    .populate('client therapist')
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Sessions."
        });
    });
};

// Find a single Session identified by sessionId
exports.findOne = (req, res) => {
    Session.findById(req.params.sessionId)
    .populate('client therapist')
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Session with id " + req.params.sessionId
        });
    });
};

// Update a Session identified by sessionId
// Update a Session identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(req.body.content == null) {
        return res.status(400).send({
            message: "Session content cannot be empty"
        });
    }

    // Find the Session and update it with the request body
    Session.findByIdAndUpdate(req.params.sessionId, {
      title: req.body.title,
      fname: req.body.fname,
      sname: req.body.sname,
      mobilePhone: req.body.mobilePhone,
      homePhone : req.body.homePhone,
      email: req.body.email,
      homeAdd: {
        addline1: req.body.homeAdd.addline1,
        addline2: req.body.homeAdd.addline2,
        town: req.body.homeAdd.town,
        county: req.body.homeAdd.county,
        eircode: req.body.homeAdd.eircode,
      }
    }, { $set: req.body },   // $set - modify only the supplied fields
       { new: true })        // "new: true" return updated object
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        res.send(session);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        return res.status(500).send({
            message: "Error updating Session with id " + req.params.sessionId
        });
    });
};

// Delete a Session identified by sessionId
exports.delete = (req, res) => {
    Session.findByIdAndRemove(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        return res.status(500).send({
            message: "Could not delete Session with id " + req.params.sessionId
        });
    });
};
