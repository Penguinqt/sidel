import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Lock, Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Header from './Header';
import '../Style/PersonalInformation.css';

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    if (!user) {
      alert('Please log in first');
      navigate('/login');
      return;
    }
    setLoggedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      address: user.address || ''
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    // Get all users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists for another user
    const emailExists = users.some(u => u.email === formData.email && u.userId !== loggedUser.userId);
    if (emailExists) {
      setMessage({ type: 'error', text: 'Email already exists' });
      return;
    }

    // Update user in users array
    const updatedUsers = users.map(user => 
      user.userId === loggedUser.userId 
        ? { ...user, ...formData }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update logged user
    const updatedLoggedUser = { ...loggedUser, ...formData };
    localStorage.setItem('loggedUser', JSON.stringify(updatedLoggedUser));
    setLoggedUser(updatedLoggedUser);

    // Update provider if exists
    const providers = JSON.parse(localStorage.getItem('providers')) || [];
    const loggedProvider = JSON.parse(localStorage.getItem('loggedProvider'));
    
    if (loggedProvider && loggedProvider.userId === loggedUser.userId) {
      const updatedProviders = providers.map(provider =>
        provider.userId === loggedUser.userId
          ? { ...provider, name: formData.name, email: formData.email }
          : provider
      );
      localStorage.setItem('providers', JSON.stringify(updatedProviders));
      
      const updatedLoggedProvider = { ...loggedProvider, name: formData.name, email: formData.email };
      localStorage.setItem('loggedProvider', JSON.stringify(updatedLoggedProvider));
    }

    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    // Validate password fields
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Please fill in all password fields' });
      return;
    }

    // Check if current password matches
    if (passwordData.currentPassword !== loggedUser.password) {
      setMessage({ type: 'error', text: 'Current password is incorrect' });
      return;
    }

    // Check if new password matches confirm password
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    // Check password strength
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    // Update password in users array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user =>
      user.userId === loggedUser.userId
        ? { ...user, password: passwordData.newPassword }
        : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Update logged user
    const updatedLoggedUser = { ...loggedUser, password: passwordData.newPassword };
    localStorage.setItem('loggedUser', JSON.stringify(updatedLoggedUser));
    setLoggedUser(updatedLoggedUser);

    // Clear password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    setMessage({ type: 'success', text: 'Password changed successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (!loggedUser) return null;

  return (
    <>
      <Header />
      <div className="personal-info-container">
        <div className="personal-info-content">
          <div className="page-header">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h1>Personal Information</h1>
            <p>Manage your account details and security settings</p>
          </div>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Profile Information Section */}
          <div className="info-section">
            <div className="section-header">
              <User size={24} />
              <h2>Profile Information</h2>
            </div>
            <form onSubmit={handleUpdateProfile} className="info-form">
              <div className="form-group">
                <label>
                  <User size={18} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Mail size={18} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <Phone size={18} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <MapPin size={18} />
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  rows="3"
                />
              </div>

              <button type="submit" className="save-btn">
                <Save size={20} />
                Save Changes
              </button>
            </form>
          </div>

          {/* Password Change Section */}
          <div className="info-section">
            <div className="section-header">
              <Lock size={24} />
              <h2>Change Password</h2>
            </div>
            <form onSubmit={handleChangePassword} className="info-form">
              <div className="form-group">
                <label>
                  <Lock size={18} />
                  Current Password *
                </label>
                <div className="password-input">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Lock size={18} />
                  New Password *
                </label>
                <div className="password-input">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Lock size={18} />
                  Confirm New Password *
                </label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="save-btn password-btn">
                <Lock size={20} />
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
