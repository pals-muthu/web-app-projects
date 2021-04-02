
const User = require('../models/user');

module.exports.renderRegisterForm = async (req, res, next) => {
    res.render('./users/register');
}

module.exports.registerUser = async (req, res, next) => {
    const { email, username, password } = req.body.user;
    const user = new User({ email, username });
    try {
        const registerdUser = await User.register(user, password);
        if (registerdUser) {
            req.login(registerdUser, (err) => {
                if (err) return next(err);
                req.flash('success', `Registered ${user.username}`);
                res.redirect('/campgrounds');
            })
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

}

module.exports.renderLoginForm = async (req, res, next) => {
    res.render('./users/login');
}

module.exports.loginUser = async (req, res, next) => {
    req.flash('success', 'welcome back!');
    const redirectURL = req.session.lastPage || '/campgrounds';
    req.session.lastPage = null;
    res.redirect(redirectURL);
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'Logged out');
    res.redirect('/campgrounds');
}