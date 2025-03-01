const express = require('express');
const cors = require('cors');
const DataHandler = require('./modules/movie');

const app = express();
const port = process.env.PORT || 5000; // Use environment variable for port

app.use(cors());
const dataHandler = new DataHandler(); // No file path needed

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await dataHandler.getMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/series', async (req, res) => {
    try {
        const series = await dataHandler.getSeries();
        res.json(series);
    } catch (error) {
        console.error('Error fetching series:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/data/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await dataHandler.getItemByID(movieId);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});