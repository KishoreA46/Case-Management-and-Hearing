const mongoose = require('mongoose');

const hearingSchema = new mongoose.Schema({
    case_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true
    },
    hearing_date: {
        type: Date,
        required: [true, 'Please add a hearing date']
    },
    hearing_time: {
        type: String,
        required: [true, 'Please add a hearing time']
    },
    courtroom: {
        type: String
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'postponed'],
        default: 'scheduled'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Hearing', hearingSchema);
