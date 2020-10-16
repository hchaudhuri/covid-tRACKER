const express = require('express'),
	app = express(),
	axios = require('axios'),
	bodyparser = require('body-parser'),
	blog = require('./models/blogs'),
	comment = require('./models/comments'),
	// seedDB = require('./seeds'),
	flash = require('connect-flash'),
	methodOverride = require('method-override'),
	path = require('path'),
	fs = require('fs'),
	multer = require('multer'),
	mongoose = require('mongoose'),
	keys = require('./config/keys'),
	User = require('./models/user'),
	passportSetup = require('./config/passport-setup'),
	cookieSession = require('cookie-session'),
	passport = require('passport'),
	localStratergy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	expressSanitizer = require('express-sanitizer');

const authRoutes = require('./routes/authRoutes'),
	indexRoutes = require('./routes/indexRoutes'),
	worldRoutes = require('./routes/worldRoutes'),
	indiaRoutes = require('./routes/indiaRoutes'),
	blogRoutes = require('./routes/blogRoutes'),
	commentRoutes = require('./routes/commentRoutes');

const { findSourceMap } = require('module');

let url=process.env.DATABASEURL||'mongodb://localhost:27017/covidProject';

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => console.log('Connected to DB!'))
	.catch((error) => console.log(error.message));

app.set('view engine', 'ejs');
app.use(expressSanitizer());
//Oauth2.0 authentication
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000, //in milliseconds
		keys: [ keys.session.cookieKey ]
	})
);

app.use(flash());
//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

let Storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

let upload = multer({
	storage: Storage
}).single('file');

// seedDB();

app.use(function(req, res, next) {
	res.locals.user = req.user;
	// res.locals.User.googleID = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use('/auth', authRoutes);
app.use(indexRoutes);
app.use(worldRoutes);
app.use(indiaRoutes);
app.use('/blogs', blogRoutes);
app.use('/blogs/:id/comments', commentRoutes);

let port = process.env.PORT || 3000;

app.listen(port, function(error) {
	if (error) {
		console.log('REFUSED TO CONNECT');
		console.log(error);
	} else {
		console.log('The covid tRACKER server has started');
	let time = new Date();
	console.log('Server working began at:');
	console.log(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
	}
});
