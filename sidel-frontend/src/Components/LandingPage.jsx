import React from 'react';
import "../Style/LandingPage.css"

export default function LandingPage() {
  return (
    <div className="landing-page">
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
            <button className="btn btn-login">Login</button>
            <button className="btn btn-signup">Sign up</button>
          </div>
        </nav>
      </header>

      <main className="hero">
        <div className="floating-images">
          <div className="floating-item laptop"></div>
          <div className="floating-item phone"></div>
          <div className="floating-item fridge"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            "Fast & Trusted Repair Services at Your Fingertips with sideL"
          </h1>
          <p className="hero-subtitle">
            Find verified shops and technicians near you. Book anytime, anywhere.
          </p>
          <button className="btn-book">Book Now</button>
        </div>
      </main>
    </div>
  );
}