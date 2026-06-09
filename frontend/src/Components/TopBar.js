import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './TopBar.css';

function TopBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:9001/logout', {
      method: 'POST',
      credentials: 'include',
    });
    logout();
    navigate('/login');
  };

  return (
    <div className="top-bar">
      <div className="name-topbar">
        Niel Chong <span className="space"></span>|<span className="space"></span> Software Developer
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/ahapi">AH API</Link>
        <Link to="/about">About</Link>
        <Link to="/personal">Personal</Link>
        <Link to="/projects">Projects</Link>
        {isAuthenticated ? (
          <a href="/logout" onClick={handleLogout}>Logout</a>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </div>
  );
}

export default TopBar;