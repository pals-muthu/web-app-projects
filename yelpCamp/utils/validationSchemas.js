const Joi = require('joi');
const ExpressError = require('./ExpressError');

function validateCampgroundSchema(req, res, next) {
    console.log("req body: ", req.body);
    // if (!req.body.campground) throw new ExpressError("Invalid Data", 400);
    const campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required().min(1),
            price: Joi.number().required().min(0),
            description: Joi.string().required(),
            image: Joi.string().required(),
            location: Joi.string().required(),
        })
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