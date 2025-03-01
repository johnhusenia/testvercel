import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Sidenav = () => {
  const [open, setOpen] = useState(true); // State to manage the sidebar open/close

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Button to toggle the sidebar visibility */}
      <IconButton
        sx={{
          display: { xs: 'block', sm: 'none' }, // Only show on small screens
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000
        }}
        onClick={toggleDrawer}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>

      <Drawer
        variant={open ? "permanent" : "temporary"} // Use permanent for larger screens and temporary for mobile
        className="sidenav"
        sx={{
          width: open ? 200 : 0, // Adjust width for mobile
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? 200 : 0,
            boxSizing: "border-box",
            transition: "width 0.3s ease", // Smooth transition when toggling
          },
          display: { xs: "none", sm: "block" }, // Hide sidebar on small screens by default
        }}
      >
        <div className="sidebar-header">
          <Typography variant="h1" sx={{ fontSize: "1.5rem", color: "white", textAlign: "center", padding: "10px 0" }}>
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
    </>
  );
};

export default Sidenav;
