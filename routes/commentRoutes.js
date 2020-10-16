const express = require('express'),
	router = express.Router({ mergeParams: true }),
	blog = require('../models/blogs'),
	middleware = require('../middleware'),
	comment = require('../models/comments');

router.get('/new', middleware.authCheck, function(req, res) {
	blog.findById(req.params.id, function(error, blog) {
		if (error) {
			console.log('ERROR IN CREATING COMMENT');
			console.log(error);
		} else {
			res.render('comments/new', { blog: blog });
		}
	});
});

router.post('/', middleware.authCheck, function(req, res) {
	blog.findById(req.params.id, function(error, blog) {
		if (error) {
			console.log(error);
			res.redirect('/blogs');
		} else {
			comment.create(req.body.comment, function(error, comment) {
				if (error) {
					req.flash('error', 'SOMETHING WENT WRONG. SORRY!');
					console.log(error);
				} else {
					//connect new comment to blog
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					blog.comments.push(comment);
					blog.save();
					console.log(comment);
					//redirect to blog show page
					req.flash('success', "YOUR COMMENT HAS BEEN POSTED. (please refresh page if your comment is not visible)");
					res.redirect('/blogs/' + blog._id);
				}
			});
		}
	});
});

//EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
	comment.findById(req.params.comment_id, function(error, foundComment) {
		if (error) {
			res.redirect('back');
		} else {
			res.render('comments/edit', { blog_id: req.params.id, comment: foundComment });
		}
	});
});

//UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, updatedComment) {
		if (error) {
			res.redirect('back');
		} else {
			req.flash('success',"YOUR COMMENT HAS BEEN UPDATED.")
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	comment.findByIdAndDelete(req.params.comment_id, function(error, deletedComment) {
		if (error) {
			res.redirect('back');
		} else {
			req.flash('success', 'YOUR COMMENT HAS BEEN DELETED.');
			res.redirect('back');
		}
	});
});
module.exports = router;
