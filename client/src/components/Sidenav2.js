import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Button, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Sidenav2 = () => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);  
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Button
                onClick={toggleSidebar}
                sx={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: 2,  
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '0', 
                    padding: '10px',
                    boxShadow: 2,
                }}
            >
                <MenuIcon />
            </Button>


            <Drawer
                variant={open ? "permanent" : "temporary"} 
                className="sidenav"
                sx={{
                    width: open ? 200 : 0, 
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? 200 : 0,
                        boxSizing: "border-box",
                        transition: "width 0.3s ease", 
                    },
                    display: { xs: "none", sm: "block" }, 
                    "@media (max-width: 600px)": {
                        position: "absolute", 
                        top: 0,
                        left: open ? 0 : "-100%", 
                        height: "100vh",
                        transition: "left 0.3s ease",
                        zIndex: 1200,
                    },
                }}
            >
                <div className="sidebar-header">
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "1.5rem",
                            color: "white",
                            textAlign: "center",
                            padding: "10px 0",
                        }}
                    >
                        My Sidebar
                    </Typography>
                </div>
                <List>
                    {[
                        { text: "Home", path: "/user" },
                        { text: "Movies", path: "/movies" },
                        { text: "Series", path: "/series" },
                        { text: "Favorites", path: "/favorites" },
                        { text: "Logout", path: "/" },
                    ].map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path} className="sidenav-item">
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default Sidenav2;
