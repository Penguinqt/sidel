import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Upload, DollarSign, Package, CheckCircle, Clock } from "lucide-react";
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

  useEffect(() => {
    const loggedProvider = JSON.parse(localStorage.getItem("loggedProvider"));
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      alert("You must log in first.");
      navigate("/");
      return;
    }

    if (!loggedProvider || loggedProvider.status !== "approved") {
      alert("Your provider application is still pending approval.");
      navigate("/dashboard");
      return;
    }

    setProvider(loggedProvider);
    setGigs(loggedProvider.gigs || []);
    
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const providerBookings = allBookings.filter(b => b.providerId === loggedProvider.id);
    setBookings(providerBookings);
  }, [navigate]);

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
      {/* Provider Header */}
      <div className="provider-header">
        <h1>Welcome back, {provider.name}! 👋</h1>
        <p><strong>Service:</strong> {provider.serviceCategory} | <strong>Experience:</strong> {provider.experience}</p>
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
                <div key={booking.id} className="booking-item">
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
    </div>
  );
};

export default ProvidersPage;
