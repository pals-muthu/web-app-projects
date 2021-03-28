const mongoose = require('mongoose');
const Review = require('./review');

const CampgroundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
});

CampgroundSchema.post('findOneAndDelete', async function (data) {
    // console.log("Bulk Delete");
    await Review.deleteMany({ _id: { $in: data.reviews } })
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
