import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText,Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Sidenav = () => {
  return (
    <Drawer
      variant="permanent"
      className="sidenav"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
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
  );
};

export default Sidenav;
