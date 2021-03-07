const mongoose = require('mongoose');

const CampgroundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1
    },
    image: {
        type: String,
        required: true,
        minLength: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        minLength: 1
    },
    location: {
        type: String,
        required: true,
        minLength: 1
    }
});

module.exports = mongoose.model('Campground', CampgroundSchema);
