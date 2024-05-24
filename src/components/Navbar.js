import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/Navbar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Цікавинка
        </Link>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Пошук..."
          />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        <div className="navbar-actions">
          <button className="auth-button" onClick={handleProfileClick}>
            {isAuthenticated ? 'Профіль' : 'Авторизація'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
