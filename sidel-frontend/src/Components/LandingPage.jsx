import React from 'react';
import "../Style/LandingPage.css"
import Header from './Header';

export default function LandingPage() {
 

  return (
   
    <div className="landing-page">
      <Header />
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