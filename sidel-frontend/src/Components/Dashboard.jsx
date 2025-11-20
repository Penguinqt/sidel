import React, { useState, useEffect } from 'react';
import { Heart, Star, Video } from 'lucide-react';
import "../Style/Dashboard.css"

const Dashboard = () => {
  const [favorites, setFavorites] = useState({});
  const [services, setServices] = useState([]);
  const [popularServices, setPopularServices] = useState([]);

  useEffect(() => {
    
    const verifiedServicesData = [
      {
        id: 1,
        name: "TechFix Pro",
        badge: "Vetted Pro",
        title: "Expert phone and gadget repair - iPhone, Samsung, tablets, laptops",
        rating: 5.0,
        reviews: 314,
        price: 45,
        image: "linear-gradient(135deg, #0C969C 0%, #0A7075 100%)",
        tag: "PHONE REPAIR",
        tagColor: "#031716"
      },
      {
        id: 2,
        name: "CoolTech Services",
        badge: "Vetted Pro",
        title: "Professional refrigerator and freezer repair service",
        rating: 5.0,
        reviews: 666,
        price: 75,
        image: "linear-gradient(135deg, #6BA3BE 0%, #274D60 100%)",
        tag: "APPLIANCE REPAIR",
        tagColor: "#032F30"
      },
      {
        id: 3,
        name: "PlumbMaster",
        badge: "Vetted Pro",
        title: "Licensed plumbing repair - leaks, drains, pipes, water heaters",
        rating: 4.8,
        reviews: 405,
        price: 85,
        image: "linear-gradient(135deg, #274D60 0%, #031716 100%)",
        tag: "PLUMBING",
        tagColor: "#0C969C"
      },
      {
        id: 4,
        name: "Spark Electric",
        badge: "Vetted Pro",
        title: "Certified electrician - wiring, outlets, panels, lighting repair",
        rating: 4.9,
        reviews: "1k+",
        price: 95,
        image: "linear-gradient(135deg, #0A7075 0%, #0C969C 100%)",
        tag: "ELECTRICAL",
        tagColor: "#031716"
      },
      {
        id: 5,
        name: "AC Masters",
        badge: "Vetted Pro",
        title: "Air conditioning and HVAC repair, maintenance, installation",
        rating: 5.0,
        reviews: 791,
        price: 120,
        image: "linear-gradient(135deg, #032F30 0%, #0A7075 100%)",
        tag: "HVAC",
        tagColor: "#6BA3BE"
      }
    ];

    const popularGigsData = [
      {
        id: 6,
        name: "HomeAppliance Fix",
        title: "Washing machine, dryer, dishwasher repair and maintenance",
        rating: 4.9,
        reviews: 523,
        price: 65,
        image: "linear-gradient(135deg, #6BA3BE 0%, #0C969C 100%)",
        tag: "APPLIANCES",
        tagColor: "#031716"
      },
      {
        id: 7,
        name: "AutoCare Solutions",
        title: "Mobile car repair and maintenance - brakes, oil, diagnostics",
        rating: 5.0,
        reviews: "1.5k+",
        price: 80,
        image: "linear-gradient(135deg, #0A7075 0%, #274D60 100%)",
        tag: "AUTO REPAIR",
        tagColor: "#032F30"
      },
      {
        id: 8,
        name: "PC Rescue Team",
        title: "Computer and laptop repair - virus removal, upgrades, data recovery",
        rating: 4.8,
        reviews: 892,
        price: 55,
        image: "linear-gradient(135deg, #274D60 0%, #6BA3BE 100%)",
        tag: "COMPUTER REPAIR",
        tagColor: "#0C969C"
      },
      {
        id: 9,
        name: "RoofPro Services",
        title: "Roof repair and maintenance - leaks, shingles, gutters",
        rating: 5.0,
        reviews: 634,
        price: 150,
        image: "linear-gradient(135deg, #0C969C 0%, #032F30 100%)",
        tag: "ROOFING",
        tagColor: "#031716"
      }
    ];

    setServices(verifiedServicesData);
    setPopularServices(popularGigsData);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const ServiceCard = ({ service, section }) => (
    <div className="service-card">
      <div className="card-image" style={{ background: service.image }}>
        <div className="card-tag">
          <span className="tag-label" style={{ backgroundColor: service.tagColor }}>
            {service.tag}
          </span>
        </div>
        <button
          onClick={() => toggleFavorite(`${section}-${service.id}`)}
          className="favorite-btn"
        >
          <Heart
            size={18}
            className={favorites[`${section}-${service.id}`] ? "heart-filled" : "heart-empty"}
          />
        </button>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <div className="avatar">
            {service.name.charAt(0)}
          </div>
          <span className="provider-name">{service.name}</span>
          <span className="badge">
            {service.badge}
          </span>
        </div>
        
        <h3 className="card-title">
          {service.title}
        </h3>
        
        <div className="rating-section">
          <Star size={14} className="star-icon" />
          <span className="rating-value">{service.rating}</span>
          <span className="review-count">({service.reviews})</span>
        </div>
        
        <div className="consultation-info">
          <div className="consultation-text">
            <Video size={14} />
            <span>Offers video consultations</span>
          </div>
        </div>
        
        <div className="price-section">
          <span className="price-label">From </span>
          <span className="price-value">${service.price}</span>
        </div>
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
              <a href="#" className="nav-link">Services</a>
              <a href="#" className="nav-link">Browse</a>
              <a href="#" className="nav-link">Become a Seller</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                Verified Pro services in Home & Tech Repair
              </h2>
              <p className="section-subtitle">Hand-vetted experts for all your repair needs</p>
            </div>
            <button className="show-all-btn">
              Show All →
            </button>
          </div>
          
          <div className="cards-container">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} section="verified" />
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2 className="section-title">
              Most popular repair services
            </h2>
            <button className="show-all-btn">
              Show All →
            </button>
          </div>
          
          <div className="cards-container">
            {popularServices.map(service => (
              <ServiceCard key={service.id} service={service} section="popular" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;