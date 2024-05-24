// src/components/Footer.js

import React from 'react';
import '../assets/css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© 2024 Цікавинка. Всі права захищені.</p>
        <p>
          <a href="/privacy-policy">Політика конфіденційності</a> | <a href="/terms-of-service">Умови користування</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
