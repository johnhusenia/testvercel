import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = ({ showPopup, togglePopup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "" // Added 'name' field
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://java2backend.onrender.com/api/auth/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
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

              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;
