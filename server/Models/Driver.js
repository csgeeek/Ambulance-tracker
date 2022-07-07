const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    ambNumber: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Driver', DriverSchema);