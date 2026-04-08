const express = require('express');
const router = express.Router({ mergeParams: true });
const { getRoomStats, getSongs } = require('../controllers/statsController');

router.get('/rooms/:roomId/stats', getRoomStats);
router.get('/songs', getSongs);

module.exports = router;