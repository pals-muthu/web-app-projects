const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp',
        allowed_formats: ['png', 'jpeg', 'jpg'] // supports promises as well
    },
});

// A dummy function call for now - used to implement security.
const filterFile = (req, file, cb) => {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    if (false) {
        cb(null, false)
    }
    else if (true) {
        // To accept the file pass `true`, like so:
        // console.log("calling true");
        cb(null, true)
    }
    else {
        // You can always pass an error if something goes wrong:
        cb(new Error('I don\'t have a clue!'))
    }
}

module.exports = {
    cloudinary,
    storage,
    filterFile
}