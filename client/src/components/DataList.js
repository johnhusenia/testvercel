import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DisplayList from './DisplayList';
import Sidenav from './Sidenav2';
import Footer from './Footer';
import Advertisement from "./Advertisement";

const DataList = () => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);

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

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ display: 'flex',marginTop: '20px' }}>
          {/* Sidenav */}
          <Sidenav />
          
      
          {/* Main Content */}
          <div className="main-content">

          <DisplayList data={series.slice(0, 5)}  category={"Series"} />
          <DisplayList data={movies.slice(0, 5)}  category={"Movies"} />
          <Advertisement
                image="https://www.shutterstock.com/image-vector/winter-sale-horizontal-advertising-banner-260nw-536057692.jpg"
                title="Special Offer!"
                description="Get 50% off on all items. Limited time only!"
            />
          <Footer />
          </div>
        </div>
      );
      

};

export default DataList;