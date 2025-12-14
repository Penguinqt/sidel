import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, X } from 'lucide-react';
import '../Style/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [technicianStatus, setTechnicianStatus] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
      setIsLoggedIn(true);
      setUserName(loggedUser.name || loggedUser.email);
      setLoggedUserId(loggedUser.userId);

      // Check technician status
      const providers = JSON.parse(localStorage.getItem('providers')) || [];
      const userProvider = providers.find(
        p => p.email === loggedUser.email
      );
      if (userProvider) {
        setTechnicianStatus(userProvider.status);
        
        // Add notification if approved
        if (userProvider.status === 'approved') {
          const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
          const approvalNotif = existingNotifications.find(
            n => n.type === 'technician_approved' && n.userId === loggedUser.userId
          );
          if (!approvalNotif) {
            const newNotif = {
              id: Date.now(),
              userId: loggedUser.userId,
              type: 'technician_approved',
              message: 'Your technician registration has been approved!',
              timestamp: new Date(),
              read: false
            };
            existingNotifications.push(newNotif);
            localStorage.setItem('notifications', JSON.stringify(existingNotifications));
            setNotifications([newNotif, ...existingNotifications.filter(n => n.userId === loggedUser.userId)]);
            setHasUnread(true);
          } else {
            const userNotifications = existingNotifications.filter(n => n.userId === loggedUser.userId);
            setNotifications(userNotifications);
            setHasUnread(userNotifications.some(n => !n.read));
          }
        } else {
          const userNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
          const filtered = userNotifications.filter(n => n.userId === loggedUser.userId);
          setNotifications(filtered);
          setHasUnread(filtered.some(n => !n.read));
        }
      } else {
        const userNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
        const filtered = userNotifications.filter(n => n.userId === loggedUser.userId);
        setNotifications(filtered);
        setHasUnread(filtered.some(n => !n.read));
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setLoggedUserId(null);
    }
  }, [location]); // Re-check when location changes

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Mark all as read
      const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
      const updated = existingNotifications.map(n => 
        n.userId === loggedUserId ? { ...n, read: true } : n
      );
      localStorage.setItem('notifications', JSON.stringify(updated));
      setHasUnread(false);
    }
  };

  const handleProviderClick = () => {
    setShowDropdown(false);
    
    // Re-check provider status from localStorage every time
    const providers = JSON.parse(localStorage.getItem('providers')) || [];
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    
    if (!loggedUser) {
      navigate('/login');
      return;
    }
    
    const userProvider = providers.find(p => p.email === loggedUser.email);
    
    // Check if user is approved
    if (userProvider && userProvider.status === 'approved') {
      // Set as logged provider and navigate
      localStorage.setItem('loggedProvider', JSON.stringify(userProvider));
      navigate('/provider/page');
    } else if (userProvider && userProvider.status === 'pending') {
      // Show pending modal
      setShowTechnicianModal(true);
    } else {
      // No provider account, show registration modal
      setShowTechnicianModal(true);
    }
  };

  const handleConfirmTechnician = () => {
    setShowTechnicianModal(false);
    navigate('/provider/register');
  };

  const handleCloseTechnicianModal = () => {
    setShowTechnicianModal(false);
  };

  const clearNotification = (id) => {
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const filtered = existingNotifications.filter(n => n.id !== id);
    localStorage.setItem('notifications', JSON.stringify(filtered));
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const filtered = existingNotifications.filter(n => n.userId !== loggedUserId);
    localStorage.setItem('notifications', JSON.stringify(filtered));
    setNotifications([]);
    setHasUnread(false);
  };

  const handleNotificationClick = (notif) => {
    // Mark as read
    const existingNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const updated = existingNotifications.map(n => 
      n.id === notif.id ? { ...n, read: true } : n
    );
    localStorage.setItem('notifications', JSON.stringify(updated));
    setNotifications(updated);
    
    // Find the related booking and show modal
    if (notif.bookingId) {
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const booking = bookings.find(b => b.id === notif.bookingId);
      if (booking) {
        setSelectedBooking(booking);
        setShowBookingModal(true);
        setShowNotifications(false);
      }
    } else if (notif.type === 'technician_approved') {
      // Just show the approval message, don't navigate
      setShowNotifications(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Sidel</div>
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
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
            </>
          ) : (
            <div className="header-right">
              {/* Notification Button */}
              <div className="notification-menu">
                  <button
                    className="btn btn-notification"
                    onClick={toggleNotifications}
                    title="Notifications">
                    <Bell size={20} />
                    {hasUnread && <span className="notification-badge"></span>}
                  </button>
                  {showNotifications && (
                    <div className="notifications-dropdown">
                      <div className="notifications-header">
                        <h3>Notifications</h3>
                        {notifications.length > 0 && (
                          <button className="clear-all-btn" onClick={clearAllNotifications}>
                            Clear All
                          </button>
                        )}
                      </div>
                      <div className="notifications-list">
                        {notifications.length === 0 ? (
                          <div className="empty-notifications">
                            <p>No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div 
                              key={notif.id} 
                              className="notification-item"
                              onClick={() => handleNotificationClick(notif)}
                            >
                              <div className="notification-content">
                                <p className="notification-text">{notif.message}</p>
                                <span className="notification-time">
                                  {new Date(notif.timestamp).toLocaleDateString()}
                                </span>
                              </div>
                              <button
                                className="notification-close"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  clearNotification(notif.id);
                                }}>
                                <X size={16} />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Profile Button */}
              <div className="profile-menu">
                  <button
                    className="btn btn-profile"
                    onClick={toggleDropdown}
                    title={`Profile (${userName})`}>
                    {userName.charAt(0).toUpperCase()}
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <button
                        className="dropdown-item"
                        onClick={handleProviderClick}>
                        Provider
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setShowDropdown(false);
                          navigate('/profile');
                        }}>
                        Personal Information
                      </button>
                      <button
                        className="dropdown-item logout"
                        onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
            </div>
          )}
        </div>
        </header>

      {/* Technician Confirmation Modal */}
      {showTechnicianModal && (
        <div className="modal-overlay" onClick={handleCloseTechnicianModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{technicianStatus === 'pending' ? 'Registration Under Review' : 'Become a Technician'}</h2>
            </div>
            <div className="modal-body">
              {technicianStatus === 'pending' ? (
                <p className="modal-message">
                  Your registration is under review. You will get notified once the admin approved it. Thank you!
                </p>
              ) : (
                <p className="modal-message">
                  Are you sure you want to become a technician? By confirming, you'll be able to register as a service provider and start offering your services on our platform.
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-exit" onClick={handleCloseTechnicianModal}>
                {technicianStatus === 'pending' ? 'Close' : 'Exit'}
              </button>
              {technicianStatus !== 'pending' && (
                <button className="btn-confirm" onClick={handleConfirmTechnician}>
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Booking Status Modal */}
      {showBookingModal && selectedBooking && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Booking Status</h2>
              <button className="modal-close" onClick={() => setShowBookingModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="booking-detail-section">
                <h3>Service Details</h3>
                <div className="detail-row">
                  <span className="detail-label">Device Type:</span>
                  <span className="detail-value">{selectedBooking.gadgetType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Brand:</span>
                  <span className="detail-value">{selectedBooking.brand}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Model:</span>
                  <span className="detail-value">{selectedBooking.model}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Issue:</span>
                  <span className="detail-value">{selectedBooking.issueDescription}</span>
                </div>
              </div>
              
              <div className="booking-detail-section">
                <h3>Booking Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Requested Date:</span>
                  <span className="detail-value">{selectedBooking.requestedServiceDate}</span>
                </div>
                {selectedBooking.actualServiceDate && (
                  <div className="detail-row">
                    <span className="detail-label">Scheduled Date:</span>
                    <span className="detail-value">{selectedBooking.actualServiceDate}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge status-${selectedBooking.status}`}>
                    {selectedBooking.status === 'pending' && 'Pending'}
                    {selectedBooking.status === 'in_progress' && 'In Progress'}
                    {selectedBooking.status === 'completed' && 'Completed'}
                    {selectedBooking.status === 'cancelled' && 'Cancelled'}
                  </span>
                </div>
              </div>
              
              <div className="booking-detail-section">
                <h3>Provider Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Provider Email:</span>
                  <span className="detail-value">{selectedBooking.providerEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;