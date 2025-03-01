const fs = require('fs');
const path = require('path');

class DataHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }

    readData() {
        return new Promise((resolve, reject) => {
            const absolutePath = path.resolve(__dirname, this.filePath);

            fs.readFile(absolutePath, 'utf8', (err, data) => {
                if (err) {
                    return reject('Error reading file: ' + err);
                }

                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject('Error parsing JSON: ' + error);
                }
            });
        });
    }

    getMovies() {
        return this.readData().then(data => {
            return data.filter(item => item.category === 'movie');
        });
    }

    getSeries() {
        return this.readData().then(data => {
            return data.filter(item => item.category === 'series');
        });
    }

    getItemByID(seriesId) {
        return this.readData().then(data => {
            const series = data.find(item => item._id === seriesId);
            if (series) {
                return series;
            } else {
                return Promise.reject('Data not found with ID: ' + seriesId); 
            }
        });
    }
}

module.exports = DataHandler;
