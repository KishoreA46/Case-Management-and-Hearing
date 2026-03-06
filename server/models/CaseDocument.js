const mongoose = require('mongoose');

const caseDocumentSchema = new mongoose.Schema({
    case_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true
    },
    folder_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'DocumentFolder',
        required: false // Optional, can be in root
    },
    file_name: {
        type: String,
        required: true
    },
    file_url: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: { createdAt: 'uploaded_at', updatedAt: true }
});

module.exports = mongoose.model('CaseDocument', caseDocumentSchema);
