import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayList3 from './DisplayList3';
import Sidenav from './Sidenav2';
import Footer from './Footer';
import View from "./View";
import DisplayList from './DisplayList';
import { useSpring, animated } from 'react-spring';  

const DataList = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);
    const [showMovie, setShowMovie] = useState(1);  // 1 for movies, 2 for series

    useEffect(() => {
        // Fetching movie and series data
        Promise.all([
            axios.get('https://java2backend.onrender.com/api/media/movies'),
            axios.get('https://java2backend.onrender.com/api/media/series')
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
        const timeout = setTimeout(() => {
            setShowMovie((prev) => (prev === 2 ? 1 : prev + 1));
        }, 10000);  // Change every 10 seconds

        return () => clearTimeout(timeout); // Cleanup timeout on unmount or state change
    }, [showMovie]);  // Re-run this effect whenever showMovie changes

    const slideProps = useSpring({
        to: { 
            transform: 'translateX(0%)',  // Always slide to 0% (in view)
            opacity: 1,  // Fade in when in view
        },
        from: { 
            transform: 'translateX(100%)', // Start from the right (100% offscreen)
            opacity: 0, // Start with opacity 0 (invisible)
        },
        reset: true,  // Reset the animation every time the value changes
        config: { tension: 100, friction: 26 },  // Control the speed and feel of the transition
    });

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <Sidenav />
            <div className=".main-content2" style={{ flex: 1, padding: '20px', backgroundColor: '#000000e1',
                
             }}>
                {error ? (
                    <div style={{ color: 'red', marginBottom: '20px' }}>
                        <h3>{error}</h3>
                    </div>
                ) : (
                    <>
                        <div style={{ marginTop: '40px' }}>
                            <div className="slideshow-container">
                                <animated.div style={slideProps} key={showMovie}>

                                    <DisplayList3
                                        category={showMovie === 1 ? 'movie' : 'series'}
                                        sort="rating"
                                        counter={6}
                                        title = {showMovie === 1 ? 'Best Movies' : 'Best Series'}
                                    />
                                </animated.div>
                            </div>
                            <DisplayList data={series.slice(0, 5)} category="Series" />
                            <DisplayList data={movies.slice(0, 5)} category="Movies" />
                        </div>
                    </>
                )}

                <View 
                    image="https://www.shutterstock.com/image-vector/winter-sale-horizontal-advertising-banner-260nw-536057692.jpg"
                    title="Call Now" 
                    description="Paylater and I don't know!"
                    style={{ marginTop: '40px', borderRadius: '10px', overflow: 'hidden' }}
                />
                
                <Footer style={{ marginTop: '60px', textAlign: 'center' }} />
            </div>
        </div>
    );
};

export default DataList;
