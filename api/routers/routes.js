const express = require('express');
const playerController = require('./../controllers/player-controller');
const challengeController = require('./../controllers/challenge-controller');

const router = express.Router();

router.route('/players')
	.get(playerController.getPlayers)
	.post(playerController.createAndRegister)
	.delete(playerController.deleteAll);

router.route('/players/:id')
	.patch(playerController.updatePlayer);


router.route('/ranking')
	.get(playerController.getPlayerRanking);


router.route('/challenges')
	.get(challengeController.getChallenges)
	.post(challengeController.createChallenge)
	.delete(challengeController.deleteAll);

router.route('/challenges/:challengeId')
	.get(challengeController.getChallenge)
	.put(challengeController.finishChallenge);

module.exports = router;

