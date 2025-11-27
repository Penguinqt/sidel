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
  const navigate = useNavigate();



  useEffect(() => {
    setIsLoaded(true);
  }, []);


  const handleLogin = () => {
    if(email === "admin@gmail.com" && password === "123456"){
        navigate("/dashboard");
    } else{
       alert("Invalid Credentials");
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

        <form className="login-form">
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            className="login-btn"
            onClick={handleLogin}
            >Login
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
