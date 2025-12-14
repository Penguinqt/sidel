import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Upload, DollarSign, Package, CheckCircle, Clock, Bell, LogOut } from "lucide-react";
import "../Style/ProvidersPage.css";

const ProvidersPage = () => {
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showGigForm, setShowGigForm] = useState(false);
  const [newGig, setNewGig] = useState({
    id: Date.now(),
    title: "",
    description: "",
    price: "",
    category: "",
    tags: [],
    photos: [],
  });
  const [tagInput, setTagInput] = useState("");
  const [photoFiles, setPhotoFiles] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetail, setShowBookingDetail] = useState(false);
  const [serviceDate, setServiceDate] = useState("");

  useEffect(() => {
    const currentLoggedProvider = JSON.parse(localStorage.getItem("loggedProvider"));
    const currentLoggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!currentLoggedUser) {
      alert("You must log in first.");
      navigate("/");
      return;
    }

    if (!currentLoggedProvider || currentLoggedProvider.status !== "approved") {
      alert("Your provider application is still pending approval.");
      navigate("/dashboard");
      return;
    }

    setLoggedUser(currentLoggedUser);
    setProvider(currentLoggedProvider);
    setGigs(currentLoggedProvider.gigs || []);
    
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem("providerBookings")) || [];
    const providerBookings = allBookings.filter(b => b.providerEmail === currentLoggedProvider.email);
    setBookings(providerBookings);
    
    // Load notifications
    const allNotifications = JSON.parse(localStorage.getItem("providerNotifications")) || [];
    const providerNotifs = allNotifications.filter(n => n.providerEmail === currentLoggedProvider.email);
    setNotifications(providerNotifs);
    setHasUnread(providerNotifs.some(n => !n.read));
  }, [navigate]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark all as read
      const allNotifications = JSON.parse(localStorage.getItem("providerNotifications")) || [];
      const updated = allNotifications.map(n => 
        n.providerEmail === provider.email ? { ...n, read: true } : n
      );
      localStorage.setItem("providerNotifications", JSON.stringify(updated));
      setHasUnread(false);
    }
  };

  const clearNotification = (id) => {
    const allNotifications = JSON.parse(localStorage.getItem("providerNotifications")) || [];
    const filtered = allNotifications.filter(n => n.id !== id);
    localStorage.setItem("providerNotifications", JSON.stringify(filtered));
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleBackToUser = () => {
    setShowMenu(false);
    localStorage.removeItem("loggedProvider");
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setShowMenu(false);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedProvider");
    navigate("/");
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetail(true);
    setServiceDate(booking.actualServiceDate || "");
  };

  const handleCloseBookingDetail = () => {
    setShowBookingDetail(false);
    setSelectedBooking(null);
    setServiceDate("");
  };

  const handleAcceptBooking = () => {
    if (!serviceDate) {
      alert("Please set a service date");
      return;
    }

    const updatedBookings = bookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: "in_progress", actualServiceDate: serviceDate }
        : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("providerBookings", JSON.stringify(updatedBookings));
    
    // Also update user's bookings
    const userBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedUserBookings = userBookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: "in_progress", actualServiceDate: serviceDate }
        : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedUserBookings));
    
    // Create user notification
    const userNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    userNotifications.push({
      id: Date.now(),
      userId: selectedBooking.userId,
      bookingId: selectedBooking.id,
      type: "booking_accepted",
      message: `Your booking for ${selectedBooking.serviceName} has been accepted! Service scheduled for ${serviceDate}.`,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem("notifications", JSON.stringify(userNotifications));
    
    handleCloseBookingDetail();
  };

  const handleCompleteBooking = () => {
    const updatedBookings = bookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: "completed" }
        : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("providerBookings", JSON.stringify(updatedBookings));
    
    // Also update user's bookings
    const userBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedUserBookings = userBookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: "completed" }
        : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedUserBookings));
    
    // Create user notification
    const userNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    userNotifications.push({
      id: Date.now(),
      userId: selectedBooking.userId,
      bookingId: selectedBooking.id,
      type: "booking_completed",
      message: `Your booking for ${selectedBooking.serviceName} has been completed!`,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem("notifications", JSON.stringify(userNotifications));
    
    handleCloseBookingDetail();
  };

  const handleRejectBooking = () => {
    const updatedBookings = bookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: "cancelled" }
        : b
    );
    setBookings(updatedBookings);
    localStorage.setItem("providerBookings", JSON.stringify(updatedBookings));
    
    // Also update user's bookings
    const userBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedUserBookings = userBookings.map(b =>
      b.id === selectedBooking.id
        ? { ...b, status: "cancelled" }
        : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedUserBookings));
    
    // Create user notification
    const userNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    userNotifications.push({
      id: Date.now(),
      userId: selectedBooking.userId,
      bookingId: selectedBooking.id,
      type: "booking_cancelled",
      message: `Your booking for ${selectedBooking.serviceName} has been cancelled by the provider.`,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem("notifications", JSON.stringify(userNotifications));
    
    handleCloseBookingDetail();
  };

  // Calculate dashboard stats
  const stats = {
    pending: bookings.filter(b => b.status === "PENDING").length,
    completed: bookings.filter(b => b.status === "COMPLETED").length,
    income: bookings
      .filter(b => b.status === "COMPLETED")
      .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0),
  };

  const handleGigChange = (e) => {
    const { name, value } = e.target;
    setNewGig({ ...newGig, [name]: value });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newGig.tags.includes(tagInput.trim())) {
      setNewGig({ ...newGig, tags: [...newGig.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewGig({
      ...newGig,
      tags: newGig.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photoFiles.length > 10) {
      alert("You can upload a maximum of 10 photos.");
      return;
    }
    
    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreview([...photoPreview, ...newPreviews]);
    setPhotoFiles([...photoFiles, ...files]);
    
    // Store base64 or file names
    const filePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(results => {
      setNewGig({
        ...newGig,
        photos: [...newGig.photos, ...results],
      });
    });
  };

  const handleAddGig = (e) => {
    e.preventDefault();
    const gigWithImages = { ...newGig, id: Date.now() };
    const updatedGigs = [...gigs, gigWithImages];
    setGigs(updatedGigs);

    const updatedProvider = { ...provider, gigs: updatedGigs };
    setProvider(updatedProvider);
    localStorage.setItem("loggedProvider", JSON.stringify(updatedProvider));
    
    // Update providers list
    const providers = JSON.parse(localStorage.getItem("providers")) || [];
    const updatedProviders = providers.map(p => 
      p.email === provider.email ? updatedProvider : p
    );
    localStorage.setItem("providers", JSON.stringify(updatedProviders));

    // Reset form
    setNewGig({ id: Date.now(), title: "", description: "", price: "", category: "", tags: [], photos: [] });
    setPhotoFiles([]);
    setPhotoPreview([]);
    setTagInput("");
    setShowGigForm(false);
  };

  const handleDeleteGig = (id) => {
    const updatedGigs = gigs.filter(g => g.id !== id);
    setGigs(updatedGigs);

    const updatedProvider = { ...provider, gigs: updatedGigs };
    setProvider(updatedProvider);
    localStorage.setItem("loggedProvider", JSON.stringify(updatedProvider));
    
    // Update providers list
    const providers = JSON.parse(localStorage.getItem("providers")) || [];
    const updatedProviders = providers.map(p => 
      p.email === provider.email ? updatedProvider : p
    );
    localStorage.setItem("providers", JSON.stringify(updatedProviders));
  };

  if (!provider) return null;

  return (
    <div className="provider-page-container">
      {/* Provider Header with Navigation */}
      <div className="provider-navbar">
        <div className="navbar-left">
          <h1 className="navbar-logo">Sidel Provider</h1>
        </div>
        <div className="navbar-right">
          {/* Notification Button */}
          <div className="notification-menu">
            <button
              className="nav-btn notification-btn"
              onClick={toggleNotifications}
              title="Notifications">
              <Bell size={20} />
              {hasUnread && <span className="notification-badge"></span>}
            </button>
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Booking Notifications</h3>
                </div>
                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <div className="empty-notifications">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div key={notif.id} className="notification-item">
                        <div className="notification-content">
                          <p className="notification-text">{notif.message}</p>
                          <span className="notification-time">
                            {new Date(notif.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <button
                          className="notification-close"
                          onClick={() => clearNotification(notif.id)}>
                          <X size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Button with Menu Dropdown */}
          <div className="provider-menu">
            <button 
              className="nav-btn profile-btn" 
              title="Menu" 
              onClick={() => setShowMenu(!showMenu)}
            >
              {loggedUser?.name?.charAt(0).toUpperCase() || 'P'}
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button onClick={handleBackToUser} className="menu-item">
                  Back to User Dashboard
                </button>
                <button onClick={handleLogout} className="menu-item logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Provider Header */}
      <div className="provider-header">
        <div className="header-left">
          <h2>Welcome back, {provider.name}! 👋</h2>
        </div>
        <div className="header-right">
          <p><strong>Service:</strong> {provider.serviceCategory}</p>
          <p><strong>Experience:</strong> {provider.experience}</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="stat-card pending">
          <div className="stat-label">Pending Orders</div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-change">Awaiting approval</div>
        </div>
        <div className="stat-card income">
          <div className="stat-label">Total Income</div>
          <div className="stat-value">${stats.income.toFixed(2)}</div>
          <div className="stat-change">From completed orders</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-label">Completed Orders</div>
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-change">Successfully delivered</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="provider-content">
        {/* Gigs Section */}
        <div className="gigs-section">
          <div className="section-header">
            <h2 className="section-title">My Services</h2>
            <button className="add-gig-btn" onClick={() => setShowGigForm(!showGigForm)}>
              <Plus size={20} style={{ marginRight: '0.5rem', display: 'inline' }} />
              Add New Service
            </button>
          </div>

          {/* Gig Form */}
          {showGigForm && (
            <form onSubmit={handleAddGig} className="gig-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Service Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Smartphone Screen Repair"
                    value={newGig.title}
                    onChange={handleGigChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="50"
                    value={newGig.price}
                    onChange={handleGigChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  placeholder="Describe your service in detail..."
                  value={newGig.description}
                  onChange={handleGigChange}
                  className="form-textarea"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={newGig.category}
                  onChange={handleGigChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="laptop">Laptop</option>
                  <option value="tablet">Tablet</option>
                  <option value="desktop">Desktop</option>
                  <option value="appliance">Appliance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input-container">
                  <input
                    type="text"
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="form-input"
                  />
                  <button type="button" onClick={handleAddTag} className="add-tag-btn">
                    Add Tag
                  </button>
                </div>
                {newGig.tags.length > 0 && (
                  <div className="tags-display">
                    {newGig.tags.map((tag, i) => (
                      <span key={i} className="tag-chip" onClick={() => handleRemoveTag(tag)}>
                        {tag} <X size={14} />
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group photo-upload-container">
                <label>Photos</label>
                <label className="file-input-label">
                  <Upload size={16} style={{ marginRight: '0.5rem', display: 'inline' }} />
                  Choose Photos
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="file-input-hidden"
                  />
                </label>
                {photoPreview.length > 0 && (
                  <div className="photo-preview">
                    {photoPreview.map((preview, i) => (
                      <div key={i} className="photo-preview-item">
                        <img src={preview} alt={`Preview ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="submit-gig-btn">
                Add Service
              </button>
            </form>
          )}

          {/* Gigs Grid */}
          {gigs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <p className="empty-state-text">No services yet. Add your first service to get started!</p>
            </div>
          ) : (
            <div className="gigs-grid">
              {gigs.map((gig) => (
                <div key={gig.id} className="gig-card">
                  <div className="gig-image">
                    {gig.photos && gig.photos.length > 0 ? (
                      <img src={gig.photos[0]} alt={gig.title} />
                    ) : (
                      <Package size={64} />
                    )}
                  </div>
                  <div className="gig-content">
                    <h3 className="gig-title">{gig.title}</h3>
                    <p className="gig-description">{gig.description}</p>
                    {gig.tags && gig.tags.length > 0 && (
                      <div className="gig-tags">
                        {gig.tags.map((tag, i) => (
                          <span key={i} className="gig-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="gig-meta">
                      <div className="gig-price">${gig.price}</div>
                      <span className="gig-category">{gig.category}</span>
                    </div>
                    <button onClick={() => handleDeleteGig(gig.id)} className="delete-gig-btn">
                      Delete Service
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bookings Section */}
        <div className="bookings-section">
          <div className="section-header">
            <h2 className="section-title">Recent Bookings</h2>
          </div>
          {bookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <p className="empty-state-text">No bookings yet</p>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.slice(0, 5).map((booking) => (
                <div 
                  key={booking.id} 
                  className="booking-item"
                  onClick={() => handleBookingClick(booking)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="booking-header">
                    <div className="booking-client">{booking.clientName || "Client"}</div>
                    <span className={`booking-status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="booking-details">
                    <div>Service: {booking.serviceName}</div>
                    <div>Device: {booking.gadgetType}</div>
                    <div className="booking-date">
                      Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Detail Modal */}
      {showBookingDetail && selectedBooking && (
        <div className="modal-overlay" onClick={handleCloseBookingDetail}>
          <div className="modal-content booking-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button onClick={handleCloseBookingDetail} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-body booking-modal-body">
              {/* Client Information */}
              <div className="booking-section-group">
                <h3 className="section-title-sm">Client Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Name</label>
                    <p>{selectedBooking.clientName}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{selectedBooking.clientEmail}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{selectedBooking.clientPhone}</p>
                  </div>
                </div>
              </div>

              {/* Device Information */}
              <div className="booking-section-group">
                <h3 className="section-title-sm">Device Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Device Type</label>
                    <p>{selectedBooking.gadgetType}</p>
                  </div>
                  <div className="info-item">
                    <label>Brand</label>
                    <p>{selectedBooking.brand || 'N/A'}</p>
                  </div>
                  <div className="info-item">
                    <label>Model</label>
                    <p>{selectedBooking.model || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Issue Description */}
              <div className="booking-section-group">
                <h3 className="section-title-sm">Issue Description</h3>
                <div className="issue-box">
                  {selectedBooking.issueDescription}
                </div>
              </div>

              {/* Service Information */}
              <div className="booking-section-group">
                <h3 className="section-title-sm">Service Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Service Name</label>
                    <p>{selectedBooking.serviceName}</p>
                  </div>
                  <div className="info-item">
                    <label>Requested Date</label>
                    <p>{new Date(selectedBooking.requestedServiceDate).toLocaleDateString()}</p>
                  </div>
                  <div className="info-item">
                    <label>Status</label>
                    <p>
                      <span className={`status-badge ${selectedBooking.status.toLowerCase()}`}>
                        {selectedBooking.status.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions based on status */}
              {selectedBooking.status === 'pending' && (
                <div className="booking-section-group">
                  <h3 className="section-title-sm">Set Service Date</h3>
                  <input
                    type="date"
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="service-date-input"
                  />
                </div>
              )}

              {selectedBooking.status === 'in_progress' && (
                <div className="booking-section-group">
                  <p className="info-text">Service Date: {selectedBooking.actualServiceDate}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="modal-footer booking-modal-footer">
              <button onClick={handleCloseBookingDetail} className="btn-secondary">
                Close
              </button>

              {selectedBooking.status === 'pending' && (
                <>
                  <button onClick={handleRejectBooking} className="btn-danger">
                    Reject
                  </button>
                  <button onClick={handleAcceptBooking} className="btn-primary">
                    Accept & Set Date
                  </button>
                </>
              )}

              {selectedBooking.status === 'in_progress' && (
                <button onClick={handleCompleteBooking} className="btn-success">
                  Mark as Complete
                </button>
              )}

              {(selectedBooking.status === 'completed' || selectedBooking.status === 'cancelled') && (
                <p className="info-text">{selectedBooking.status === 'completed' ? '✓ Service Completed' : '✗ Booking Cancelled'}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvidersPage;
