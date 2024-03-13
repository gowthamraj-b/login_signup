// WelcomePage.js
import React from 'react';
import './FormStyles.css';

const WelcomePage = ({ user, onLogout }) => {
  return (
    <div className="welcome-container">
      <h2>Welcome, {user.username}!</h2>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default WelcomePage;
