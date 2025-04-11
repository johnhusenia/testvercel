import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';

const FavoritePage = () => {
  const navigate = useNavigate();

  // Function to go back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)"
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Hi Customer!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          This page is still under development.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGoBack}
          sx={{ width: "100%" }}
        >
          Go Back
        </Button>
      </Container>
    </Box>
  );
};

export default FavoritePage;
