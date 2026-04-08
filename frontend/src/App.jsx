import { useState } from 'react';
import RoomList from './components/RoomList';
import RoomView from './components/RoomView';
import './App.css';

export default function App() {
  const [activeRoom, setActiveRoom] = useState(null);

  return (
    <div className="app">
      {activeRoom
        ? <RoomView room={activeRoom} onLeave={() => setActiveRoom(null)} />
        : <RoomList onJoin={setActiveRoom} />
      }
    </div>
  );
}
