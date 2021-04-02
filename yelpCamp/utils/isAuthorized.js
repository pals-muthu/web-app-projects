const Campground = require('./../models/campground');

module.exports.isAuthorizedForCampground = async (req, res, next) => {
    const _campground = await Campground.findOne({ _id: req.params.id, author: req.user._id });
    if (!_campground) {
        req.flash('error', 'Unauthorized!');
        return res.redirect(`/campgrounds/${req.params.id}`);
    }
    next();
}