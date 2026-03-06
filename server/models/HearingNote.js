const mongoose = require('mongoose');

const hearingNoteSchema = new mongoose.Schema({
    hearing_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hearing',
        required: true
    },
    note: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: true }
});

module.exports = mongoose.model('HearingNote', hearingNoteSchema);
