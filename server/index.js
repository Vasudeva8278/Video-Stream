// Import the Express module
const express = require('express');

// Initialize the Express application
const app = express();

// Define a port number
const PORT = 5000;

// Set up a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to My Express Server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
