import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayList from './DisplayList';
import Sidenav from './Sidenav2';
import Footer from './Footer';
import View from "./View";
import DisplayList2 from './DisplayList2';

const DataList = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);
    const [showMovie, setShowMovie] = useState(true);

    useEffect(() => {

        Promise.all([
            axios.get('https://testvercel-drab-alpha.vercel.app/api/movies'),
            axios.get('https://testvercel-drab-alpha.vercel.app/api/series')
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

    useEffect(() => {
        const interval = setInterval(() => {
          setShowMovie((prev) => !prev); // Toggle between movie and series
        }, 5000); // Change every 5 seconds
    
        return () => clearInterval(interval); // Cleanup interval on unmount
      }, []);
      
    if (error) {
        return <div>{error}</div>;
    }



      return (
        <div style={{ display: 'flex', marginTop: '20px' }}>
            <Sidenav />
            <div className="main-content">
                <View image="fri7.png" title="asdasdsad" description="Testing" />
                
                {error ? <div>{error}</div> : (
                    <>
                        <div>
                            {showMovie ? (
                                <DisplayList2 category="movie" sort="rating" />
                            ) : (
                                <DisplayList2 category="series" sort="rating" />
                            )}
                        </div>
                        <DisplayList data={series.slice(0, 5)} category="Series" />
                        <DisplayList data={movies.slice(0, 5)} category="Movies" />
                    </>
                )}
                <Footer />
            </div>
        </div>
    );
    
      

};

export default DataList;