// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© 2024 Цікавинка. Всі права захищені.</p>
        <p>
          <Link to="/privacy-policy">Політика конфіденційності</Link> | 
          <Link to="/terms-of-service">Умови користування</Link> | 
          <Link to="/admin">Адмін панель</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
