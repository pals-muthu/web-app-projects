const Campground = require('./../models/campground');
const { cloudinary } = require('./../cloudinary');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/allCampgrounds', { campgrounds });
}

module.exports.renderNewForm = async (req, res, next) => {
    res.render('./campgrounds/newCampground');
}

module.exports.createCampground = async (req, res, next) => {
    // console.log("req.files: ", req.files);
    // console.log("map", req.files.map(f => ({ url: f.path, filename: f.filename })))
    const _campground = await Campground({
        title: req.body.campground.title,
        location: req.body.campground.location,
        images: req.files.map(f => ({ url: f.path, filename: f.filename })),
        description: req.body.campground.description,
        price: req.body.campground.price,
        author: req.user._id
    });
    _campground.save();
    req.flash('success', 'Created a new campgroud!!!');
    res.redirect(`/campgrounds/${_campground._id}`);
}

module.exports.showCampground = async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id).populate('author').populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    // console.log(_campground);
    if (!_campground) {
        req.flash('error', 'Cannot find the campground!');
        return res.redirect('/campgrounds');
    }
    res.render('./campgrounds/showCampground', { campground: _campground });
}

module.exports.renderEditForm = async (req, res, next) => {
    const _campground = await Campground.findById(req.params.id);
    // console.log(_campground);
    res.render('./campgrounds/editCampground', { campground: _campground });
}

module.exports.updateCampground = async (req, res, next) => {

    // second filter of the user id here is not required. Just put in here as reminder that this can be done with one db request
    // instead of user a middleware
    // const _campground = await Campground.findOneAndUpdate({ _id: req.params.id, author: req.user._id }, req.body.campground, { new: true, runValidators: true });

    // if (!_campground) {
    //     req.flash('error', 'Unauthorized!');
    //     return res.redirect(`/campgrounds/${req.params.id}`);
    // }
    const _campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground, { new: true, runValidators: true });
    _campground.images.push(...(req.files.map(f => ({ url: f.path, filename: f.filename }))));
    await _campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await _campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Updated Campground!');
    res.redirect(`/campgrounds/${_campground._id}`);
}

module.exports.deleteCampground = async (req, res, next) => {
    const _campground = await Campground.findByIdAndDelete({ _id: req.params.id, author: req.user._id });
    // console.log("deleted: ", _campground);
    if (_campground.images) {
        for (let image of _campground.images) {
            await cloudinary.uploader.destroy(image.filename);
        }
        await _campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Deleted Campground!');
    res.redirect(`/campgrounds`);
}

