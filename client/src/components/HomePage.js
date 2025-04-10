import Navbar from './Navbar'; 
import LoginPage from './LoginPage'; 
import RegistrationPage from './RegistrationPage'; 
import React, { useState,useEffect } from 'react';
import DisplayList from './DisplayList2';
import { Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HomePage = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [showMovie, setShowMovie] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMovie((prev) => !prev); // Toggle between movie and series
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  const handleTogglePopup = () => {
    setShowPopup(!showPopup); 
    setShowRegistrationPopup(false);
  };

  const handleToggleRegistrationPopup = () => {
    setShowRegistrationPopup(!showRegistrationPopup);
    setShowPopup(false);
  };


    return( <div className="image-background">
          <LoginPage showPopup={showPopup} togglePopup={handleTogglePopup} />
          <RegistrationPage
        showPopup={showRegistrationPopup}
        togglePopup={handleToggleRegistrationPopup}
      />
        <div className="left-container">
      {/* Content for the left side */}
    </div>

    {/* Right Container (Takes full right side) */}
    <div className="right-container">

    <Navbar handleTogglePopup={handleTogglePopup} handleToggleRegistrationPopup={handleToggleRegistrationPopup} />
    <div style={{ marginBottom: '50px' }}>
      <div className="logo">STREAMING</div>
      <h2>Stream now! Pay Later!</h2>
      <p>This is the right time to watch:</p>
      <Button
  variant="contained"
  color="primary"
  size="large"
  endIcon={<PlayArrowIcon />}
  sx={{
    mt: 2,
    borderRadius: '20px',
    padding: '10px 30px',
    fontSize: '1rem',
    textTransform: 'none',
    background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    '&:hover': {
      background: 'linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%)',
    },
  }}
>
  Start Watching
</Button>
</div>
      <div>
      {showMovie ? (
        <DisplayList category="movie" sort="rating" />
      ) : (
        <DisplayList category="series" sort="rating" />
      )}
    </div>
    </div>
    
        
</div>);
  };
  
  export default HomePage;