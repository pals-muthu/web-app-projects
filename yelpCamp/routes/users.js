const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const user = require('./../controllers/user');

router.route('/register')
    .get(catchAsync(user.renderRegisterForm))
    .post(catchAsync(user.registerUser));

router.route('/login')
    .get(catchAsync(user.renderLoginForm))
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        catchAsync(user.loginUser));

router.get('/logout', user.logoutUser);

module.exports = router;