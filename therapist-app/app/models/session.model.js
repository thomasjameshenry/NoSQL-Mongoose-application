const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    therapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Therapist',
        required: true
    },
    fee: {
        type: String,
        required: true
    },
    sessionNum: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        match: /[0-255]|Cancelled|No Show/g,
        required: true
    },
    sessionType: {
        type: String,
        enum: ['Intake', 'Psychotherapy', 'Assessment', 'Other'],
        required: true
    },
    other: {
        type: String,
        required: function() {
            if (this.duration == 'Other') {
                return true;
            } else {
                return false;
            }
        }
    },
    issueFlag: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    notes: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Session', sessionSchema);
