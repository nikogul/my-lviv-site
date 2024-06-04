// File: src/pages/AdminPanel.js

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import '../assets/css/AdminPanel.css';
import 'leaflet/dist/leaflet.css';

// Виправлення шляху до іконок маркерів
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const availableTags = ['кафе', 'ресторан', 'клуб', 'видатне місце'];

function LocationSelector({ onLocationChange }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(event) {
      setPosition(event.latlng);
      onLocationChange([event.latlng.lat, event.latlng.lng]);
    }
  });

  return position === null ? null : (
    <Marker position={position} />
  );
}

function AdminPanel() {
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [location, setLocation] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleTagChange = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/places', {
        name,
        description: shortDescription,
        fullDescription,
        tags: selectedTags,
        location,
        imageUrl,
      });
      console.log('Place added:', response.data);
      // Clear the form
      setName('');
      setShortDescription('');
      setFullDescription('');
      setSelectedTags([]);
      setLocation(null);
      setImageUrl('');
    } catch (error) {
      console.error('Failed to add place:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Адмін-панель</h1>
      <p>Тут ви можете керувати сайтом, опрацьовувати нові місця.</p>
      <div className="add-place-form">
        <h2>Додати нове місце</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Назва:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Короткий опис:</label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Повний опис:</label>
            <textarea
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Теги:</label>
            <div className="tags-checkboxes">
              {availableTags.map((tag) => (
                <label key={tag} className="tag-checkbox">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Виберіть розташування на мапі:</label>
            <MapContainer
              center={[49.8397, 24.0297]}
              zoom={13}
              scrollWheelZoom={true} // Увімкнення приближення/віддалення роликом миші
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationSelector onLocationChange={handleLocationChange} />
            </MapContainer>
          </div>
          <div className="form-group">
            <label>URL зображення:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">Додати місце</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
