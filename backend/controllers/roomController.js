const Room = require('../models/Room');
const Queue = require('../models/Queue');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('currentSongId');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Room name is required' });
    const existing = await Room.findOne({ name });
    if (existing) return res.status(409).json({ error: 'Room name already taken' });
    const room = await Room.create({ name });
    await Queue.create({ roomId: room._id, songs: [] });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('currentSongId');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    await Queue.deleteOne({ roomId: req.params.id });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete room' });
  }
};