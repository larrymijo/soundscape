const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  songs: [{
    songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
    addedAt: { type: Date, default: Date.now },
    votes: { type: Number, default: 0 }
  }]
});

module.exports = mongoose.model('Queue', queueSchema);