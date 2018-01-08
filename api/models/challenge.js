const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
	challengerOne: {
		player: { type: Schema.Types.ObjectId, ref: 'Player' },
		number: {
			type: String,
			default: '0000',
			minlength: 4
		},
		attempts: {
			type: Number,
			default: 0
		},
		winner: {
			type: Boolean,
			default: false
		}
	},
	challengerTwo: {
		player: { type: Schema.Types.ObjectId, ref: 'Player' },
		number: {
			type: String,
			default: '0000',
			minlength: 4
		},
		attempts: {
			type: Number,
			default: 0
		},
		winner: {
			type: Boolean,
			default: false
		}
	}
});

const Challenge = mongoose.model('Challenge', challengeSchema);



module.exports = { Challenge }; 