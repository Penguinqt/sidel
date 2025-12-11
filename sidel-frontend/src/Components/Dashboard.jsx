// src/Components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Heart, Star, Video } from "lucide-react";
import { Link } from "react-router-dom";
import "../Style/Dashboard.css";

const Dashboard = () => {
  const [favorites, setFavorites] = useState({});
  const [providerGigs, setProviderGigs] = useState([]);

  useEffect(() => {
    // Get approved providers and their gigs from localStorage
    const approvedProviders = JSON.parse(localStorage.getItem("providers")) || [];
    const gigs = [];

    approvedProviders.forEach((prov) => {
      if (prov.status === "approved" && prov.gigs) {
        prov.gigs.forEach((gig, index) => {
          gigs.push({
            ...gig,
            providerName: prov.name,
            providerBadge: "Vetted Pro",
            id: `${prov.email}-${index}`,
          });
        });
      }
    });

    setProviderGigs(gigs);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const ServiceCard = ({ service }) => (
    <div className="service-card">
      <div className="card-image" style={{ background: service.image || "#ccc" }}>
        <div className="card-tag">
          <span className="tag-label" style={{ backgroundColor: service.tagColor || "#031716" }}>
            {service.category || "SERVICE"}
          </span>
        </div>
        <button
          onClick={() => toggleFavorite(service.id)}
          className="favorite-btn"
        >
          <Heart
            size={18}
            className={favorites[service.id] ? "heart-filled" : "heart-empty"}
          />
        </button>
      </div>

      <div className="card-content">
        <div className="card-header">
          <div className="avatar">{service.providerName.charAt(0)}</div>
          <span className="provider-name">{service.providerName}</span>
          <span className="badge">{service.providerBadge}</span>
        </div>

        <h3 className="card-title">{service.title}</h3>

        <div className="rating-section">
          <Star size={14} className="star-icon" />
          <span className="rating-value">{service.rating || 0}</span>
          <span className="review-count">({service.reviews || 0})</span>
        </div>

        <div className="consultation-info">
          <div className="consultation-text">
            <Video size={14} />
            <span>Offers video consultations</span>
          </div>
        </div>

        <div className="price-section">
          <span className="price-label">From </span>
          <span className="price-value">${service.price || 0}</span>
        </div>

        <Link to={`/provider/${service.id}`} className="view-profile-btn">
          View Profile
        </Link>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-content">
          <div className="header-inner">
            <h1 className="logo">Sidel</h1>
            <nav className="nav">
              <Link to="/dashboard" className="nav-link">Services</Link>
              <Link to="/browse" className="nav-link">Browse</Link>
              <Link to="/provider/register" className="nav-link">Become a Provider</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Verified Pro Services</h2>
              <p className="section-subtitle">Hand-vetted experts for all your repair needs</p>
            </div>
          </div>

          <div className="cards-container">
            {providerGigs.length > 0 ? (
              providerGigs.map((gig) => <ServiceCard key={gig.id} service={gig} />)
            ) : (
              <p>No services available yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
