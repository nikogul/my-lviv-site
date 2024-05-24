// src/pages/Places.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Places.css';

const tags = ['всі', 'кафе', 'ресторан', 'клуб', 'видатне місце'];

const tagColors = {
  кафе: '#FFCDD2',
  ресторан: '#C8E6C9',
  клуб: '#BBDEFB',
  'видатне місце': '#FFF9C4'
};

function Places() {
  const [selectedTag, setSelectedTag] = useState('всі');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/places');
        setPlaces(response.data);
      } catch (error) {
        console.error('Failed to fetch places:', error);
      }
    };

    fetchPlaces();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const filteredPlaces = selectedTag === 'всі' 
    ? places 
    : places.filter(place => place.tags.includes(selectedTag));

  return (
    <div className="places">
      <div className="places-header">
        <h1>Цікаві місця у Львові</h1>
      </div>
      <div className="places-content">
        <section className="places-list">
          {filteredPlaces.map(place => (
            <Link to={`/places/${place._id}`} key={place._id} className="place-card-link">
              <div className="place-card">
                <div className="place-image" style={{ backgroundImage: place.imageUrl ? `url(${place.imageUrl})` : 'none', backgroundColor: place.imageUrl ? 'transparent' : '#87BCDE' }}>
                  {!place.imageUrl && <p>Фото відсутнє</p>}
                </div>
                <div className="place-info">
                  <h2>{place.name}</h2>
                  <p>{place.description}</p>
                  <div className="place-tags">
                    {place.tags.map((tag, index) => (
                      <span key={index} className="place-tag" style={{ backgroundColor: tagColors[tag] }}>{tag}</span>
                    ))}
                  </div>
                  <div className="place-rating">
                    Рейтинг: {place.rating} ⭐
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </section>
        <aside className="places-filters">
          {tags.map((tag, index) => (
            <button 
              key={index} 
              className={`tag ${selectedTag === tag ? 'active' : ''}`} 
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default Places;
