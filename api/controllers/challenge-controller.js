const { mongoose } = require('./../../config/mongoose');
const { Player, Challenge } = require('./../models/index');
const { ObjectID } = require('mongodb');

exports.getChallenges = (req, res) => {
	Challenge.find().then((challenges) => {
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

	Challenge.findById(id).then((challenge) => {
		res.send(challenge);
	}).catch((e) => {
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


exports.finishChallenge = (req, res) => {
	const id = req.params.challengeId;
	const payload = req.body;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send('id invalid');
	}

	Challenge.findByIdAndUpdate(id, { $set: payload }, { new: true }).then((challenge) => {
		if (!challenge) {
			return res.status(404).send('challenge not found');
		}
		res.send({ challenge });
	}).catch((e) => {
		res.status(400).send(e);
	});
}