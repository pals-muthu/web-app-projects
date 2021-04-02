const Campground = require('./../models/campground');
const Review = require('./../models/review');

module.exports.isAuthorizedForCampground = async (req, res, next) => {
    const _campground = await Campground.findOne({ _id: req.params.id, author: req.user._id });
    if (!_campground) {
        req.flash('error', 'Unauthorized!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}

module.exports.isAuthorizedForReview = async (req, res, next) => {
    const _review = await Review.findOne({ _id: req.params.rid, author: req.user._id });
    if (!_review) {
        req.flash('error', 'Unauthorized!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}