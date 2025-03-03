const data = require('../data/movie.json'); // Import the JSON file directly

class DataHandler {
    constructor() {
        this.data = data; // Use the imported data
    }

    getAllData() {
        return Promise.resolve(this.data);
    }

    getMovies() {
        return Promise.resolve(this.data.filter(item => item.category === 'movie'));
    }

    getSeries() {
        return Promise.resolve(this.data.filter(item => item.category === 'series'));
    }

    getItemByID(seriesId) {
        const series = this.data.find(item => item._id === seriesId);
        if (series) {
            return Promise.resolve(series);
        } else {
            return Promise.reject('Data not found with ID: ' + seriesId);
        }
    }

    getItemsByGenre(genres) {
        const filteredItems = this.data.filter(item => 
            genres.some(genre => item.genre.includes(genre))  
        );
        
        if (filteredItems.length > 0) {
            return Promise.resolve(filteredItems);
        } else {
            return Promise.reject('No items found for genres: ' + genres.join(', '));
        }
    }
}

module.exports = DataHandler;