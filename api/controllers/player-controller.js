const { mongoose } = require('./../../config/mongoose');
const { Player } = require('./../models/index');

exports.getPlayers = (req, res) => {
	Player.find().then((players) => {
		res.send(players);
	}, (err) => {
		res.status(500).send(err);
	});
}

exports.createAndRegister = (req, res) => {
	Player.findOne({ 'username': req.body.username }).then((player) => {
		if (!player) {
			const player = new Player({
				username: req.body.username
			});
			player.save().then((doc) => {
				res.send(doc);
			}, (error) => {
				res.status(400).send(error);
			});
		} else {
			res.send(player);
		}
	}, (err) => {
		res.status(500).send(err);
	});

};

exports.updatePlayer = (req, res) => {
	const username = req.params.username;
	const winner = req.body.winner;

	Player.findOne({ username }).then((player) => {
		if (!player) {
			return res.status(404).send();
		}
		if (typeof winner === 'boolean' && winner) {
			Player.findByIdAndUpdate(player._id, { $inc: { wins: 1, number_games: 1 } }, { new: true }).then((player) => {
				if (!player) {
					return res.status(404).send('not found player');
				}
				res.send({ player });
			}).catch((e) => {
				res.status(500).send(e);
			});
		} else {
			Player.findByIdAndUpdate(player._id, { $inc: { defeats: 1, number_games: 1 } }, { new: true }).then((player) => {
				if (!player) {
					return res.status(404).send('not found player');
				}
				res.send({ player });
			}).catch((e) => {
				res.status(500).send(e);
			});
		}
	}).catch((e) => {
		res.status(500).send(e);
	});
}

