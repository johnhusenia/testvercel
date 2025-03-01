const express = require('express');
const cors = require('cors');
const DataHandler = require('./modules/movie');

const app = express();
const port = 5000; 

app.use(cors());
const dataHandler = new DataHandler('../data/movie.json');

app.get('/api/movies', async (req, res) => {
    const filePath = '../data/movie.json'; 

    try {
        const movies = await dataHandler.getMovies(); 
        res.json(movies);
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: error });
    }
});

app.get('/api/series', async (req, res) => {
    const filePath = '../data/movie.json'; 

    try {
        const movies = await dataHandler.getSeries(); 
        res.json(movies);
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

        console.log('Movie data:', movie); 

        if (movie) {
            console.log('Sending movie response');  
            return res.json(movie); 
        } else {
            console.log('Movie not found, sending 404 response');  // Debugging line
            return res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        if (!res.headersSent) {
            console.log('Sending 500 response due to error');  // Debugging line
            return res.status(500).json({ error: 'Error processing file' });
        }
    }
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
