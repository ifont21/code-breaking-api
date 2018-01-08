const express = require('express');
const playerController = require('./../controllers/player-controller');
const challengeController = require('./../controllers/challenge-controller');

const router = express.Router();

router.route('/players')
	.get(playerController.getPlayers)
	.post(playerController.createAndRegister);

router.route('/players/:username')
	.patch(playerController.updatePlayer);


router.route('/challenges')
	.get(challengeController.getChallenges)
	.post(challengeController.createChallenge);

router.route('/challenges/:challengeId')
	.get(challengeController.getChallenge)
	.put(challengeController.finishChallenge);

module.exports = router;

