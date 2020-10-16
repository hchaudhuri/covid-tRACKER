const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
	username: String,
	googleID: String,
	// avatar:String,

	// thumbnail: String,
	// email:String,
	// profileName:String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
