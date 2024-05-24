// src/pages/Place.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import '../assets/css/Place.css';
import 'leaflet/dist/leaflet.css';

const tagColors = {
  кафе: '#FFCDD2',
  ресторан: '#C8E6C9',
  клуб: '#BBDEFB',
  'видатне місце': '#FFF9C4'
};

function Place() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/places/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error('Failed to fetch place:', error);
      }
    };

    fetchPlace();
  }, [id]);

  if (!place) {
    return <div>Місце не знайдено</div>;
  }

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    // Обробка додавання нового відгуку
    try {
      const response = await axios.post('http://localhost:5000/api/reviews', {
        placeId: place._id,
        userId: "поточний_користувач_id", // замініть на реальне значення
        comment: newReview,
        rating: newRating,
      });
      setPlace({
        ...place,
        reviews: [...place.reviews, response.data]
      });
      setNewReview('');
      setNewRating(0);
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <div className="place">
      <header className="place-header">
        {place.imageUrl ? (
          <img src={place.imageUrl} alt={place.name} className="place-image" />
        ) : (
          <div className="place-image-placeholder">
            <p>Фото відсутнє</p>
          </div>
        )}
        <h1>{place.name}</h1>
      </header>
      <section className="place-summary">
        <p>{place.description}</p>
        <div className="place-tags">
          {place.tags.map((tag, index) => (
            <span key={index} className="place-tag" style={{ backgroundColor: tagColors[tag] }}>{tag}</span>
          ))}
        </div>
        <div className="place-rating">
          Рейтинг: {place.rating} ⭐
        </div>
      </section>
      <section className="place-details">
        <h2>Повний опис</h2>
        <p>{place.fullDescription || 'Немає детальної інформації'}</p>
      </section>
      <section className="place-map">
        <h2>Розташування</h2>
        <MapContainer center={place.location} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={place.location}>
            <Popup>
              {place.name}
            </Popup>
          </Marker>
        </MapContainer>
      </section>
      <section className="place-reviews">
        <h2>Відгуки</h2>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <textarea 
            value={newReview} 
            onChange={(e) => setNewReview(e.target.value)} 
            placeholder="Напишіть свій відгук" 
            required
          />
          <select value={newRating} onChange={(e) => setNewRating(e.target.value)} required>
            <option value="0" disabled>Оберіть рейтинг</option>
            {[...Array(10).keys()].map(num => (
              <option key={num+1} value={num+1}>{num+1}</option>
            ))}
          </select>
          <button type="submit">Додати відгук</button>
        </form>
        {place.reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.user}:</strong> {review.comment} - {review.rating} ⭐</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Place;
