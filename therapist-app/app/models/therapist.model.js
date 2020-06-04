const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    addline1: {
        type: String,
        required: true
    },
    addline2: {
        type: String
    },
    town: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    eircode: {
        type: String
    }
});

//schema for phones collection
//https://mongoosejs.com/docs/validation.html
const therapistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String
    },
    fname: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    },
    mobilePhone: {
        type: String,
        required: true
    },
    homePhone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    homeAdd: {
        type: addressSchema,
        required: true
    }
});

module.exports = mongoose.model('Therapist', therapistSchema);
