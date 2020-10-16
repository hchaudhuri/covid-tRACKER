const passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth20'),
	keys = require('./keys'),
	User = require('../models/user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			//options for the strategy

			clientID: process.env.CLIENTID,
			clientSecret: process.env.CLIENTSECRET,
			callbackURL: '/auth/google/redirect'
		},
		(accessToken, refreshToken, profile, done) => {
			console.log(profile);
			//check if user already exists in db
			User.findOne({ googleID: profile.id }).then((currentUser) => {
				if (currentUser) {
					//already have the user
					console.log('user is:', currentUser);
					done(null, currentUser);
				} else {
					//if not,create user in db
					new User({
						username: profile.displayName,
						googleID: profile.id
						// profileName:profile.name,
						// email:profile.emails

						// email: profile.email
						// thumbnail: profile._json.photos.value
					})
						.save()
						.then((newUser) => {
							console.log('new user created' + newUser);
							done(null, newUser);
						})
						.catch((error) => console.log(error.message));
				}
			});
		}
	)
);


