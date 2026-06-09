import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import './Registration.css';
import { useNavigate } from 'react-router-dom';

function Registration() {

    const [name, setName] = useState('');  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('User');

    const handleRegistration = async (event) => {
        event.preventDefault();

        const user = { name, username, password };
        const endpoint = role === 'Manager' ? 'http://localhost:9001/manager/register' : 'http://localhost:9001/user/register';
    
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
          });
    
          if (response.ok) {
            alert('Registration successful!');
            navigate('/login');
          } else {
            const errorText = await response.text();
            setErrorMessage(`Registration failed: ${errorText}`);
          }
        } catch (error) {
          setErrorMessage(`An error occurred: ${error.message}`);
        }
      };

  return (
    <Layout>
          <div className="registration-container">
      <div className="registration-form">
        <h2>Registration</h2>
        <form onSubmit={handleRegistration}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </Layout>
  );  
}

export default Registration;