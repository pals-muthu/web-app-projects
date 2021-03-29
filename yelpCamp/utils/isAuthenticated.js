module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.lastPage = req.originalUrl;
        req.flash('error', 'You need to be logged in');
        return res.redirect('/login');
    }
    next();
}