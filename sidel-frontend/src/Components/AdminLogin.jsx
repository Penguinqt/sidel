import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Static admin credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAdmin", true);
      navigate("/admin-dashboard");
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        
        <div className="admin-icon">
          🔐
        </div>

        <h2 className="admin-login-title">Admin Portal</h2>
        <p className="admin-login-subtitle">
          Sign in to access the admin dashboard
        </p>

        {error && (
          <div className="admin-alert error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label className="admin-form-label">Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            Sign In as Admin
          </button>
        </form>

        <div className="admin-footer">
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;