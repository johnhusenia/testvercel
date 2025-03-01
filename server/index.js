const express = require('express');
const cors = require('cors');
const DataHandler = require('./modules/movie');

const app = express();

app.use(cors());
const dataHandler = new DataHandler('./data/movie.json'); // Adjusted the path for Vercel environment

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await dataHandler.getMovies(); 
        res.json(movies);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: error });
    }
});

app.get('/api/series', async (req, res) => {
    try {
        const series = await dataHandler.getSeries(); 
        res.json(series);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: error });
    }
});

app.get('/api/data/:id', async (req, res) => {
    const movieId = req.params.id;
    console.log('Movie data:', movieId); 

    try {
        const movie = await dataHandler.getItemByID(movieId);

        if (movie) {
            return res.json(movie); 
        } else {
            return res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Error processing file' });
        }
    }
});

// Export the app for Vercel to handle as a serverless function
module.exports = app;
