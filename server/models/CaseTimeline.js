const mongoose = require('mongoose');

const caseTimelineSchema = new mongoose.Schema({
    case_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true
    },
    event_type: {
        type: String,
        required: true,
        enum: ['Case Created', 'Case Status Updated', 'Hearing Scheduled', 'Hearing Completed', 'Document Uploaded', 'Lawyer Comment Added', 'Other']
    },
    description: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

module.exports = mongoose.model('CaseTimeline', caseTimelineSchema);
