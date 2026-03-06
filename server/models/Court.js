const mongoose = require('mongoose');

const courtSchema = new mongoose.Schema({
    court_number: {
        type: String,
        required: [true, 'Please add a court number']
    },
    court_name: {
        type: String,
        required: [true, 'Please add a court name']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    state: {
        type: String,
        required: [true, 'Please add a state']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Court', courtSchema);
