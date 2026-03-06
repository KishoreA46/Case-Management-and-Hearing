const mongoose = require('mongoose');

const documentFolderSchema = new mongoose.Schema({
    case_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Case',
        required: true
    },
    folder_name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DocumentFolder', documentFolderSchema);
