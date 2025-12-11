import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8080/users";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    // basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Name, email, and password are required.");
      return;
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Failed to register user.");
        return;
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError("Server is not responding.");
    }
  };

  const handleGoogleSignup = () => {
    alert("Google signup initiated");
  };

  const handleFacebookSignup = () => {
    alert("Facebook signup initiated");
  };

  return (
    <div className={`signup-container ${isLoaded ? "loaded" : ""}`}>
      <div className="signup-card">
        <div className="logo">logo</div>

        <h1 className="signup-title">Get Started</h1>
        <p className="signup-subtitle">
          Welcome to sideL. Let's create your account
        </p>

        <div className="social-buttons">
          <button className="google-btn" onClick={handleGoogleSignup}>
            <svg className="google-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button className="facebook-btn" onClick={handleFacebookSignup}>
            <svg className="facebook-icon" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input-box"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input-box"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-box"
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number (Optional)"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input-box"
          />

          <input
            type="text"
            name="address"
            placeholder="Address (Optional)"
            value={formData.address}
            onChange={handleChange}
            className="input-box"
          />
        </div>

        <button className="email-btn" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="terms-text">
          By clicking "Sign up", you agree to our{" "}
          <Link to="/terms">Terms</Link>,{" "}
          <Link to="/privacy">Privacy Policy</Link> and{" "}
          <Link to="/cookies">Cookies Policy</Link>.
        </p>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;