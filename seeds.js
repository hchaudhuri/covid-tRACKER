const mongoose = require('mongoose'),
	blog = require('./models/blogs'),
	comment = require('./models/comments');

let data = [
	{
		name: 'Blog1',
		image:
			'https://images.unsplash.com/photo-1524668951403-d44b28200ce0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpeg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: 'Blog2',
		image:
			'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpeg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: 'Blog3',
		image:
			'https://images.unsplash.com/photo-1501522774256-bd04816aaf24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60.jpeg',
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
];

// function seedDB() {
// 	blog.deleteMany({}, function(error) {
// 		// 	if (error) {
// 		// 		console.log('error 1st ');
// 		// 		console.log(error);
// 		// 	} else {
// 		// 		console.log('deleted all blogs');
// 		// 	}
// 		// 	comment.deleteMany({}, function(error) {
// 		// 		if (error) {
// 		// 			console.log(error);
// 		// 		} else {
// 		// 			console.log('deleted all comments');
// 		// 		}
// 		// 	});
// 		// });
// 		// data.forEach(function(seed) {
// 		// 	blog.create(seed, function(error, blog) {
// 		// 		if (error) {
// 		// 			console.log('error 2nd');
// 		// 			console.log(error);
// 		// 		} else {
// 		// 			console.log('added blog');
// 		// 			comment.create(
// 		// 				{
// 		// 					text: 'A very nice blog!',
// 		// 					author: 'Jacobin Perk'
// 		// 				},
// 		// 				function(error, comment) {
// 		// 					if (error) {
// 		// 						console.log(error);
// 		// 					} else {
// 		// 						blog.comments.push(comment);
// 		// 						blog.save();
// 		// 						console.log('created a new comment');
// 		// 					}
// 		// 				}
// 		// 			);
// 		// 		}
// 		// 	});
// 	});
// }

// module.exports = seedDB;
