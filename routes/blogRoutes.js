const express = require('express'),
	router = express.Router(),
	path = require('path'),
	fs = require('fs'),
	multer = require('multer'),
	miiddleware = require('../middleware'),
	blog = require('../models/blogs'),
	expressSanitizer = require('express-sanitizer');

let Storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

let upload = multer({
	storage: Storage
}).single('file');

// SHOW ALL BLOGS
router.get('/', function(req, res) {
	blog.find({}, function(error, allblogs) {
		if (error) {
			console.log('unable to retriev data from db');
			console.log(error);
		} else {
			res.render('blogs/allblogs', { blogs: allblogs });
		}
	});
});

//NEW BLOG FORM
router.get('/new', miiddleware.authCheck, function(req, res) {
	res.render('blogs/new');
});

//POSTING NEW BLOG
router.post('/new', upload, function(req, res) {
	const sanitizedName = req.sanitize(req.body.name),
		sanitizedDescription = req.sanitize(req.body.description),
		santizedlocation = req.sanitize(req.body.location),
		santizedsubname1 = req.sanitize(req.body.subname1),
		sanitizedquote = req.sanitize(req.body.quote),
		santizedimageCap = req.sanitize(req.body.imageCap),
		sanitizedquoteauthor = req.sanitize(req.body.quoteauthor),
		sanitizedsubname2 = req.sanitize(req.body.subname2),
		sanitizedsubdescription = req.sanitize(req.body.subdescription);

	blog.create(
		{
			name: sanitizedName,
			description: sanitizedDescription,
			file: req.file.filename,
			imageCap: santizedimageCap,
			location: santizedlocation,
			subname1: santizedsubname1,
			quote: sanitizedquote,
			quoteauthor: sanitizedquoteauthor,
			subname2: sanitizedsubname2,
			subdescription: sanitizedsubdescription
		},
		function(error, newaddedblog) {
			if (error) {
				console.log('error in creating a blog');
				console.log(error);
				req.flash('error',"SORRY! WE COULDN'T POST YOUR BLOG. PLEASE TRY LATER.")
				res.redirect('/');
			} else {
				// console.log('BLOG CREATED SUCCESSFULLY!!');
				//console.log(newaddedblog);
				blog.findById(newaddedblog, function(error) {
					if (error) {
						console.log('error while adding username to blog');
						console.log(error);
					} else {
						newaddedblog.author.id = req.user._id;
						newaddedblog.author.username = req.user.username;
						newaddedblog.save();
						req.flash('success', 'YOUR BLOG WAS POSTED SUCCESSFULLY.');
						res.redirect('/blogs');
					}
				});
			}
		}
	);
});

//SHOW ROUTE FOR A PARTICULAR BLOG
router.get('/:id', function(req, res) {
	blog.findById(req.params.id).populate('comments').exec(function(error, foundblog) {
		if (error) {
			res.redirect('/blogs');
		} else {
			res.render('blogs/show', { blog: foundblog });
		}
	});
});

//EDIT A BLOG---rendering form
router.get('/:id/edit', miiddleware.checkBlogOwnership, function(req, res) {
	blog.findById(req.params.id, function(error, foundblog) {
		res.render('blogs/edit', { blog: foundblog });
	});

	//is user is logged in?
	//otherwise,redirect
	//if not,redirect
});

//UPDATE campground--the form has to submit somewhere
router.put('/:id', miiddleware.checkBlogOwnership, function(req, res) {
	//find and update the correct campground
	blog.findByIdAndUpdate(req.params.id, req.body.blog, function(error, blog) {
		if (error) {
			res.redirect('/blogs');
		} else {
			req.flash('success','YOUR POST HAS BEEN UPDATED SUCCESSFULLY.')
			res.redirect('/blogs/' + req.params.id);
		}
	});
	//redirect somewhere(show template)
});

//DESTROY
router.delete('/:id', miiddleware.checkBlogOwnership, function(req, res) {
	blog.findByIdAndDelete(req.params.id, function(error) {
		if (error) {
			res.redirect('/blogs');
		} else {
			req.flash('error', 'YOUR POST WAS DELETED SUCCESSFULLY.');
			res.redirect('/blogs');
		}
	});
});

module.exports = router;
