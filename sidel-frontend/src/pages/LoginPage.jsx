import React from 'react';
import './LoginPage.css';

export default function LoginPage() {
  const handleGoogle = () => {
    // Placeholder: wire to OAuth later
    alert('Google auth clicked');
  };

  const handleEmail = () => {
    // Placeholder: wire to email sign in later
    alert('Email sign-in clicked');
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-logo">logo</div>
        <h1 className="login-title">Choose a way to sign up</h1>
        <p className="login-subtext">
          By continuing to use this app you agree to our <a href="#">Privacy Policy</a>.
        </p>

        <button className="btn social-btn" onClick={handleGoogle}>
          <span className="google-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.7S8.9 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.8 3.5 14.6 2.6 12 2.6 6.9 2.6 2.7 6.8 2.7 12s4.2 9.4 9.3 9.4c5.4 0 8.9-3.8 8.9-9.2 0-.6-.1-1-.2-1.5H12z"/>
            </svg>
          </span>
          Continue with Google
        </button>

        <div className="separator">
          <span>or</span>
        </div>

        <button className="btn email-btn" onClick={handleEmail}>Continue with email</button>

        <p className="login-footer">
          Already have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
