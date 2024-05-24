// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Home.css';

function Home() {
  const [displayName, setDisplayName] = useState('незнайомець');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setDisplayName(response.data.displayName);
      })
      .catch(error => {
        console.error('Failed to fetch user profile', error);
        localStorage.removeItem('token'); // Видалити токен, якщо профіль не знайдено
        navigate('/auth'); // Перенаправити на сторінку авторизації
      });
    }
  }, [navigate]);

  return (
    <div className="home">
      <div className="home-content">
        <h1>Вітаю, {displayName}!</h1>
        <p>Ласкаво просимо до сайту "Цікавинка".</p>
        <p>Знайдіть найцікавіші та найвидатніші місця у Львові!</p>
        <button className="travel-button" onClick={() => navigate('/places')}>
          У подорож!
        </button>
      </div>
    </div>
  );
}

export default Home;
