import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDisplay from './SortList'; 
import GenreList from './GenreList'; 
import { Tabs, Tab, Box } from '@mui/material';
import Sidenav from './Sidenav';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [tabIndex, setTabIndex] = useState(0); 

    useEffect(() => {
        axios.get('https://testvercel-drab-alpha.vercel.app/api/movies')
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
    
        <Sidenav />
    
    
        <div className="main-content">
        <h1>Movie</h1>
            <Box sx={{ width: '100%' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Movie Tabs">
                    
                    <Tab label="Default" />
                    <Tab label="Genre" />
                </Tabs>
            </Box>


            {tabIndex === 1 && (
                <div>
                    <GenreList data={movies} category={"Movies"} />
                </div>
            )}
            {tabIndex === 0 && (
                <div>
                    <MovieDisplay data={movies} setContent={setMovies} category={"Movies"} />
                </div>
            )}
        </div>
        </div>
    );
};

export default MovieList;
