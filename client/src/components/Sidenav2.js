import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Button, AppBar, Toolbar } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SidebarNav = () => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!open);
    };

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
                        { text: "Movies", path: "/movies" },
                        { text: "Series", path: "/series" },
                        { text: "Favorites", path: "/favorites" },
                        { text: "Logout", path: "/" },
                    ].map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton component={Link} to={item.path}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
};

export default SidebarNav;
