const express = require('express');
const router = express.Router();

const catchAsync = require('./../utils/catchAsync');
const isAuthenticated = require('./../utils/isAuthenticated');
const { isAuthorizedForCampground } = require('./../utils/isAuthorized');
const { validateCampgroundSchema } = require('./../utils/validationSchemas');

const campground = require('./../controllers/campground');

const multer = require('multer');
const { storage } = require('./../cloudinary');
const upload = multer({ storage });
// ------------------------------------------------------------------------------------
// ALL CAMPGROUNDS

router.route('/')
    .get(catchAsync(campground.index))
    // .post(isAuthenticated, validateCampgroundSchema, catchAsync(campground.createCampground));
    .post(isAuthenticated, upload.array('campground[images]'), validateCampgroundSchema, catchAsync(campground.createCampground));

router.get('/new', isAuthenticated, catchAsync(campground.renderNewForm));

router.route('/:id')
    .get(catchAsync(campground.showCampground))
    .put(isAuthenticated, isAuthorizedForCampground, upload.array('campground[images]'), validateCampgroundSchema, catchAsync(campground.updateCampground))
    .delete(isAuthenticated, isAuthorizedForCampground, catchAsync(campground.deleteCampground));

router.get('/:id/edit', isAuthenticated, isAuthorizedForCampground, catchAsync(campground.renderEditForm));

module.exports = router;