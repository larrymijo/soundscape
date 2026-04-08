const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  bpm: { type: Number, required: true, min: 40, max: 300 },
  audioUrl: { type: String, required: true },
  duration: { type: Number, required: true },   // seconds — custom domain field
  genre: { type: String, required: true },       // custom domain field
  coverColor: { type: String, default: '#6C63FF' }
});

module.exports = mongoose.model('Song', songSchema);