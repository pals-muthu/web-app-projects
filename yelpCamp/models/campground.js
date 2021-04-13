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
}, { toJSON: { virtuals: true } });

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

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return {
        _id: this._id,
        title: this.title,
        location: this.location
    };
    // return `I am a popup`;
})

CampgroundSchema.virtual('properties.id').get(function () {
    return this._id;
})

module.exports = mongoose.model('Campground', CampgroundSchema);
