import Navbar from './Navbar'; 
import LoginPage from './LoginPage'; 
import RegistrationPage from './RegistrationPage'; 
import React, { useState } from 'react';

const HomePage = () => {

  const [showPopup, setShowPopup] = useState(false);
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);

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
      <div className="logo">Streaming</div>
      <br/>
      <h1>Welcome to the Right Side</h1>
      <p>This is the right section of the page with a background image.</p>
    </div>
        
</div>);
  };
  
  export default HomePage;