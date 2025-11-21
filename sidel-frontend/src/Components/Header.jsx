import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Header.css';

const Header = () => {
   const navigate = useNavigate();
  return (
    <header className="header">
        <div className="logo">logo</div>
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="auth-buttons">
            <button
              className="btn btn-login"
              onClick={() => navigate("/login")}>
              Login
            </button>
            <button
              className="btn btn-signup"
              onClick={() => navigate("/signup")} >
              Sign up
            </button>
          </div>
        </nav>
      </header>
  );
};

export default Header;