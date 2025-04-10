import React, { useState } from "react";
import { Popover, Typography, Button } from "@mui/material";
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

const ProfilePopover = ({ anchorEl, open, onClose, email, name, onLogout }) => {
    const isUserLoggedIn = email && name;
    const [showPopup, setShowPopup] = useState(false);
    const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);

    const handleTogglePopup = () => {
        console.log("Toggling Login Popup");
        setShowPopup(!showPopup); 
        setShowRegistrationPopup(false); 
    };

    const handleToggleRegistrationPopup = () => {
        console.log("Toggling Registration Popup");
        setShowRegistrationPopup(!showRegistrationPopup);
        setShowPopup(false);
    };

    return (
        <div>
            <LoginPage showPopup={showPopup} togglePopup={handleTogglePopup} />
            <RegistrationPage
                showPopup={showRegistrationPopup}
                togglePopup={handleToggleRegistrationPopup}
            />

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{
                    zIndex: 1500, // Ensure popover is above other elements
                }}
            >
                <div style={{ padding: 16 }}>
                    <Typography variant="h6">Profile</Typography>

                    {isUserLoggedIn ? (
                        <>
                            <Typography sx={{ mt: 1 }}><strong>Name:</strong> {name}</Typography>
                            <Typography sx={{ mt: 1 }}><strong>Email:</strong> {email}</Typography>
                            <Button 
                                sx={{ mt: 2 }} 
                                variant="contained" 
                                color="secondary" 
                                fullWidth
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button 
                                sx={{ mt: 2 }} 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                onClick={handleTogglePopup} 
                            >
                                Login
                            </Button>
                            <Button 
                                sx={{ mt: 2 }} 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                onClick={handleToggleRegistrationPopup} 
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>
            </Popover>
        </div>
    );
};

export default ProfilePopover;
