import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/AdminDashboard.css";

const AdminDashboard = () => {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProviders = JSON.parse(localStorage.getItem("providers")) || [];
    setProviders(storedProviders);
  }, []);

  const updateProviders = (updatedList) => {
    setProviders(updatedList);
    localStorage.setItem("providers", JSON.stringify(updatedList));
  };

  const approveProvider = (id) => {
    const updated = providers.map((prov) =>
      prov.id === id ? { ...prov, status: "approved" } : prov
    );

    updateProviders(updated);

    const approvedUser = updated.find((p) => p.id === id);
    localStorage.setItem("loggedProvider", JSON.stringify(approvedUser));

    alert("✓ Provider approved successfully!");
  };

  const rejectProvider = (id) => {
    if (window.confirm("Are you sure you want to reject this provider?")) {
      const updated = providers.filter((prov) => prov.id !== id);
      updateProviders(updated);
      alert("Provider rejected!");
    }
  };

  const viewDetails = (provider) => {
    setSelectedProvider(provider);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const pendingProviders = providers.filter((p) => p.status === "pending");
  const approvedProviders = providers.filter((p) => p.status === "approved");

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-left">
            <h1 className="admin-logo">Sidel</h1>
            <span className="admin-badge">ADMIN</span>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="admin-dashboard-container">
        
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">
            Manage provider registrations and monitor platform activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon pending">⏳</div>
            <div className="stat-content">
              <div className="stat-label">Pending Reviews</div>
              <div className="stat-value">{pendingProviders.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon approved">✓</div>
            <div className="stat-content">
              <div className="stat-label">Approved Providers</div>
              <div className="stat-value">{approvedProviders.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon total">📊</div>
            <div className="stat-content">
              <div className="stat-label">Total Providers</div>
              <div className="stat-value">{providers.length}</div>
            </div>
          </div>
        </div>

        {/* Pending Providers Section */}
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">
              Pending Providers
              {pendingProviders.length > 0 && (
                <span className="section-badge warning">
                  {pendingProviders.length}
                </span>
              )}
            </h3>
          </div>

          {pendingProviders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h4 className="empty-title">No Pending Requests</h4>
              <p className="empty-description">
                All provider registrations have been reviewed
              </p>
            </div>
          ) : (
            <div className="providers-grid">
              {pendingProviders.map((prov) => (
                <div key={prov.id} className="provider-card">
                  <div className="provider-header">
                    <div className="provider-avatar">
                      {prov.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="provider-info">
                      <h4 className="provider-name">{prov.name}</h4>
                      <p className="provider-email">{prov.email}</p>
                    </div>
                  </div>

                  <div className="provider-details">
                    <div className="provider-detail-row">
                      <span className="detail-label">Service:</span>
                      <span className="detail-value">
                        {prov.serviceCategory}
                      </span>
                    </div>
                    <div className="provider-detail-row">
                      <span className="detail-label">Rate:</span>
                      <span className="detail-value">{prov.rate}</span>
                    </div>
                    <div className="provider-detail-row">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{prov.experience}</span>
                    </div>
                  </div>

                  <p className="provider-description">{prov.description}</p>

                  <div className="provider-actions">
                    <button
                      onClick={() => approveProvider(prov.id)}
                      className="action-btn btn-approve"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => rejectProvider(prov.id)}
                      className="action-btn btn-reject"
                    >
                      ✕ Reject
                    </button>
                    <button
                      onClick={() => viewDetails(prov)}
                      className="action-btn btn-view"
                    >
                      👁 View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Approved Providers Section */}
        <div className="section">
          <div className="section-header">
            <h3 className="section-title">
              Approved Providers
              {approvedProviders.length > 0 && (
                <span className="section-badge">
                  {approvedProviders.length}
                </span>
              )}
            </h3>
          </div>

          {approvedProviders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h4 className="empty-title">No Approved Providers Yet</h4>
              <p className="empty-description">
                Approved providers will appear here
              </p>
            </div>
          ) : (
            <div className="providers-grid">
              {approvedProviders.map((prov) => (
                <div key={prov.id} className="provider-card">
                  <div className="provider-header">
                    <div className="provider-avatar">
                      {prov.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="provider-info">
                      <h4 className="provider-name">{prov.name}</h4>
                      <p className="provider-email">{prov.email}</p>
                    </div>
                  </div>

                  <div className="provider-details">
                    <div className="provider-detail-row">
                      <span className="detail-label">Service:</span>
                      <span className="detail-value">
                        {prov.serviceCategory}
                      </span>
                    </div>
                    <div className="provider-detail-row">
                      <span className="detail-label">Rate:</span>
                      <span className="detail-value">{prov.rate}</span>
                    </div>
                  </div>

                  <div className="provider-actions">
                    <button
                      onClick={() => viewDetails(prov)}
                      className="action-btn btn-view"
                    >
                      👁 View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedProvider && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Provider Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-content">
              {/* Personal Information */}
              <div className="modal-section">
                <h3 className="modal-section-title">Personal Information</h3>
                <div className="modal-row">
                  <div className="modal-field">
                    <div className="modal-label">Full Name</div>
                    <div className="modal-value">{selectedProvider.name}</div>
                  </div>
                  <div className="modal-field">
                    <div className="modal-label">Email</div>
                    <div className="modal-value">{selectedProvider.email}</div>
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-field">
                    <div className="modal-label">Phone</div>
                    <div className="modal-value">
                      {selectedProvider.phoneNumber}
                    </div>
                  </div>
                  <div className="modal-field">
                    <div className="modal-label">Address</div>
                    <div className="modal-value">
                      {selectedProvider.address}
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="modal-section">
                <h3 className="modal-section-title">Service Information</h3>
                <div className="modal-row">
                  <div className="modal-field">
                    <div className="modal-label">Category</div>
                    <div className="modal-value">
                      {selectedProvider.serviceCategory}
                    </div>
                  </div>
                  <div className="modal-field">
                    <div className="modal-label">Rate</div>
                    <div className="modal-value">{selectedProvider.rate}</div>
                  </div>
                </div>
                <div className="modal-row">
                  <div className="modal-field">
                    <div className="modal-label">Experience</div>
                    <div className="modal-value">
                      {selectedProvider.experience}
                    </div>
                  </div>
                  <div className="modal-field">
                    <div className="modal-label">Availability</div>
                    <div className="modal-value">
                      {selectedProvider.availability}
                    </div>
                  </div>
                </div>
                <div className="modal-field">
                  <div className="modal-label">Description</div>
                  <div className="modal-value">
                    {selectedProvider.description}
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedProvider.tags?.length > 0 && (
                <div className="modal-section">
                  <h3 className="modal-section-title">Skills & Specialties</h3>
                  <div className="modal-tags">
                    {selectedProvider.tags.map((tag, i) => (
                      <span key={i} className="modal-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="modal-btn modal-btn-close"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;