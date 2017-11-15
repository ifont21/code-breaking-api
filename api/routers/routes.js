const express = require('express');
const playerController = require('./../controllers/player-controller');
const challengeController = require('./../controllers/challenge-controller');

const router = express.Router();

router.route('/players')
	.post(playerController.createAndRegister);

router.route('/signin')
	.post(playerController.signin);

router.route('/challenges')
	.post(challengeController.createChallenge);


export default router;

