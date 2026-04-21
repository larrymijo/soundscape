import { useEffect, useRef, useState } from 'react';
import socket from '../socket';
import { hslString } from '../utils/bpmColor';

export default function Player({ currentSong, isPlaying, setIsPlaying, roomId, hue }) {
  const audioRef = useRef(null);
  const [position, setPosition] = useState(0);

  // When song changes, load it
  useEffect(() => {
    if (!currentSong || !audioRef.current) return;
    audioRef.current.src = currentSong.audioUrl;
    audioRef.current.load();
    audioRef.current.play().catch(() => {});
    setIsPlaying(true);

    return () => {
      // Pause and reset when song changes or component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [currentSong?._id]);

  // Sync remote play/pause
  useEffect(() => {
    socket.on('pause', ({ position: pos }) => {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = pos;
    });
    socket.on('resume', ({ position: pos }) => {
      if (audioRef.current) {
        audioRef.current.currentTime = pos;
        audioRef.current.play().catch(() => {});
      }
    });
    return () => {
      socket.off('pause');
      socket.off('resume');
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    const pos = audioRef.current.currentTime;
    if (isPlaying) {
      audioRef.current.pause();
      socket.emit('pause', { roomId, position: pos });
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      socket.emit('resume', { roomId, position: pos });
      setIsPlaying(true);
    }
  };

  const accent = hslString(hue, 80, 60);

  return (
    <div className="player">
      <audio
        ref={audioRef}
        onTimeUpdate={e => setPosition(e.target.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />

      {currentSong ? (
        <>
          <div className="song-info">
            <div className="song-cover" style={{ background: currentSong.coverColor }} />
            <div>
              <strong>{currentSong.title}</strong>
              <span>{currentSong.artist}</span>
              <span className="song-meta">{currentSong.genre} · {currentSong.bpm} BPM</span>
            </div>
          </div>
          <div className="controls">
            <button
              className="play-btn"
              onClick={handlePlayPause}
              style={{ borderColor: accent, color: accent }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(position / currentSong.duration) * 100}%`,
                  background: accent
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <p className="no-song">Select a song from the queue to start the room.</p>
      )}
    </div>
  );
}