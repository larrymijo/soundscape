import { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import Player from './Player';
import QueuePanel from './QueuePanel';
import Visualizer from './Visualizer';
import { bpmToTheme, hslString } from '../utils/bpmColor';

export default function RoomView({ room, onLeave }) {
  const [currentSong, setCurrentSong] = useState(room.currentSongId || null);
  const [isPlaying, setIsPlaying] = useState(room.isPlaying || false);
  const [listeners, setListeners] = useState(room.listenerCount || 1);
  const [queueVersion, setQueueVersion] = useState(0);
  const theme = bpmToTheme(currentSong?.bpm);

  useEffect(() => {
    socket.connect();
    socket.emit('join-room', room._id);

    socket.on('sync-state', ({ currentSong: song, isPlaying: playing }) => {
      if (song) setCurrentSong(song);
      setIsPlaying(playing);
    });
    socket.on('song-changed', ({ song }) => {
      setCurrentSong(song);
      setIsPlaying(true);
    });
    socket.on('listener-update', count => setListeners(count));
    socket.on('queue-updated', () => setQueueVersion(v => v + 1));

    return () => {
      socket.emit('leave-room', room._id);
      socket.off('sync-state');
      socket.off('song-changed');
      socket.off('listener-update');
      socket.off('queue-updated');
      socket.disconnect();
    };
  }, [room._id]);

  // Apply BPM theme to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-hue', theme.hue);
    root.style.setProperty('--pulse-speed', `${theme.speed}s`);
  }, [theme]);

  const handleSongSelect = (song) => {
    socket.emit('play-song', { roomId: room._id, song, position: 0 });
  };

  return (
    <div className="room-view" style={{
      background: `radial-gradient(ellipse at 50% 0%, ${hslString(theme.hue, 60, 15)} 0%, #0a0a0f 70%)`
    }}>
      <header className="room-header">
        <button className="back-btn" onClick={onLeave}>← Rooms</button>
        <h2>{room.name}</h2>
        <span className="listener-badge">👥 {listeners}</span>
      </header>

      <div className="bpm-label" style={{ color: hslString(theme.hue, 80, 70) }}>
        {currentSong ? `${currentSong.bpm} BPM · ${theme.label}` : 'No song playing'}
      </div>

      <Visualizer bpm={currentSong?.bpm} isPlaying={isPlaying} hue={theme.hue} />

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        roomId={room._id}
        hue={theme.hue}
      />

      <QueuePanel
        roomId={room._id}
        onSelect={handleSongSelect}
        version={queueVersion}
      />
    </div>
  );
}