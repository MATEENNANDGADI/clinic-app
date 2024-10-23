// Import required packages
const express = require('express');
const cors = require('cors'); // Import CORS
const http = require('http');
const socketIo = require('socket.io');
const db = require('./db'); // Adjust the path if necessary
const patientRoutes = require('./routes/patients'); // Importing patient routes

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'] // Specify allowed headers
}));

// Middleware to parse JSON requests
app.use(express.json());

// Use patient routes and pass the io instance to the routes
app.use('/patients', patientRoutes(io)); // Pass io as an argument

// Socket.IO setup
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
