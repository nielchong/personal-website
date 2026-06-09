import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../Components/Layout';
import './Login.css';
import { useAuth } from '../../Context/AuthContext';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('User');
    const { login } = useAuth();
    const endpoint = role === 'Manager' ? 'http://localhost:9001/manager/login' : 'http://localhost:9001/user/login';

    const handleLogin = async (event) => {
        event.preventDefault();
    
        const loginData = new URLSearchParams();
        loginData.append('username', username);
        loginData.append('password', password);
    
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'include',
            body: loginData.toString(),
          });
    
          if (response.ok) {
            login(role);
            alert(`Login successful! Logged in as ${role}.`);
            navigate('/welcome');
          } 
          
          else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
          }
        } catch (error) {
          console.error('Error during login:', error);
          setErrorMessage('An unexpected error occurred.');
        }
      };

    return (
        <Layout>
            <div className="login-container">
                <div className="login-form">
                    <h2>Login</h2>
                        <form onSubmit={handleLogin}>
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
            {errorMessage && <p>{errorMessage}</p>}
            <button type="submit">Login</button>
          </form>
          <Link to="/register" className="register-link">
             Don't have an account? Register here.
          </Link>
        </div>
      </div>
       </Layout>
    );  
}

export default Login;