const express = require('express');
const router = express.Router({ mergeParams: true });
const { getQueue, addToQueue, removeFromQueue } = require('../controllers/queueController');

router.get('/', getQueue);
router.post('/', addToQueue);
router.delete('/:entryId', removeFromQueue);

module.exports = router;