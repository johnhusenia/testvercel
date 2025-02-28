// Importing express
const express = require('express');

// Initialize the express app
const app = express();

// Set the port for the server
const PORT = process.env.PORT || 5000;

// Sample route to test the server
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Example of an API route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
