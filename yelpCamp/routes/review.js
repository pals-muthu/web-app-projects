const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('./../utils/catchAsync');

const { validateReviewSchema } = require('./../utils/validationSchemas');

const isAuthenticated = require('./../utils/isAuthenticated');
const { isAuthorizedForReview } = require('./../utils/isAuthorized');

const Review = require('./../models/review');
const Campground = require('./../models/campground');

// ------------------------------------------------------------------------------------
// ALL REVIEW MODEL

router.post('/', isAuthenticated, validateReviewSchema, catchAsync(async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    _campground.reviews.push(review);
    await review.save();
    await _campground.save();
    req.flash('success', 'Added Review');
    res.redirect(`/campgrounds/${req.params.id}`);

}));

router.delete('/:rid', isAuthenticated, isAuthorizedForReview, catchAsync(async (req, res, next) => {
    // await Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.rid}});
    const _campground = await Campground.findById(req.params.id);
    await _campground.DeleteReview(req.params.rid);
    req.flash('success', 'Deleted Review');
    res.redirect(`/campgrounds/${req.params.id}`);
}));

module.exports = router;

