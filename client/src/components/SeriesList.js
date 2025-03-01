import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDisplay from './SortList'; // Import MovieDisplay
import GenreList from './GenreList'; // Import MovieDisplay
import { Tabs, Tab, Box } from '@mui/material';
import Sidenav from './Sidenav';

const SeriesList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [tabIndex, setTabIndex] = useState(0); 

    useEffect(() => {
        axios.get('https://testvercel-drab-alpha.vercel.app/api/series')
            .then(response => {
                setMovies(response.data);
                console.log(response.data);
            })
            .catch(error => {
                setError('Failed to load movie data');
                console.error('Error fetching movie data:', error);
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }
    const handleTabChange = (event, newIndex) => {
        setTabIndex(newIndex);
    };



    return (
        <div style={{ display: 'flex' }}>
          {/* Sidenav */}
          <Sidenav />
      
          {/* Main Content */}
          <div className="main-content">
          <h1>TV Series</h1>
            <Box sx={{ width: '100%' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Movie Tabs">
                    <Tab label="Sort" />
                    <Tab label="Genre" />
                    
                </Tabs>
            </Box>


            {tabIndex === 1 && (
                <div>
                    <GenreList data={movies} category={"Series"} />
                </div>
            )}
            {tabIndex === 0 && (
                <div>
                    <MovieDisplay data={movies} setContent={setMovies} category={"Series"} />
                </div>
            )}
        </div>
        </div>
    );
};

export default SeriesList;
