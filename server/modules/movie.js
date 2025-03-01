const data = require('../data/movie.json'); // Import the JSON file directly

class DataHandler {
    constructor() {
        this.data = data; // Use the imported data
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
}

module.exports = DataHandler;