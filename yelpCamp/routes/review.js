const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('./../utils/catchAsync');

const { validateReviewSchema } = require('./../utils/validationSchemas');

const isAuthenticated = require('./../utils/isAuthenticated');
const { isAuthorizedForReview } = require('./../utils/isAuthorized');

const review = require('./../controllers/review')

// ------------------------------------------------------------------------------------
// ALL REVIEW MODEL

router.post('/', isAuthenticated, validateReviewSchema, catchAsync(review.addReview));

router.delete('/:rid', isAuthenticated, isAuthorizedForReview, catchAsync(review.deleteReview));

module.exports = router;

