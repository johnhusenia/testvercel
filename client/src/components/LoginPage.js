import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = ({ showPopup, togglePopup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (email && token) {
      fetch(`https://java2backend.onrender.com/api/auth/user/email`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Invalid session");
          }
          return res.json();
        })
        .then((data) => {
          console.log("User session valid:", data);
          
        if (location.pathname === "/") {
          navigate("/user", { replace: true });
        } else {
          window.location.reload();
        }
        })
        .catch((err) => {
          console.warn("No valid session:", err.message);
        });
    }
  }, []);

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

      console.log("Full response data:", response);
      setMessage(response.data.message);

      if (response.data.message === "Login successful" && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);

        if (location.pathname === "/") {
          navigate("/user", { replace: true });
        } else {
          window.location.reload();
        }
      } else {
        setMessage("Login succeeded but token missing");
      }
    } catch (error) {
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
