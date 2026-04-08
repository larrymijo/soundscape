const Room = require('../models/Room');
const Queue = require('../models/Queue');
const Song = require('../models/Song');

exports.getRoomStats = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId).populate('currentSongId');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    const queue = await Queue.findOne({ roomId: req.params.roomId }).populate('songs.songId');
    const avgBpm = queue?.songs?.length
      ? Math.round(queue.songs.reduce((sum, s) => sum + (s.songId?.bpm || 0), 0) / queue.songs.length)
      : 0;
    res.json({
      roomName: room.name,
      listenerCount: room.listenerCount,
      currentSong: room.currentSongId,
      currentBpm: room.currentSongId?.bpm || 0,
      avgQueueBpm: avgBpm,
      queueLength: queue?.songs?.length || 0
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.getSongs = async (req, res) => {
  try {
    const { genre } = req.query;
    const filter = genre ? { genre } : {};
    const songs = await Song.find(filter);
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};