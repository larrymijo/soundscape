const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 50 },
  createdAt: { type: Date, default: Date.now },
  listenerCount: { type: Number, default: 0 },
  currentSongId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', default: null },
  playbackPosition: { type: Number, default: 0 },
  isPlaying: { type: Boolean, default: false }
});

module.exports = mongoose.model('Room', roomSchema);