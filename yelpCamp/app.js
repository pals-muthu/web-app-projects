const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

// ------------------------------------------------------------------------------------
// MONGOOSE SPECIFICS
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("DB connected");
});

// ------------------------------------------------------------------------------------
// ALL COMMON MIDDLEWARE FUNCTIONS
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
});

app.get('/', (req, res) => {
    res.render('homePage');
});

// ------------------------------------------------------------------------------------
// ALL ROUTE MIDDLEWARE FUNCTIONS
const { campgroundRouter, reviewRouter } = require('./routes');

app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:id/reviews', reviewRouter);

// ------------------------------------------------------------------------------------
// ERROR HANDLING
app.use((req, res, next) => {
    // res.status(404).send('PAGE NOT FOUND');
    next(new ExpressError("PAGE NOT FOUND!!!", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong', stack = '' } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render('errorPage', { statusCode, message, stack });
});

app.listen('4000', () => {
    console.log("Listening on port 4000");
});

// ------------------------------------------------------------------------------------