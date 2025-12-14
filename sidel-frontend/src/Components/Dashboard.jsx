// src/Components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Heart, Star, Video, X } from "lucide-react";
import { Link } from "react-router-dom";
import "../Style/Dashboard.css";
import Header from "./Header";

const Dashboard = () => {
  const [favorites, setFavorites] = useState({});
  const [providerGigs, setProviderGigs] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [userName, setUserName] = useState("");
  const [bookingData, setBookingData] = useState({
    clientName: "",
    clientPhone: "",
    brand: "",
    model: "",
    gadgetType: "",
    issueDescription: "",
    serviceDate: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  useEffect(() => {
    // Get logged user name
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setUserName(loggedUser.name || "User");
    }

    // Get approved providers and their gigs from localStorage
    const approvedProviders = JSON.parse(localStorage.getItem("providers")) || [];
    const gigs = [];

    approvedProviders.forEach((prov) => {
      if (prov.status === "approved" && prov.gigs) {
        prov.gigs.forEach((gig, index) => {
          gigs.push({
            ...gig,
            providerName: prov.name,
            providerEmail: prov.email,
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

  const handleBookNow = (service) => {
    // Pre-fill name and phone from logged user
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    setSelectedService(service);
    setBookingData({
      clientName: loggedUser?.name || "",
      clientPhone: loggedUser?.phoneNumber || "",
      brand: "",
      model: "",
      gadgetType: "",
      issueDescription: "",
      serviceDate: ""
    });
    setShowBookingModal(true);
    setBookingError("");
    setBookingSuccess("");
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
    setBookingData({ clientName: "", clientPhone: "", brand: "", model: "", gadgetType: "", issueDescription: "", serviceDate: "" });
    setBookingError("");
    setBookingSuccess("");
  };

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    if (!bookingData.serviceDate || !bookingData.gadgetType) {
      setBookingError("Please fill in all required fields");
      return;
    }

    // Get logged in user
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedUser) {
      setBookingError("You must be logged in to book a service");
      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      // Try to send to backend but don't fail if it's not available
      try {
        const response = await fetch("http://localhost:8080/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: { userId: loggedUser.userId },
            technician: { technicianId: 1 },
            serviceDate: bookingData.serviceDate,
            bookingDate: new Date().toISOString().split('T')[0],
            status: "PENDING",
            gadget: {
              gadgetType: bookingData.gadgetType,
              brand: bookingData.brand,
              model: bookingData.model,
              issueDescription: bookingData.issueDescription
            }
          }),
        });

        if (!response.ok) {
          console.warn("Backend booking failed, saving to localStorage");
        }
      } catch (err) {
        console.warn("Backend not available, saving booking to localStorage", err);
      }

      // Always save to localStorage regardless of backend
      // Create provider notification
      const providerNotifications = JSON.parse(localStorage.getItem("providerNotifications")) || [];
      const newNotification = {
        id: Date.now().toString(),
        providerEmail: selectedService.providerEmail,
        message: `New booking from ${bookingData.clientName} for ${selectedService.title}`,
        bookingDetails: {
          clientName: bookingData.clientName,
          clientEmail: loggedUser.email,
          clientPhone: bookingData.clientPhone,
          serviceName: selectedService.title,
          gadgetType: bookingData.gadgetType,
          brand: bookingData.brand,
          model: bookingData.model,
          issueDescription: bookingData.issueDescription,
          requestedServiceDate: bookingData.serviceDate,
          status: "pending"
        },
        timestamp: new Date().toISOString(),
        read: false
      };
      
      providerNotifications.push(newNotification);
      localStorage.setItem("providerNotifications", JSON.stringify(providerNotifications));

      // Also save booking to localStorage for provider tracking
      const providerBookings = JSON.parse(localStorage.getItem("providerBookings")) || [];
      const bookingId = Date.now().toString();
      providerBookings.push({
        id: bookingId,
        providerEmail: selectedService.providerEmail,
        providerName: selectedService.providerName,
        clientName: bookingData.clientName,
        clientEmail: loggedUser.email,
        clientPhone: bookingData.clientPhone,
        serviceName: selectedService.title,
        gadgetType: bookingData.gadgetType,
        brand: bookingData.brand,
        model: bookingData.model,
        issueDescription: bookingData.issueDescription,
        requestedServiceDate: bookingData.serviceDate,
        actualServiceDate: null,
        bookingDate: new Date().toISOString().split('T')[0],
        status: "pending"
      });
      localStorage.setItem("providerBookings", JSON.stringify(providerBookings));

      // Also save to bookings for user access
      const userBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      userBookings.push({
        id: bookingId,
        userId: loggedUser.userId,
        providerEmail: selectedService.providerEmail,
        providerName: selectedService.providerName,
        clientName: bookingData.clientName,
        clientEmail: loggedUser.email,
        clientPhone: bookingData.clientPhone,
        serviceName: selectedService.title,
        gadgetType: bookingData.gadgetType,
        brand: bookingData.brand,
        model: bookingData.model,
        issueDescription: bookingData.issueDescription,
        requestedServiceDate: bookingData.serviceDate,
        actualServiceDate: null,
        bookingDate: new Date().toISOString().split('T')[0],
        status: "pending"
      });
      localStorage.setItem("bookings", JSON.stringify(userBookings));

      // Create user notification
      const userNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
      userNotifications.push({
        id: Date.now() + 1,
        userId: loggedUser.userId,
        bookingId: bookingId,
        type: "booking_submitted",
        message: `Your booking for ${selectedService.title} has been submitted and is pending provider approval.`,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem("notifications", JSON.stringify(userNotifications));

      setBookingSuccess("Booking submitted successfully!");
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      setBookingError(error.message || "An error occurred during booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  const ServiceCard = ({ service }) => {
    // Get first photo if available, otherwise use a gradient placeholder
    const backgroundImage = service.photos && service.photos.length > 0 
      ? `url(${service.photos[0]})`
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

    return (
    <div className="service-card">
      <div className="card-image" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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

        <div className="card-actions">
          <button onClick={() => handleBookNow(service)} className="book-now-btn">
            Book Now
          </button>
          <Link to={`/provider/${service.id}`} className="view-profile-btn">
            View Profile
          </Link>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Header />

      <main className="main-content">
        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Welcome {userName}, let them help you!</h2>
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

      {showBookingModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Book Service</h2>
              <button onClick={handleCloseModal} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              {selectedService && (
                <div className="booking-service-info">
                  <h3>{selectedService.title}</h3>
                  <p className="provider-info">Provider: {selectedService.providerName}</p>
                  <p className="price-info">Price: ${selectedService.price}</p>
                </div>
              )}

              {bookingError && <p className="error-message">{bookingError}</p>}
              {bookingSuccess && <p className="success-message">{bookingSuccess}</p>}

              <form onSubmit={handleSubmitBooking}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="clientName"
                      value={bookingData.clientName}
                      onChange={handleBookingChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="clientPhone"
                      value={bookingData.clientPhone}
                      onChange={handleBookingChange}
                      placeholder="e.g., +1234567890"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Gadget Type *</label>
                  <select
                    name="gadgetType"
                    value={bookingData.gadgetType}
                    onChange={handleBookingChange}
                    required
                  >
                    <option value="">Select gadget type</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="laptop">Laptop</option>
                    <option value="tablet">Tablet</option>
                    <option value="desktop">Desktop</option>
                    <option value="smartwatch">Smartwatch</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={bookingData.brand}
                      onChange={handleBookingChange}
                      placeholder="e.g., Apple, Samsung"
                    />
                  </div>

                  <div className="form-group">
                    <label>Model</label>
                    <input
                      type="text"
                      name="model"
                      value={bookingData.model}
                      onChange={handleBookingChange}
                      placeholder="e.g., iPhone 13"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Issue Description *</label>
                  <textarea
                    name="issueDescription"
                    value={bookingData.issueDescription}
                    onChange={handleBookingChange}
                    placeholder="Describe the issue with your device..."
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Service Date *</label>
                  <input
                    type="date"
                    name="serviceDate"
                    value={bookingData.serviceDate}
                    onChange={handleBookingChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <button type="button" onClick={handleCloseModal} className="btn-cancel">
                    Cancel
                  </button>
                  <button type="submit" disabled={bookingLoading} className="btn-submit">
                    {bookingLoading ? "Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
