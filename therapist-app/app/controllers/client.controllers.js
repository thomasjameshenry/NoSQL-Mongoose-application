const Client = require('../models/client.model.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Default Controller
exports.root = (req, res) => {
    console.log("My Clients App. Use the app to manage your favourite clients!")
    return res.status(200).send({
        message: "My Clients App. Use the app to manage your favourite clients!"
    });
};
// Create a new Client and save to the database
exports.create = (req, res) => {

    // Create a new Client (using schema)
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        fname: req.body.fname,
        sname: req.body.sname,
        DoB: req.body.DoB,
        permission: req.body.permission,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        homeAdd: req.body.homeAdd,
        parentName: req.body.parentName,
        created_at: req.body.created_at,
        maritalStatus: req.body.maritalStatus,
        referredBy: req.body.referredBy
    });

    // Save Client in the database
    client.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the Client."
            });
        });
};

// Return all Clients in the database
exports.findAll = (req, res) => {
    Client.find()
        .then(clients => {
            res.send(clients);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred while retrieving all Clients."
            });
        });
};

// Find a single Client identified by clientId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Client with id " + req.params.clientId
            });
        });
};

// Update a Client identified by clientId
// Update a Client identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (req.body.content == null) {
        return res.status(400).send({
            message: "Client content cannot be empty"
        });
    }

    // Find the Client and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
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
            }, {
                $set: req.body
            }, // $set - modify only the supplied fields
            {
                new: true
            }) // "new: true" return updated object
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            res.send(client);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Error updating Client with id " + req.params.clientId
            });
        });
};

// Delete a Client identified by clientId
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
        .then(client => {
            if (!client) {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            res.send({
                message: "Client deleted successfully!"
            });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            return res.status(500).send({
                message: "Could not delete Client with id " + req.params.clientId
            });
        });
};
