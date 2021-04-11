const Joi = require('joi');
const ExpressError = require('./ExpressError');

function validateCampgroundSchema(req, res, next) {
    console.log("req body: ", req.body);
    const campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required().min(1),
            price: Joi.number().required().min(0),
            description: Joi.string().required(),
            // images: Joi.string().required(),
            location: Joi.string().required(),
        }).required(),
        deleteImages: Joi.array()
    })
    const result = campgroundSchema.validate(req.body);
    const { error } = result;
    if (error) {
        const errMsg = error.details.map(em => em.message).join(',');
        throw new ExpressError(errMsg, 400);
    }
    else {
        next();
    }
}

module.exports.validateCampgroundSchema = validateCampgroundSchema;

function validateReviewSchema(req, res, next) {
    console.log("req body: ", req.body);
    // if (!req.body.review) throw new ExpressError("Invalid Data", 400);
    const reviewSchema = Joi.object({
        review: Joi.object({
            body: Joi.string().required().min(1),
            rating: Joi.number().required().min(1).max(5),
        }).required()
    })
    const result = reviewSchema.validate(req.body);
    const { error } = result;
    if (error) {
        const errMsg = error.details.map(em => em.message).join(',');
        throw new ExpressError(errMsg, 400);
    }
    else {
        next();
    }
}

module.exports.validateReviewSchema = validateReviewSchema;