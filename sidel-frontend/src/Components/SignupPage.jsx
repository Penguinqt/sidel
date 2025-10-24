import React, { useState, useEffect } from "react";
import "../Style/SignupPage.css";

const SignupPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Add a small animation when the component loads
    setIsLoaded(true);
  }, []);

  return (
    <div className={`signup-container ${isLoaded ? "loaded" : ""}`}>
      <div className="logo">logo</div>

      <h1 className="signup-title">Choose a way to sign up</h1>

      <p className="policy-text">
        By continuing to use this app, you agree to our{" "}
        <a href="#" className="policy-link">
          Privacy Policy.
        </a>
      </p>

      <button className="google-btn">
      

        <p className="google-text">Continue with Google</p> 
      </button>

      <div className="divider">
        <span className="line"></span>
        <span className="or-text">or</span>
        <span className="line"></span>
      </div>

      <button className="email-btn">Continue with email</button>

      <p className="footer-text">
        Already have an account?{" "}
        <a href="#" className="signup-link">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
