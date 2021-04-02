const Review = require('./../models/review');
const Campground = require('./../models/campground');

module.exports.addReview = async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    _campground.reviews.push(review);
    await review.save();
    await _campground.save();
    req.flash('success', 'Added Review');
    res.redirect(`/campgrounds/${req.params.id}`);

}

module.exports.deleteReview = async (req, res, next) => {
    // await Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.rid}});
    const _campground = await Campground.findById(req.params.id);
    await _campground.DeleteReview(req.params.rid);
    req.flash('success', 'Deleted Review');
    res.redirect(`/campgrounds/${req.params.id}`);
}
