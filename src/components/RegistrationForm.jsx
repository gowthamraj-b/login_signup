// RegistrationForm.js
import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const RegistrationForm = ({ onRegistration , onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name : '',
    email : '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve previously registered users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setRegisteredUsers(storedUsers);
  }, []);

  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistration = () => {
    // Check for duplicate username
    const isDuplicate = registeredUsers.some((user) => user.username === formData.username);

    if (isDuplicate) {
      setError('Username already exists. Please choose a different one.');
    } else {
      setError('');
      // Call the parent component's registration handler
      onRegistration(formData);
      // Update the registered users array and store it in local storage
      const updatedUsers = [...registeredUsers, formData];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      // Clear the form after registration
      setFormData({
        name : '',
        email : '',
        username: '',
        password: '',
      });
      onSwitchToLogin();
    }
  };

  

  // const exportRegisteredUsers = () => {
  //   const dataString = JSON.stringify(registeredUsers, null, 2);

  //   const blob = new Blob([dataString], { type: 'application/json' });
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = 'registered_users.json';
  //   link.click();
  // };

  return (
    <div className="form-container">
      <h2>Registration </h2>
      {error && <p className="error-message">{error}</p>}

      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
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
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="button" onClick={handleRegistration} >
        Register
      </button>
      <br />
      {/* <button type="buttonex" onClick={exportRegisteredUsers}>
        Export Registered Users
      </button> */}
      
    </div>
  );
};

export default RegistrationForm;
