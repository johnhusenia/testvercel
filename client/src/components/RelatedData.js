import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const RelatedData = ({ genre }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (genre) {
      // Fetch related items by genre using axios
      axios
        .get(`https://testvercel-drab-alpha.vercel.app/api/data/genre/${genre}`)
        .then((response) => {
          setRelatedItems(response.data); // Set data in state
        })
        .catch((error) => {
          setError("Failed to load related items");
          console.error("Error fetching related items:", error);
        });
    }
  }, [genre]);

  if (error) {
    return <div>{error}</div>;
  }

  if (relatedItems.length === 0) {
    return <div>Loading...</div>;
  }

  const handleClick = (itemId) => {
    console.log(itemId);
    navigate(`/data/${itemId}`); 
  };

  return (
    <Box className="related-container">
      <Typography className="section-title">Similar {genre} Items</Typography>
      <Box className="horizontal-scroll">
        {relatedItems.slice(0, 10).map((item, index) => (
            
          <Box key={index} className="related-item"
          onClick={() => handleClick(item._id)} 
          style={{ cursor: 'pointer' }} 
        >
            <img src={item.posterUrl} alt={item.title} className="related-img" />
            <Typography className="related-title">{item.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RelatedData;
