// src/components/Navbar.js

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Navbar.css';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const searchInputRef = useRef(null);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsActive(false);
    }
  };

  return (
    <nav className={`navbar ${isActive ? 'active' : ''}`} onBlur={handleBlur}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Цікавинка
        </Link>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Пошук..."
            onFocus={handleFocus}
            ref={searchInputRef}
          />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
