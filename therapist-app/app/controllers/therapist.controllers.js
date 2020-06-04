const Therapist = require('../models/therapist.model.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Default root directing to view
exports.root = (req, res) => {
    Therapist.find()
        .then(therapists => {
            res.render('therapists_view', {
                results: therapists
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all Therapists."
            });
        });
};

// search for therapists, matching string on quote field
exports.searchFname = (req, res) => {
    var search = req.params.s;
    console.log("Searching First Name: " + search)
    Therapist.find({
            fname: new RegExp(search, "ig")
        })
        .then(therapists => {
            res.render('therapists_view', {
                results: therapists
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all Therapists."
            });
        });
};

// search for quotations, matching string on author field
exports.searchSname = (req, res) => {
    var search = req.params.s;
    console.log("Searching Surname: " + search)
    Therapist.find({
            sname: new RegExp(search, "ig")
        })
        .then(therapists => {
            res.render('therapists_view', {
                results: therapists
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all Therapists."
            });
        });
};


// Create a new Therapist and save to the database
exports.create = (req, res) => {

    // Create a new Therapist (using schema)
    const therapist = new Therapist({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        fname: req.body.fname,
        sname: req.body.sname,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        homeAdd: {
            addline1: req.body.homeAdd.addline1,
            addline2: req.body.homeAdd.addline2,
            town: req.body.homeAdd.town,
            county: req.body.homeAdd.county,
            eircode: req.body.homeAdd.eircode,
        }
    });

    therapist.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Therapist."
            });
        });
};

// Return all Therapists in the database
exports.findAll = (req, res) => {
    Therapist.find()
        .then(therapists => {
            res.send(therapists);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all Therapists."
            });
        });
};

// Find a single Therapist identified by therapistId
exports.findOne = (req, res) => {
    Therapist.findById(req.params.therapistId)
        .then(therapist => {
            if (!therapist) {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.therapistId
                });
            }
            res.send(therapist);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.therapistId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Therapist with id " + req.params.therapistId
            });
        });
};

// Update a Therapist identified by therapistId
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Quotation content cannot be empty"
        });
    }

    // Find the Quotation and update it with the request body
    Quotation.findByIdAndUpdate(req.params.therapistId, {
            fname: req.body.fname,
            author: req.body.author
        }, {
            $set: req.body
        }, {
            new: true
        })
        .then(fname => {
            if (!fname) {
                return res.status(404).send({
                    message: "Quotation not found with id " + req.params.therapistId
                });
            }
            res.send(fname);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Quotation not found with id " + req.params.therapistId
                });
            }
            return res.status(500).send({
                message: "Error updating Quotation with id " + req.params.therapistId
            });
        });
};

// Update a Quotation identified by the quotationId in the request
exports.updateQuote = (req, res) => {
    // Validate Request
    if (!req.body.fname) {
        return res.status(400).send({
            message: "Quotation content cannot be empty"
        });
    }

    Quotation.findByIdAndUpdate(req.params.therapistId, {
            fname: req.body.fname
        }, {
            new: true
        })
        .then(fname => {
            if (!fname) {
                return res.status(404).send({
                    message: "Quotation not found with id " + req.params.therpaistId
                });
            }
            res.send(fname);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Quotation not found with id " + req.params.therapistId
                });
            }
            return res.status(500).send({
                message: "Error updating Quotation with id " + req.params.therapistId
            });
        });
};

// Delete a Therapist identified by therapistId
exports.delete = (req, res) => {
    Therapist.findByIdAndRemove(req.params.therapistId)
        .then(therapist => {
            if (!therapist) {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.therapistId
                });
            }
            res.send({
                message: "Therapist deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Therapist not found with id " + req.params.therapistId
                });
            }
            return res.status(500).send({
                message: "Could not delete Therapist with id " + req.params.therapistId
            });
        });
};
