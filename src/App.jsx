// App.js
import React, { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import WelcomePage from './components/WelcomePage';
import './App.css';

const App = () => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formMode, setFormMode] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    // Retrieve previously registered users from local storage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setRegisteredUsers(storedUsers);
  }, []);

  const handleRegistration = (newUser) => {
    // Update the registered users array and store it in local storage
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    console.log('User Registered:', newUser);
    alert('User Registered Successfully');
  };

  const handleLogin = (credentials) => {
    // Simulate user authentication
    const user = registeredUsers.find((u) => u.username === credentials.username && u.password === credentials.password);

    if (user) {
      // Set the logged-in user
      setLoggedInUser(user);
      console.log('User Logged In:', user);
      alert('User Logged In');
    } else {
      console.log('Invalid Credentials');
      alert('Invalid Credentials');
    }
  };

  
  const exportRegisteredUsers = () => {
    const dataString = JSON.stringify(registeredUsers, null, 2);

    const blob = new Blob([dataString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'registered_users.json';
    link.click();
  };


  const switchToLoginAfterRegistration = () => {
    setFormMode('login');
  };
  
  const handleLogout = () => {
    // Clear the logged-in user
    setLoggedInUser(null);
    console.log('User Logged Out');
    alert('User Logged Out');
  };

  const toggleFormMode = () => {
    setFormMode((prevMode) => (prevMode === 'login' ? 'register' : 'login'));
  };

  return (
    <div className="app-container">
      <h1>Registration and Login App</h1>
      {loggedInUser ? (
        <WelcomePage user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <>
          {formMode === 'login' ? (
            <>
              <LoginForm onLogin={handleLogin} registeredUsers={registeredUsers} />
              <p>
                Don't have an account?{' '}
                <button type="button" onClick={toggleFormMode}>
                  Register
                </button>
              </p>
            </>
          ) : (
            <>
              <RegistrationForm onRegistration={handleRegistration} registeredUsers={registeredUsers} onSwitchToLogin={switchToLoginAfterRegistration}/>
              <p>
                Have an account?{' '}
                <button type="button" onClick={toggleFormMode}>
                  Login
                </button>
              </p>
            </>
          )}
        </>
      )}
      <button type="buttonex" onClick={exportRegisteredUsers}>
        Export Registered Users
      </button>
    </div>
    
  );
};

export default App;
