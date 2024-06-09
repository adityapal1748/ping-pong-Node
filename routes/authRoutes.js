const express = require('express');
const { login } = require('../controllers/login');
const { activePlayers } = require('../controllers/activePlayers');

const router = express.Router();

router.post('/login',login );
router.get('/activePlayers',activePlayers);

module.exports = router;