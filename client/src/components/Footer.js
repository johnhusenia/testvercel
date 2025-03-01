import React from "react";
import { Container, Grid2, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";


const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid2 container justifyContent="space-between">
          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">Menu</Typography>
            <ul className="footer-menu">
              <li><Link href="/user" color="inherit">Home</Link></li>
              <li><Link href="/about" color="inherit">About Us</Link></li>
              <li><Link href="/" color="inherit">Services</Link></li>
              <li><Link href="/contact" color="inherit">Contact</Link></li>
            </ul>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">Follow Us</Typography>
            <div className="social-links">
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </div>
          </Grid2>

          <Grid2 item xs={12} sm={6} md={3}>
            <Typography variant="h6" className="footer-title">Contact Info</Typography>
            <Typography variant="body2" color="textSecondary">
              Address: 1234 Street Name, City, Country
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Phone: (123) 456-7890
            </Typography>
          </Grid2>
        </Grid2>

        <Grid2 container justifyContent="center" mt={4}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2025 Your Company. All Rights Reserved.
          </Typography>
        </Grid2>
      </Container>
    </footer>
  );
};

export default Footer;
