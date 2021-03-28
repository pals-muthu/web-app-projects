const express = require('express');
const router = express.Router();

const catchAsync = require('./../utils/catchAsync');

const { validateCampgroundSchema } = require('./../utils/validationSchemas');

const Campground = require('./../models/campground');

// ------------------------------------------------------------------------------------
// ALL CAMPGROUNDS

router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/allCampgrounds', { campgrounds });
}));

router.post('/', validateCampgroundSchema, catchAsync(async (req, res, next) => {

    const _campground = await Campground({
        title: req.body.campground.title,
        location: req.body.campground.location,
        image: req.body.campground.image,
        description: req.body.campground.description,
        price: req.body.campground.price
    });
    _campground.save();
    res.redirect(`./campgrounds/${_campground._id}`);
}));

router.get('/new', (req, res) => {
    res.render('./campgrounds/newCampground');
});

router.get('/:id', catchAsync(async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id).populate('reviews');
    console.log(_campground);
    res.render('./campgrounds/showCampground', { campground: _campground });
}));

router.get('/:id/edit', catchAsync(async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id);
    // console.log(_campground);
    res.render('./campgrounds/editCampground', { campground: _campground });
}));

router.put('/:id', validateCampgroundSchema, catchAsync(async (req, res, next) => {
    // console.log(req.params);
    const _campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { new: true, runValidators: true });
    // console.log("updated: ", _campground);
    res.redirect(`/campgrounds/${_campground._id}`);
}));

router.delete('/:id', catchAsync(async (req, res, next) => {
    const _campground = await Campground.findByIdAndDelete(req.params.id);
    // console.log("deleted: ", _campground);
    res.redirect(`/campgrounds`);
}));


module.exports = router;