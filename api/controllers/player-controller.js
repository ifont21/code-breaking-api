const { mongoose } = require('./../../config/mongoose');
const { Player } = require('./../models/index');
const { ObjectID } = require('mongodb');

const _ = require('lodash');

exports.getPlayers = (req, res) => {
	Player.find().then((players) => {
		res.send(players);
	}, (err) => {
		res.status(500).send(err);
	});
}

exports.getPlayerRanking = (req, res) => {
	Player.find().then((players) => {
		const sortedArray = _.orderBy(players, ['wins'], ['desc']);
		res.send(sortedArray);
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
	const playerId = req.params.id;
	const winner = req.body.winner;

	if (!ObjectID.isValid(playerId)) {
		return res.status(404).send('id invalid');
	}

	if (typeof winner === 'boolean' && winner) {
		Player.findByIdAndUpdate(playerId, { $inc: { wins: 1, number_games: 1 } }, { new: true }).then((player) => {
			if (!player) {
				return res.status(404).send('not found player');
			}
			res.send({ player });
		}).catch((e) => {
			res.status(500).send(e);
		});
	} else {
		Player.findByIdAndUpdate(playerId, { $inc: { defeats: 1, number_games: 1 } }, { new: true }).then((player) => {
			if (!player) {
				return res.status(404).send('not found player');
			}
			res.send({ player });
		}).catch((e) => {
			res.status(500).send(e);
		});
	}
}

exports.deleteAll = (req, res) => {
	Player.remove()
		.then(() => {
			res.status(200).send({ message: 'All was Deleted successfully!' });
		}).catch((e) => {
			res.status(500).send(e);
		});
}

