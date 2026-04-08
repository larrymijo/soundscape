import { useState, useEffect } from 'react';
import axios from 'axios';

export default function QueuePanel({ roomId, onSelect, version }) {
  const [queue, setQueue] = useState([]);
  const [allSongs, setAllSongs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQueue = async () => {
    try {
      const { data } = await axios.get(`/api/rooms/${roomId}/queue`);
      setQueue(data.songs || []);
    } catch {
      setError('Could not load queue');
    } finally {
      setLoading(false);
    }
  };

  const fetchSongs = async () => {
    const { data } = await axios.get('/api/songs');
    setAllSongs(data);
  };

  useEffect(() => {
    fetchQueue();
    fetchSongs();
  }, [roomId, version]);

  const addToQueue = async (songId) => {
    try {
      await axios.post(`/api/rooms/${roomId}/queue`, { songId });
      fetchQueue();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add song');
    }
  };

  const removeFromQueue = async (entryId) => {
    if (!window.confirm('Remove this song?')) return;
    try {
      await axios.delete(`/api/rooms/${roomId}/queue/${entryId}`);
      fetchQueue();
    } catch {
      setError('Failed to remove song');
    }
  };

  const filtered = allSongs.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.artist.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading queue...</div>;

  return (
    <div className="queue-panel">
      {error && <div className="error-banner">{error}</div>}

      <h3>Queue ({queue.length})</h3>
      <div className="queue-list">
        {queue.map((entry, i) => (
          <div key={entry._id} className="queue-item">
            <span className="queue-num">{i + 1}</span>
            <div className="queue-info" onClick={() => onSelect(entry.songId)}>
              <strong>{entry.songId?.title}</strong>
              <span>{entry.songId?.artist} · {entry.songId?.bpm} BPM</span>
            </div>
            <button className="remove-btn" onClick={() => removeFromQueue(entry._id)}>✕</button>
          </div>
        ))}
        {queue.length === 0 && <p className="empty">Queue is empty. Add songs below!</p>}
      </div>

      <h3>Add Songs</h3>
      <input
        className="search-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by title or artist..."
      />
      <div className="song-library">
        {filtered.map(song => (
          <div key={song._id} className="library-item" onClick={() => addToQueue(song._id)}>
            <div className="lib-cover" style={{ background: song.coverColor }} />
            <div>
              <strong>{song.title}</strong>
              <span>{song.artist} · {song.bpm} BPM · {song.genre}</span>
            </div>
            <span className="add-icon">+</span>
          </div>
        ))}
      </div>
    </div>
  );
}