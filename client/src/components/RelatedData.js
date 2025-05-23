import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles

const RelatedData = ({ genre }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (genre && Array.isArray(genre)) {
      // Create the genres query string like 'genres=Action&genres=Drama'
      const params = new URLSearchParams();
      genre.forEach(g => params.append('genres', g));
  
      axios
        .get(`https://java2backend.onrender.com/api/media/genre?${params.toString()}`)
        .then((response) => {
          console.log("Related Items Response:", response.data); // Print the data
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
      <Typography className="section-title">Similar Genre</Typography>
      <Swiper
        spaceBetween={20} // Space between slides
        slidesPerView={3} // Number of slides visible at a time
        loop={true} // Enable loop mode
        breakpoints={{
          640: {
            slidesPerView: 1, // 1 slide per view on small screens
          },
          768: {
            slidesPerView: 2, // 2 slides per view on medium screens
          },
          1024: {
            slidesPerView: 3, // 3 slides per view on large screens
          },
        }}
        className="related-swiper"
      >
        {relatedItems.slice(0, 10).map((item, index) => (
          <SwiperSlide
            key={index}
            className="related-item"
            onClick={() => handleClick(item.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={item.posterUrl} alt={item.title} className="related-img" />
            <Typography className="related-title">{item.title}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
  
};

export default RelatedData;
