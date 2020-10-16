const router = require('express').Router(),
	passport = require('passport'),
	user = require('../models/user');

//auth login
router.get('/login', function(req, res) {
	res.render('login', { user: req.user });
	// req.flash('success', 'Welcome' + user.username);
	// res.redirect('/blogs');
});

//auth logout
router.get('/logout', function(req, res) {
	//handle with passport
	req.logOut();
	req.flash('success', 'YOU HAVE SIGNED OUT FROM covid tRACKER.');
	res.redirect('/blogs');
});

//auth with google
router.get(
	'/google',
	passport.authenticate('google', {
		scope: [ 'profile','email' ]
	})
);

//callback routes for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), function(req, res) {
	// res.send(req.user);
	req.flash('success', 'WELCOME TO covid tRACKER. YOU CAN NOW CREATE YOUR OWN BLOG. ');
	res.redirect('/blogs');
});

module.exports = router;
