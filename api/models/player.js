const mongoose = require('mongoose');

const Player = mongoose.model('Player', {
	username: {
		type: String,
		required: true,
		minlength: 1,
		unique: true
	},
	number_games: {
		type: Number,
		default: 0
	},
	wins: {
		type: Number,
		default: 0
	},
	defeats: {
		type: Number,
		default: 0
	}
});

module.exports = { Player }; 