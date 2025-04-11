import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidenav2 from './Sidenav2';
import { Box, Container, Typography, IconButton } from "@mui/material";
import RelatedData from "./RelatedData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DataDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    

    useEffect(() => {
      axios
        .get(`https://java2backend.onrender.com/api/media/item?id=${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError('Failed to load movie details');
          console.error('Error fetching movie data:', error);
        });
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!data) {
      return (
        <Box sx={{ height: "95vh", display: "flex", flexDirection: "column", marginTop: 3}}>
                <Sidenav2 />
      
                <Container
                  maxWidth={false}
                  sx={{
                    height: "65vh",
                    backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background with transparency
                      color: "white",
                      boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      minHeight: "60%",
                      backdropFilter: "blur(10px)",
                  }}
                >
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    position: "absolute",
                    top: 40,
                    left: 16,
                    color: "rgb(255, 255, 255)",
                    "&:hover": {
                      backgroundColor: "black", // Set background to black on hover
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
      
            
      
                </Container>
          
                <Container
                  maxWidth={false}
                  sx={{
                    height: "35vh",
                    backgroundColor: "#1a1a1a",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    padding: 3,
                  }}
                >
                </Container>
              </Box>
            );
    }


    return (
  <Box sx={{ height: "95vh", display: "flex", flexDirection: "column", marginTop: 3}}>
          <Sidenav2 />

          <Container
            maxWidth={false}
            sx={{
              height: "65vh",
              backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background with transparency
                color: "white",
                boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                minHeight: "60%",
                backdropFilter: "blur(10px)",
            }}
          >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 40,
              left: 16,
              color: "rgb(255, 255, 255)",
              "&:hover": {
                backgroundColor: "black", // Set background to black on hover
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

              <Box
                component="img"
                src={data.posterUrl}
                alt={`${data.title} poster`}
                sx={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
                }}
              />

              <Box sx={{ flex: 1, marginLeft: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {data.title} ({data.releaseYear})
                </Typography>
                <Typography variant="body1">
                  <strong>Genre:</strong> {data.genre.join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Duration:</strong> {data.duration} minutes
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {data.language}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {data.description}
                </Typography>
                <Typography variant="body1">
                  <strong>Director:</strong> {data.director}
                </Typography>
                <Typography variant="body1">
                  <strong>Writer(s):</strong> {data.writers.join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Release Date:</strong> {data.releaseDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Production Company:</strong> {data.productionCompany}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {data.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Budget:</strong> ${data.budget.toLocaleString()}
                </Typography>
                {data.boxOffice !== null && (
                  <Typography variant="body1">
                    <strong>Box Office:</strong> ${data.boxOffice.toLocaleString()}
                  </Typography>
                )}
              </Box>

          </Container>
    
          <Container
            maxWidth={false}
            sx={{
              height: "35vh",
              backgroundColor: "#1a1a1a",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              padding: 3,
            }}
          >
         <RelatedData genre={data.genre} />
          </Container>
        </Box>
      );
};

export default DataDetail;
