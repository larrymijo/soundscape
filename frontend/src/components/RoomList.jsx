  const handleDeleteRoom = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    try {
      await axios.delete(`/api/rooms/${roomId}`);
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete room');
    }
  };
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RoomList({ onJoin }) {
  const [rooms, setRooms] = useState([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const handleEdit = (room) => {
    setEditingId(room._id);
    setEditValue(room.name);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleEditSave = async (room) => {
    if (!editValue.trim()) return;
    try {
      await axios.put(`/api/rooms/${room._id}`, { name: editValue.trim() });
      setEditingId(null);
      setEditValue('');
      fetchRooms();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update room');
    }
  };

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
          <div key={room._id} className="room-card">
            {editingId === room._id ? (
              <>
                <input
                  value={editValue}
                  onChange={handleEditChange}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleEditSave(room);
                    if (e.key === 'Escape') handleEditCancel();
                  }}
                  autoFocus
                  style={{ fontSize: '1.1em', marginBottom: 4 }}
                />
                <button onClick={() => handleEditSave(room)} style={{ marginRight: 4 }}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </>
            ) : (
              <>
                <h3 onClick={() => onJoin(room)} style={{ cursor: 'pointer', display: 'inline-block', marginRight: 8 }}>{room.name}</h3>
                <button onClick={() => handleEdit(room)} style={{ fontSize: '0.9em', marginRight: 4 }}>Edit</button>
                <button onClick={() => handleDeleteRoom(room._id)} style={{ fontSize: '0.9em', color: 'red' }}>Delete</button>
              </>
            )}
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