import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RoomList({ onJoin }) {
  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      setRooms(data);
    } catch {
      setError('Could not load rooms.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchRooms, 10000);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const createRoom = async () => {
    if (!newName.trim()) return;
    try {
      await axios.post('/api/rooms', { name: newName.trim() });
      setNewName('');
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create room');
    }
  };

  if (loading) return <div className="loading">Loading rooms...</div>;

  return (
    <div className="room-list">
      <h1 className="logo">🎧 SoundScape</h1>
      <p className="tagline">Step into a room. Feel the frequency.</p>

      {error && <div className="error-banner">{error}</div>}

      <div className="create-room">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="New room name..."
          onKeyDown={e => e.key === 'Enter' && createRoom()}
        />
        <button onClick={createRoom}>Create Room</button>
      </div>

      <div className="rooms-grid">
        {rooms.map(room => (
          <div key={room._id} className="room-card" onClick={() => onJoin(room)}>
            <h3>{room.name}</h3>
            <p>{room.listenerCount} listening</p>
            {room.currentSongId && (
              <p className="now-playing">▶ {room.currentSongId.title}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}