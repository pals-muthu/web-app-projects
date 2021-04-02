const express = require('express');
const router = express.Router();

const catchAsync = require('./../utils/catchAsync');
const isAuthenticated = require('./../utils/isAuthenticated');
const { validateCampgroundSchema } = require('./../utils/validationSchemas');

const Campground = require('./../models/campground');

// ------------------------------------------------------------------------------------
// ALL CAMPGROUNDS

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/allCampgrounds', { campgrounds });
}));

router.post('/', isAuthenticated, validateCampgroundSchema, catchAsync(async (req, res, next) => {
    const _campground = await Campground({
        title: req.body.campground.title,
        location: req.body.campground.location,
        image: req.body.campground.image,
        description: req.body.campground.description,
        price: req.body.campground.price,
        author: req.user._id
    });
    _campground.save();
    req.flash('success', 'Created a new campgroud!!!');
    res.redirect(`/campgrounds/${_campground._id}`);
}));

router.get('/new', isAuthenticated, (req, res) => {
    res.render('./campgrounds/newCampground');
});

router.get('/:id', catchAsync(async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    console.log(_campground);
    if (!_campground) {
        req.flash('error', 'Cannot find the campground!');
        res.redirect('/campgrounds');
    }
    res.render('./campgrounds/showCampground', { campground: _campground });
}));

router.get('/:id/edit', isAuthenticated, catchAsync(async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id);
    // console.log(_campground);
    res.render('./campgrounds/editCampground', { campground: _campground });
}));

router.put('/:id', isAuthenticated, validateCampgroundSchema, catchAsync(async (req, res, next) => {
    // console.log(req.params);
    const _campground = await Campground.findOneAndUpdate({ _id: req.params.id, author: req.user._id }, req.body.campground, { new: true, runValidators: true });
    // console.log("updated: ", _campground);
    if (!_campground) {
        req.flash('error', 'Unauthorized!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    req.flash('success', 'Updated Campground!');
    res.redirect(`/campgrounds/${_campground._id}`);
}));

router.delete('/:id', isAuthenticated, catchAsync(async (req, res, next) => {
    const _campground = await Campground.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!_campground) {
        req.flash('error', 'Unauthorized!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    console.log("deleted: ", _campground);
    req.flash('success', 'Deleted Campground!');
    res.redirect(`/campgrounds`);
}));

module.exports = router;