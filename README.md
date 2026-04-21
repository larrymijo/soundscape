# Soundscape

Soundscape is a real-time collaborative music room app. Users can create or join rooms, queue up songs, and listen together with real-time synchronization.

## Problem adressed

Soundscape lets friends create music rooms, queue songs together, and stay in real-time sync solving the problem of streaming music at the same time while being on a call or in a party/gathering.

## Quick Start (Clone & Run in Under 5 Minutes)

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/soundscape.git
cd soundscape
```

### 2. Setup the backend

```bash
cd backend
cp .env.example .env   # Or manually create .env (see below)
npm install
npm run dev            # Starts backend on http://localhost:5000
```

**.env example:**
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

### 3. Setup the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev            # Starts frontend on http://localhost:5173
```

### 4. Seed the database (optional)

```bash
cd backend
node seed.js
```

### 5. Open in browser

Go to [http://localhost:5173](http://localhost:5173) and start using Soundscape!