const { mongoose } = require('./../../config/mongoose');
const { Player } = require('./../models/index');

exports.createAndRegister = (req, res) => {
	const player = new Player({
		username: req.body.username
	});
	player.save().then((doc) => {
		res.send(doc);
	}, (error) => {
		res.status(400).send(error);
	});
};

exports.signin = (req, res) => {
	Player.findOne({ 'username': req.body.username }).then((player) => {
		res.send(player);
	}, (err) => {
		res.status(500).send(err);
	});
}

