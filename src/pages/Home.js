// src/pages/Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Home.css';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/places'); // Переход до сторінки зі списком місць
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>Цікавинка</h1>
        <p>Досліджуйте найкращі місця у місті Лева!</p>
      </header>
      <section className="intro">
        <p>Наш сайт допоможе вам знайти цікаві, корисні та видатні місця у Львові. Натисніть кнопку нижче, щоб розпочати свою подорож.</p>
        <button className="explore-button" onClick={handleButtonClick}>
          Переглянути місця
        </button>
      </section>
    </div>
  );
}

export default Home;
