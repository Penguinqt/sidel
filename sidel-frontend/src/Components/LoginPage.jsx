import React, { useEffect, useState } from "react";
import "../Style/LoginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`login-container ${isLoaded ? "loaded" : ""}`}>
      <div className="login-card">
        <h1 className="login-title">Get Started</h1>
        <p className="login-subtitle">Welcome to sideL. Let’s continue your session</p>

        <div className="social-buttons">
          <button className="google-btn">
            <img src="/google-icon.png" alt="Google" className="icon" />
            Continue with Google
          </button>
          <button className="facebook-btn">
            <img src="/facebook-icon.png" alt="Facebook" className="icon" />
            Continue with Facebook
          </button>
        </div>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="terms-text">
          By clicking Sign in, you agree to our{" "}
          <a href="#">Terms, Privacy Policy</a> and <a href="#">Cookies Policy</a>.
        </p>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      {/* Floating visuals */}
      <div className="floating-shapes">
        <div className="shape circle"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
      </div>
    </div>
  );
  // asddasdasd
};

export default LoginPage;
