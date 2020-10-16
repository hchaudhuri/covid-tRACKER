const mongoose = require('mongoose');

let blogSchema = new mongoose.Schema({
	name: String,
	file: String,
	description: String,
	location: String,
	imageCap: String,
	quote: String,
	quoteauthor: String,
	subname1: String,
	subname2: String,
	subdescription: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	created: { type: Date, default: Date.now },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

let Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
