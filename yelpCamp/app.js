const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');

const mongoose = require('mongoose');
const Campground = require('./models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("DB connected");
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Here app.use gets executed before any of the matching route callback functions,
// so basically here is the place we tell express to do something before going to the routes.
// although app.use can be used to handle req, res.
// All the app.use/get/put/post are middleware functions that are chained together in the order they are defined.
// so once the first middleware function call is done, the next middleware function in the sequence needs to be called for which the next() is used.
// first middleware
app.use(express.urlencoded({ extended: true }));
// second middleware
app.use(methodOverride('_method'));
// third middleware
app.use(morgan('tiny'));
// My Middleware function
app.use((req, res, next) => {
    console.log("Request received with query: ", req.query);
    next();
    // not advised
    console.log("After calling the middleware");
})

app.get('/', (req, res) => {
    res.render('homePage');
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('./campgrounds/allCampgrounds', { campgrounds });
})

app.post('/campgrounds', async (req, res) => {
    const _campground = await Campground({
        title: req.body.campground.title,
        location: req.body.campground.location
    });
    _campground.save();
    res.redirect(`./campgrounds/${_campground._id}`);
})

app.get('/campgrounds/new', (req, res) => {
    res.render('./campgrounds/newCampground');
})

app.get('/campgrounds/:id', async (req, res) => {
    const _campground = await Campground.findById(req.params.id);
    // console.log(_campground);
    res.render('./campgrounds/showCampground', { campground: _campground });
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const _campground = await Campground.findById(req.params.id);
    // console.log(_campground);
    res.render('./campgrounds/editCampground', { campground: _campground });
})

app.put('/campgrounds/:id', async (req, res) => {
    console.log(req.params);
    const _campground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    // console.log("updated: ", _campground);
    res.redirect(`/campgrounds/${_campground._id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
    const _campground = await Campground.findByIdAndDelete(req.params.id);
    // console.log("deleted: ", _campground);
    res.redirect(`/campgrounds`);
})

app.use((req, res) => {
    res.status(404).send('PAGE NOT FOUND');
})

app.listen('4000', () => {
    console.log("Listening on port 4000");
})