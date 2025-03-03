import Navbar from './Navbar'; 
import LoginPage from './LoginPage'; 
import RegistrationPage from './RegistrationPage'; 
import React, { useState,useEffect } from 'react';
import DisplayList from './DisplayList2';

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
  };

  const handleToggleRegistrationPopup = () => {
    setShowRegistrationPopup(!showRegistrationPopup);
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
      <div className="logo">STREAMING</div>
      <br/>
      <h2>Stream now! Pay Later!</h2>
      <p>This is the right time to watch.</p>
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