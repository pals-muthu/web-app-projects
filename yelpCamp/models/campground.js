const mongoose = require('mongoose');
const Review = require('./review');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroundSchema.post('findOneAndDelete', async function (data) {
    // console.log("Bulk Delete");
    if (data) {
        await Review.deleteMany({ _id: { $in: data.reviews } })
    }
});

CampgroundSchema.methods.DeleteReview = async function (reviewID) {
    // console.log("Deleting Review: ", reviewID);
    // console.log("Old reviews: ", this.reviews);
    this.reviews = this.reviews.filter(_id => _id !== reviewID);
    // console.log("new reviews: ", this.reviews);
    await Review.findByIdAndDelete(reviewID);
    await this.save();
}

module.exports = mongoose.model('Campground', CampgroundSchema);
