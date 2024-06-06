require('dotenv').config();
const express = require("express");
const { createServer } = require('node:http');
const router = require('./routes/authRoutes');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200", // replace with your frontend URL
        methods: ["GET", "POST"],
        credentials: true
    }
});

connectDB()



app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200", // replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.set('socketio', io);
// Routes
app.use('/api/auth',router );
// app.use('/api/player', playerRoutes);
// app.use('/api/referee', refereeRoutes);
io.on('connection', (socket) => {
    io.emit('newConnection', { socketId: socket.id });
    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
    });
});

server.listen(8000, () => {
    console.log('server running at http://localhost:8000');
  });

