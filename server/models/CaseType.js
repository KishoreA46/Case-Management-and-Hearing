const mongoose = require('mongoose');

const caseTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a case type name']
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CaseType', caseTypeSchema);
