// LoginForm.js
import React, { useState } from 'react';
import './FormStyles.css';

const LoginForm = ({ onLogin, registeredUsers }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const user = registeredUsers.find((u) => u.username === loginData.username);

    if (user) {
      if (user.password === loginData.password) {
        setError('');
        // Call the parent component's login handler
        onLogin(loginData);
        // Clear the form after login
        setLoginData({
          username: '',
          password: '',
        });
      } else {
        setError('Invalid password. Please try again.');
      }
    } else {
      setError('Invalid username. Please check your username.');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginForm;
