const express = require('express');
const router = express.Router();

const catchAsync = require('./../utils/catchAsync');
const isAuthenticated = require('./../utils/isAuthenticated');
const { isAuthorizedForCampground } = require('./../utils/isAuthorized');
const { validateCampgroundSchema } = require('./../utils/validationSchemas');

const campground = require('./../controllers/campground');
// ------------------------------------------------------------------------------------
// ALL CAMPGROUNDS

router.get('/', catchAsync(campground.index));

router.post('/', isAuthenticated, validateCampgroundSchema, catchAsync(campground.createCampground));

router.get('/new', isAuthenticated, catchAsync(campground.renderNewForm));

router.get('/:id', catchAsync(campground.showCampground));

router.get('/:id/edit', isAuthenticated, isAuthorizedForCampground, catchAsync(campground.renderEditForm));

router.put('/:id', isAuthenticated, isAuthorizedForCampground, validateCampgroundSchema, catchAsync(campground.updateCampground));

router.delete('/:id', isAuthenticated, isAuthorizedForCampground, catchAsync(campground.deleteCampground));

module.exports = router;