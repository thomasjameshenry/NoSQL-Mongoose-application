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

var d = new Date(2020, 05, 14);
var today = d.getFullYear()
//schema for phones collection
//https://mongoosejs.com/docs/validation.html
const clientSchema = mongoose.Schema({
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
    DoB: {
        type: Date
    },
    permission: {
        type: String,
        enum: ['Y', 'N'],
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
    },
    parentName: {
        type: String,
        required: function() {
            var bday = this.DoB.getFullYear();
            if (today - bday < 18) {
                return true;
            } else {
                return false;
            }
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    maritalStatus: {
        type: String,
        enum: ['Never	Married', 'Domestic Partnership', 'Married', 'Separated', 'Divorced', 'Widowed'],
        required: true
    },
    referredBy: {
        type: String
    }
});
clientSchema.pre('save', function(next) {
    now = new Date();
    this.created_at = now
    next();
});

module.exports = mongoose.model('Client', clientSchema);
