const mongoose = require('mongoose');
const Queue = require('../models/Queue');
const Song = require('../models/Song');

exports.getQueue = async (req, res) => {
  try {
    const queue = await Queue.findOne({ roomId: req.params.roomId }).populate('songs.songId');
    if (!queue) return res.status(404).json({ error: 'Queue not found' });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch queue' });
  }
};

exports.addToQueue = async (req, res) => {
  try {
    const { songId } = req.body;
    if (!songId) return res.status(400).json({ error: 'songId is required' });
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(400).json({ error: 'Invalid songId format' });
    }
    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    const queue = await Queue.findOneAndUpdate(
      { roomId: req.params.roomId },
      { $push: { songs: { songId } } },
      { new: true }
    ).populate('songs.songId');
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to queue' });
  }
};

exports.removeFromQueue = async (req, res) => {
  try {
    const queue = await Queue.findOneAndUpdate(
      { roomId: req.params.roomId },
      { $pull: { songs: { _id: req.params.entryId } } },
      { new: true }
    ).populate('songs.songId');
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from queue' });
  }
};