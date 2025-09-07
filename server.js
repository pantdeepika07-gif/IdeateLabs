
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve all static files from the root directory
app.use(express.static(path.join(__dirname, '/')));

// Handle different routes and serve the corresponding HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

app.get('/idea.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'idea.html'));
});

app.get('/team.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'team.html'));
});

app.get('/find_team.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'find_team.html'));
});

app.get('/video_chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'video_chat.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Real-time communication logic with Socket.io
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for 'chat message' event from the client
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // Broadcast the message to all connected clients
    io.emit('chat message', msg);
  });

  // Handle a user disconnecting
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
