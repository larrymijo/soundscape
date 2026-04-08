const express = require('express');
const router = express.Router();
const { getRooms, createRoom, getRoom, deleteRoom } = require('../controllers/roomController');

router.get('/', getRooms);
router.post('/', createRoom);
router.get('/:id', getRoom);
router.delete('/:id', deleteRoom);

module.exports = router;