const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const user = require('./../controllers/user');

router.get('/register', catchAsync(user.renderRegisterForm));

router.post('/register', catchAsync(user.registerUser));

router.get('/login', catchAsync(user.renderLoginForm));

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    catchAsync(user.loginUser));

router.get('/logout', catchAsync(user.logoutUser));

module.exports = router;