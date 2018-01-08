const { mongoose } = require('./../../config/mongoose');
const { Player, Challenge } = require('./../models/index');
const { ObjectID } = require('mongodb');

exports.getChallenges = (req, res) => {
	Challenge.find()
		.populate('challengerOne.player')
		.populate('challengerTwo.player')
		.exec()
		.then((challenges) => {
			res.send({ challenges });
		}).catch((e) => {
			res.status(500).send(e);
		});
}

exports.getChallenge = (req, res) => {
	const id = req.params.challengeId;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('id invalid');
	}

	Challenge.findById(id)
		.populate('challengerOne.player')
		.populate('challengerTwo.player')
		.exec()
		.then((challenge) => {
			res.send(challenge);
		})
		.catch((e) => {
			res.status(500).send(e);
		});
}

exports.createChallenge = (req, res) => {
	const challenge = new Challenge();
	Player.find({
		"$or": [
			{ "username": req.body.challengerOne },
			{ "username": req.body.challengerTwo }
		]
	}).then((players) => {
		if (players.length === 2) {
			challenge.challengerOne.player = players[0];
			challenge.challengerTwo.player = players[1];
			challenge.save().then((doc) => {
				res.status(201).send(doc);
			}, (error) => {
				res.status(400).send(error);
			});
		} else {
			res.status(500).send('a challenger not found')
		}
	}, (error) => {
		res.status(500).send(error);
	});
};

exports.deleteAll = (req, res) => {
	Challenge.remove()
		.then(() => {
			res.status(200).send({ message: 'All was Deleted successfully!' });
		}).catch((e) => {
			res.status(400).send(e);
		})
}


exports.finishChallenge = (req, res) => {
	const id = req.params.challengeId;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('id invalid');
	}

	Challenge.findById(id)
		.populate('challengerOne.player')
		.populate('challengerTwo.player')
		.exec()
		.then((challenge) => {
			if (!challenge) {
				return res.status(404).send('challenge not found');
			}
			challenge.challengerOne.number = req.body.challengerOne.number;
			challenge.challengerOne.attempts = req.body.challengerOne.attempts;
			challenge.challengerOne.winner = req.body.challengerOne.winner;
			challenge.challengerTwo.number = req.body.challengerTwo.number;
			challenge.challengerTwo.attempts = req.body.challengerTwo.attempts;
			challenge.challengerTwo.winner = req.body.challengerTwo.winner;

			Challenge.findByIdAndUpdate(id, { $set: challenge }, { new: true })
				.then((challenge) => {
					if (!challenge) {
						return res.status(404).send('challenge not found');
					}
					res.send({ challenge });
				}).catch((e) => {
					res.status(400).send(e);
				});
		}).catch((e) => {
			res.status(400).send(e);
		});
}