import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDisplay from './SortList'; 
import GenreList from './GenreList'; 
import { Tabs, Tab, Box } from '@mui/material';
import Sidenav from './Sidenav2';
import Footer from './Footer';
import View from "./View";

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
        <div className="container">
    
        <Sidenav />
    
        <div className="main-content">
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: 'white' }}>Movies</h1>
            <Box sx={{ width: '100%' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="Movie Tabs">
                    
                <Tab style={{ color: 'white' }} label="Default" />
                <Tab style={{ color: 'white' }} label="Genre" />
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

<View image="https://www.shutterstock.com/image-vector/winter-sale-horizontal-advertising-banner-260nw-536057692.jpg"
                  title="Call Now" description="Paylater and I don't know!" />
                <Footer />
        </div>
        </div>
    );
};

export default MovieList;
