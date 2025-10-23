import React from 'react';
import './LoginPage.css';

function GoogleIcon() {
  return (
    <svg
      className="google-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.651 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.964 3.036l5.657-5.657C34.193 6.053 29.326 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.651-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.153 7.964 3.036l5.657-5.657C34.193 6.053 29.326 4 24 4 16.318 4 9.74 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.171 0 9.876-1.977 13.409-5.189l-6.191-5.238C29.21 35.091 26.751 36 24 36c-5.204 0-9.62-3.315-11.283-7.95l-6.51 5.02C9.604 39.556 16.233 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.79 2.227-2.231 4.158-4.085 5.573l.003-.002 6.191 5.238C39.154 35.799 44 30.455 44 24c0-1.341-.138-2.651-.389-3.917z"/>
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <div className="login-card" role="region" aria-labelledby="login-title">
        <div className="login-logo" aria-label="logo">logo</div>

        <h1 id="login-title" className="login-title">Choose a way to sign up</h1>

        <p className="login-subtext">
          By continuing to use this app you agree to our{' '}
          <a href="#" className="link">Privacy Policy</a>.
        </p>

        <button type="button" className="btn btn-google" aria-label="Continue with Google">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>

        <div className="divider" role="separator" aria-label="or">
          <span>or</span>
        </div>

        <button type="button" className="btn btn-email" aria-label="Continue with email">
          <span>Continue with email</span>
        </button>

        <p className="login-footer">
          Already have an account?{' '}
          <a href="#" className="link">Sign up</a>
        </p>
      </div>
    </div>
  );
}
