const mongoose = require('mongoose');

const CoordinateSchema = mongoose.Schema({
    uniqId: {
        type: String,
        required: true
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
});

module.exports = mongoose.model('Coordinates', CoordinateSchema);