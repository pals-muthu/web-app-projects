const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
const Campground = require('./models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("DB connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

app.listen('4000', () => {
    console.log("Listening on port 4000");
})