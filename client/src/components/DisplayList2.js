import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const DisplayList = ({ category, sort }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from API
        axios.get('https://java2backend.onrender.com/api/media/alldata')
            .then(response => {
                const fetchedData = response.data;
                
                // Filter the data based on category
                const filteredData = fetchedData.filter((item) => {

                        return item.category === category;  
         
                });

                // Sort the filtered data based on 'sort' prop (rating or date)
                const sortedData = filteredData.sort((a, b) => {
                    if (sort === "rating") {
                        return b.ratings.IMDb - a.ratings.IMDb;  // Sort by IMDb rating (highest to lowest)
                    } else if (sort === "date") {
                        return new Date(b.releaseDate) - new Date(a.releaseDate);  // Sort by release date (most recent first)
                    }
                    return 0;  // No sorting if neither 'rating' nor 'date' is passed
                });

                
                setData(sortedData);
            })
            .catch(error => {
                setError('Failed to load movie data');
                console.error('Error fetching movie data:', error);
            });
    }, [category, sort]);  

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Box>
          <ul className="data-preview-list">
            {data.length === 0 ? (
              <Typography variant="body1" className="no-data-message">
                No data available
              </Typography>
            ) : (
              data.slice(0, 3).map((item, index) => (
                <li key={index} className="data-preview-item">
                  <Link to={`/data/${item.id}`} className="data-link">
                    <Box
                      component="img"
                      src={item.posterUrl}
                      alt={item.title || 'No title'}
                      className="data-poster"
                    />
                  </Link>
                </li>
              ))
            )}
          </ul>
        </Box>
      );
};

export default DisplayList;
