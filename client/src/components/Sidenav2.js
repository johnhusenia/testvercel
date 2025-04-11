import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Button, AppBar, Toolbar, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ProfilePopover from './ProfilePopover';  // Import the ProfilePopover component

const SidebarNav = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch user data from backend whenever SidebarNav is rendered
    useEffect(() => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        if (email && token) {
            // Fetch user data from the backend
            fetch(`https://java2backend.onrender.com/api/auth/user/email`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                setUser(data); // Set the fetched user data
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
        } else {
            console.log('No email or token found in localStorage');
        }
    }, []);  // Empty dependency array ensures this runs only once after component mounts

    const toggleSidebar = () => {
        setOpen(!open);
    };

    const handleProfileClick = (event) => {
        // Toggle the popover visibility
        setAnchorEl(prevAnchorEl => (prevAnchorEl ? null : event.currentTarget));
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Handle logout logic here (e.g., clearing session, redirecting to login page)
        console.log("Logging out...");

        // Remove email and token from localStorage
        localStorage.removeItem("email");
        localStorage.removeItem("token");

        setUser(null);  // Clear user state
        setAnchorEl(null);  // Close the popover

        // Redirect to home or login page
        window.location.href = '/';  // Adjust based on your app's routing
    };

    const handleLogout2 = () => {
        // Handle logout logic here (e.g., clearing session, redirecting to login page)
        console.log("Logging out...");

        // Remove email and token from localStorage
        localStorage.removeItem("email");
        localStorage.removeItem("token");

        setUser(null);  // Clear user state
        setAnchorEl(null);  // Close the popover

        // Redirect to home or login page
    };

    const openPopover = Boolean(anchorEl);

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#333", zIndex: 1400 }}>
                <Toolbar>
                    <Button onClick={toggleSidebar} sx={{ color: "white", mr: 2 }}>
                        <MenuIcon />
                    </Button>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
                        My App
                    </Typography>

                    {/* Profile Icon Button on the Right */}
                    <IconButton sx={{ color: "white" }} onClick={handleProfileClick}>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleSidebar}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 200,
                        boxSizing: "border-box",
                        paddingTop: "64px",
                        backgroundColor: "white"
                    },
                }}
            >
                <List>
                    {[
                        { text: "Home", path: "/user" },
                        { text: "Browse", path: "/browse" },
                        { text: "Movies", path: "/movies" },
                        { text: "Series", path: "/series" },
                        { text: "Favorites", path: "/favorites" },
                       
                    ].map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path}>
                                <ListItemText sx={{color: "#000000e1"}} primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem key="Logout" disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText sx={{ color: "#000000e1" }} primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            {/* Profile Popover Component with user data and logout button */}
            <ProfilePopover
                anchorEl={anchorEl}
                open={openPopover}
                onClose={handleClosePopover}
                email={user ? user.email : ''}
                name={user ? user.name : ''}
                onLogout={handleLogout2}
            />
        </>
    );
};

export default SidebarNav;
