const Room = require('../models/Room');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join-room', async (roomId) => {
      socket.join(roomId);
      // Increment listener count
      const room = await Room.findByIdAndUpdate(
        roomId,
        { $inc: { listenerCount: 1 } },
        { new: true }
      ).populate('currentSongId');
      if (room) {
        // Send current playback state to the new joiner
        socket.emit('sync-state', {
          currentSong: room.currentSongId,
          isPlaying: room.isPlaying,
          playbackPosition: room.playbackPosition
        });
        io.to(roomId).emit('listener-update', room.listenerCount);
      }
    });

    socket.on('leave-room', async (roomId) => {
      socket.leave(roomId);
      const room = await Room.findByIdAndUpdate(
        roomId,
        { $inc: { listenerCount: -1 } },
        { new: true }
      );
      if (room) {
        io.to(roomId).emit('listener-update', Math.max(0, room.listenerCount));
      }
    });

    socket.on('play-song', async ({ roomId, song, position }) => {
      await Room.findByIdAndUpdate(roomId, {
        currentSongId: song._id,
        isPlaying: true,
        playbackPosition: position || 0
      });
      // Broadcast to ALL clients in the room (including sender)
      io.to(roomId).emit('song-changed', { song, position: position || 0 });
    });

    socket.on('pause', async ({ roomId, position }) => {
      await Room.findByIdAndUpdate(roomId, { isPlaying: false, playbackPosition: position });
      socket.to(roomId).emit('pause', { position });
    });

    socket.on('resume', async ({ roomId, position }) => {
      await Room.findByIdAndUpdate(roomId, { isPlaying: true, playbackPosition: position });
      socket.to(roomId).emit('resume', { position });
    });

    socket.on('queue-updated', ({ roomId }) => {
      io.to(roomId).emit('queue-updated');
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};