import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // React Router v6 uses useNavigate

const LoginPage = ({ showPopup, togglePopup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Use useNavigate for navigation in React Router v6

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://java2backend.onrender.com/api/auth/login", {
        email: formData.username,
        password: formData.password
      });
  
      // Print the entire response object to the console for debugging
      console.log("Full response data:", response);
  
      setMessage(response.data.message);
  
      // If login is successful and token is present
      if (response.data.message === "Login successful" && response.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email); // Save email
  
        // Redirect to /user
        navigate("/user");
      } else {
        setMessage("Login succeeded but token missing");
      }
    } catch (error) {
      // Print error details
      console.error("Error response:", error.response);
      setMessage(error.response?.data?.error || "Login failed");
    }
  };
  
  

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
