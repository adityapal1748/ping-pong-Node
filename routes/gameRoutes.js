const express = require('express');
const {createGameRooms} = require('../controllers/gameController');
const { getGameData } = require('../controllers/gameData');

const router = express.Router();

router.post('/gameController',createGameRooms );
router.get('/gameData/:roomId', getGameData);


module.exports = router;