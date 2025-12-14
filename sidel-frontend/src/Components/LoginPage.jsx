import React, { useEffect, useState} from "react";
import "../Style/LoginPage.css";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import googleLogo from "../Assets/google-logo.png"
import facebookLogo from "../Assets/facebook-logo.png"

const LoginPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Invalid email or password");
      }

      const userData = await response.json();
      
      // Store user data in localStorage
      localStorage.setItem("loggedUser", JSON.stringify(userData));
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className={`login-container ${isLoaded ? "loaded" : ""}`}>
      <div className="login-card">
        <h1 className="login-title">Get Started</h1>
        <p className="login-subtitle">Welcome to sideL. Let’s continue your session</p>

        <div className="social-buttons">
          <button className="google-btn">
            <img src={googleLogo} alt="Google" className="icon" />
            Continue with <br />Google
          </button>
          <button className="facebook-btn">
            <img src={facebookLogo} alt="Facebook" className="icon" />
            Continue with  <br /> Facebook
          </button>
        </div>

        <div className="divider">
          <span className="line"></span>
          <span className="or-text">or</span>
          <span className="line"></span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />

          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
            >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="terms-text">
          By clicking Sign in, you agree to our{" "}
          <a href="#">Terms, Privacy Policy</a> and <a href="#">Cookies Policy</a>.
        </p>

        <p className="footer-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

    
    </div>
  );
};


export default LoginPage;
