import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Style/ProvidersForm.css";

const ProvidersForm = () => {
  const [providerData, setProviderData] = useState({
    name: "",
    email: "",
    role: "provider",
    phoneNumber: "",
    address: "",
    serviceCategory: "",
    description: "",
    rate: "",
    availability: "",
    experience: "",
    photos: [],
    tags: [],
  });

  const [photoFiles, setPhotoFiles] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProviderData({ ...providerData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + photoFiles.length > 10) {
      alert("You can upload a maximum of 10 photos/videos.");
      return;
    }
    setPhotoFiles([...photoFiles, ...files]);
    setProviderData({
      ...providerData,
      photos: [...photoFiles.map(f => f.name), ...files.map(f => f.name)],
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !providerData.tags.includes(tagInput.trim())) {
      setProviderData({ ...providerData, tags: [...providerData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setProviderData({
      ...providerData,
      tags: providerData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Load existing providers list
  const existingProviders = JSON.parse(localStorage.getItem("providers")) || [];

  // Add id + status
  const newProvider = {
    ...providerData,
    id: Date.now(),       // unique ID
    status: "pending",    // default
  };

  // Save
  const updatedProviders = [...existingProviders, newProvider];
  localStorage.setItem("providers", JSON.stringify(updatedProviders));

  alert(
    "Provider registration submitted! Awaiting admin approval. You cannot access the Provider Page yet."
  );

  // Reset fields
  setProviderData({
    name: "",
    email: "",
    role: "provider",
    phoneNumber: "",
    address: "",
    serviceCategory: "",
    description: "",
    rate: "",
    availability: "",
    experience: "",
    photos: [],
    tags: [],
  });

  setPhotoFiles([]);
};
  return (
    <div className="provider-form-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-inner">
            <h1 className="logo">Sidel</h1>
            
            <nav className="nav">
              <Link to="/dashboard" className="nav-link">Services</Link>
              <Link to="/browse" className="nav-link">Browse</Link>
            </nav>

            <div className="header-right">
              <Link to="/provider/register" className="become-provider-btn">
                Become a Provider
              </Link>
              <div className="profile-btn">P</div>
            </div>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <div className="provider-form-container">
        <div className="form-header">
          <h2 className="form-title">Become a Provider</h2>
          <p className="form-subtitle">
            Join our network of trusted professionals and start growing your business today
          </p>
        </div>

        <div className="provider-form-card">
          <form onSubmit={handleSubmit} className="provider-form">
            
            {/* Personal Information */}
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={providerData.name}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={providerData.email}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="+63 912 345 6789"
                    value={providerData.phoneNumber}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Address <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Main St, City, State"
                    value={providerData.address}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="form-section">
              <h3 className="section-title">Service Details</h3>

              <div className="form-group">
                <label className="form-label">
                  Service Category <span className="required">*</span>
                </label>
                <select
                  name="serviceCategory"
                  value={providerData.serviceCategory}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="phone-repair">Phone Repair</option>
                  <option value="appliance-repair">Appliance Repair</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Service Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your services, specialties, and what makes you stand out..."
                  value={providerData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                />
                <p className="info-text">Min. 50 characters</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    Hourly Rate <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="rate"
                    placeholder="$50/hour"
                    value={providerData.rate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Years of Experience <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="5 years"
                    value={providerData.experience}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Availability <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="availability"
                  placeholder="Monday - Friday, 9AM - 5PM"
                  value={providerData.availability}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Media Upload */}
            <div className="form-section">
              <h3 className="section-title">Portfolio</h3>
              
              <div className="form-group">
                <label className="form-label">
                  Photos/Videos (Max 10)
                </label>
                <div className="file-upload-wrapper">
                  <label htmlFor="file-upload" className="file-upload-label">
                    <div className="file-upload-icon">📁</div>
                    <div className="file-upload-text">
                      <strong>Click to upload</strong> or drag and drop
                      <br />
                      <small>PNG, JPG, MP4 up to 10MB each</small>
                    </div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handlePhotoUpload}
                    className="file-upload-input"
                  />
                  {photoFiles.length > 0 && (
                    <p className="file-count">
                      ✓ {photoFiles.length} file(s) selected
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="form-section">
              <h3 className="section-title">Skills & Specialties</h3>
              
              <div className="form-group">
                <label className="form-label">Add Tags</label>
                <div className="tags-input-wrapper">
                  <input
                    type="text"
                    placeholder="e.g., iPhone repair, Samsung, screen replacement"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="form-input tags-input"
                  />
                  <button type="button" onClick={handleAddTag} className="add-tag-btn">
                    Add Tag
                  </button>
                </div>
                
                {providerData.tags.length > 0 && (
                  <div className="tags-display">
                    {providerData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <span className="tag-remove" onClick={() => handleRemoveTag(tag)}>
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProvidersForm;