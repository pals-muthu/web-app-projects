const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user');

router.get('/register', catchAsync(async (req, res, next) => {
    res.render('./users/register');
}));

router.post('/register', catchAsync(async (req, res, next) => {
    const { email, username, password } = req.body.user;
    const user = new User({ email, username });
    try {
        const registerdUser = await User.register(user, password);
        if (registerdUser) {
            req.flash('success', `Registered ${user.username}`);
            res.redirect('/campgrounds');
        }
        else {
            req.flash('error', `Could not register the user`);
            res.redirect('/register');
        }
    } catch (err) {
        console.log("error: ", err);
        req.flash('error', err.message);
        res.redirect('/register');
    }

}));

router.get('/login', catchAsync(async (req, res, next) => {
    res.render('./users/login');
}));

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    catchAsync(async (req, res, next) => {
        req.flash('success', 'welcome back!');
        res.redirect('/campgrounds');
    }));

module.exports = router;