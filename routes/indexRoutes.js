const express = require('express'),
User = require('../models/user'),
blog=require('../models/blogs'),
	router = express.Router();

router.get('/', function(req, res) {
	
	res.render('index');
});

router.get('/about',function(req,res){
	res.render('about');
});

router.get('/users/:id',function(req,res){
User.findById(req.params.id,function(error,foundUser){
	if(error){
		req.flash('errror','SOMETHING WENT WRONG');
		return res.redirect('/blogs');
	}
	blog.find().where('author.id').equals(foundUser._id).exec(function(error,blogs){
		if(error){
			req.flash('error','SOMETHING WENT WRONG.');
			return res.redirect('/');
		}
		res.render('profile',{user:foundUser,blogs:blogs});
	})

	
})
});

module.exports = router;
