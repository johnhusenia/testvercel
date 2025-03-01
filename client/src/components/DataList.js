import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayList from './DisplayList'; // Import MovieDisplay
import Sidenav from './Sidenav';
import Footer from './Footer';

const DataList = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        Promise.all([
            axios.get('http://localhost:5000/api/movies'),
            axios.get('http://localhost:5000/api/series')
        ])
        .then(([moviesResponse, seriesResponse]) => {
            setMovies(moviesResponse.data); 
            setSeries(seriesResponse.data);  
            console.log(moviesResponse.data, seriesResponse.data); 
        })
        .catch((error) => {
            setError('Failed to load data');
            console.error('Error fetching data:', error); 
        });
    }, []);


    return (
        <div style={{ display: 'flex' }}>
          {/* Sidenav */}
          <Sidenav />
      
          {/* Main Content */}
          <div className="main-content">
          <DisplayList data={series.slice(0, 6)}  category={"Series"} />
          <DisplayList data={movies.slice(0, 6)}  category={"Movies"} />
          <Footer />
          </div>
        </div>
      );
      

};

export default DataList;