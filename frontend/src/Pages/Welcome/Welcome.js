import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import './Welcome.css';
import { useAuth } from '../../Context/AuthContext';

function Welcome() {
  const { isAuthenticated, isRole } = useAuth();
  const [userDTO, setUserDTO] = useState(null);
  const [error, setError] = useState(null);
  const endpoint = isRole === 'Manager' || isRole === 'ROLE_MANAGER' ? 'http://localhost:9001/manager/info' : 'http://localhost:9001/user/info';

  useEffect(() => {
      fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setUserDTO(data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [isRole, isAuthenticated, endpoint]);

  return (
    <Layout>
      <div className="welcome-container">
        <h1>Welcome!</h1>
        {error ? (
          <div className="error-message">Error: {error}</div>
        ) : userDTO ? (
          <div>
            <p>Name: {userDTO.name}</p>
            <p>Username: {userDTO.username}</p>
            <p>Role: {userDTO.roles.join(', ')}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}

        {(isRole === 'ROLE_MANAGER' || isRole === 'Manager') && (
          <Link to="/restricted" className="restricted-link">
            Restricted Access
          </Link>
        )}
      </div>
    </Layout>
  );
}

export default Welcome;