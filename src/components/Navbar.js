// File: src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Navbar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  useEffect(() => {
    // Очищення пошукового запиту і результатів після зміни локації
    setSearchQuery('');
    setSearchResults([]);
  }, [location]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(`http://localhost:5000/api/places/search?q=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const isProfilePage = location.pathname === '/profile';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Цікавинка
        </Link>
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Пошук..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" type="submit">
            <span className="search-icon">🔍</span>
          </button>
        </form>
        {!isProfilePage && (
          <div className="navbar-actions">
            <button className="auth-button" onClick={handleProfileClick}>
              {isAuthenticated ? 'Профіль' : 'Авторизація'}
            </button>
          </div>
        )}
      </div>
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map(result => (
            <Link
              key={result._id}
              to={`/places/${result._id}`}
              className="search-result-item"
              onClick={() => {
                // Очищення пошуку при кліку на результат
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
              {result.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
