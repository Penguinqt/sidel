import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X } from 'lucide-react';
import '../Style/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [technicianStatus, setTechnicianStatus] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

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
    }
  }, []);

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
    // Check if user is approved
    if (technicianStatus === 'approved') {
      // Get the provider data and set as logged provider
      const providers = JSON.parse(localStorage.getItem('providers')) || [];
      const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
      const userProvider = providers.find(p => p.email === loggedUser.email);
      if (userProvider) {
        localStorage.setItem('loggedProvider', JSON.stringify(userProvider));
        navigate('/provider/page');
      }
    } else {
      // Show modal for pending or new registration
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

  return (
    <>
      <header className="header">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>logo</div>
        <nav className="nav">
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
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
                      </div>
                      <div className="notifications-list">
                        {notifications.length === 0 ? (
                          <div className="empty-notifications">
                            <p>No notifications yet</p>
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
        </nav>
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
    </>
  );
};

export default Header;