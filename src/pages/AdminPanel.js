// src/pages/AdminPanel.js

import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/AdminPanel.css';

function AdminPanel() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/places', {
        name,
        description,
        tags: tags.split(',').map(tag => tag.trim()),
        location: location.split(',').map(coord => parseFloat(coord.trim())),
        imageUrl,
      });
      console.log('Place added:', response.data);
      // Clear the form
      setName('');
      setDescription('');
      setTags('');
      setLocation('');
      setImageUrl('');
    } catch (error) {
      console.error('Failed to add place:', error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Адмін-панель</h1>
      <p>Тут ви можете керувати сайтом, опрацьовувати заявки на публікацію тощо.</p>
      <div className="requests-list">
        <h2>Заявки на публікацію</h2>
        {/* Тут будуть відображатися заявки на публікацію */}
      </div>
      <div className="add-place-form">
        <h2>Додати нове місце</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Назва:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Опис:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Теги (через кому):</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Координати (через кому):</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>URL зображення:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit">Додати місце</button>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
