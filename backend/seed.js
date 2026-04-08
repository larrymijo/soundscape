require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Song = require('./models/Song');
const Room = require('./models/Room');
const Queue = require('./models/Queue');

const songs = [
  { title: 'Blinding Lights', artist: 'The Weeknd', bpm: 171, audioUrl: '/audio/blinding-lights.mp3', duration: 200, genre: 'Synthpop', coverColor: '#E83A5C' },
  { title: 'Levitating', artist: 'Dua Lipa', bpm: 103, audioUrl: '/audio/levitating.mp3', duration: 203, genre: 'Disco-pop', coverColor: '#9B59B6' },
  { title: 'Stay', artist: 'Justin Bieber', bpm: 105, audioUrl: '/audio/stay.mp3', duration: 138, genre: 'Pop', coverColor: '#3498DB' },
  { title: 'Industry Baby', artist: 'Lil Nas X', bpm: 149, audioUrl: '/audio/industry-baby.mp3', duration: 212, genre: 'Hip-Hop', coverColor: '#F39C12' },
  { title: 'bad guy', artist: 'Billie Eilish', bpm: 135, audioUrl: '/audio/bad-guy.mp3', duration: 194, genre: 'Electropop', coverColor: '#2ECC71' },
  { title: 'Shivers', artist: 'Ed Sheeran', bpm: 140, audioUrl: '/audio/shivers.mp3', duration: 207, genre: 'Pop', coverColor: '#E74C3C' },
  { title: 'Heat Waves', artist: 'Glass Animals', bpm: 80, audioUrl: '/audio/heat-waves.mp3', duration: 238, genre: 'Indie', coverColor: '#1ABC9C' }
];

const rooms = [
  { name: 'Late Night Vibes' },
  { name: 'Workout Mode' },
  { name: 'Chill Lounge' }
];

const seed = async () => {
  await connectDB();
  await Song.deleteMany();
  await Room.deleteMany();
  await Queue.deleteMany();

  const insertedSongs = await Song.insertMany(songs);
  const insertedRooms = await Room.insertMany(rooms);

  // Create a queue for each room with 3 songs each
  for (const room of insertedRooms) {
    const shuffled = [...insertedSongs].sort(() => 0.5 - Math.random());
    await Queue.create({
      roomId: room._id,
      songs: shuffled.slice(0, 3).map(s => ({ songId: s._id }))
    });
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seed();