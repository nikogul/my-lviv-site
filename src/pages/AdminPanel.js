// src/pages/AdminPanel.js

import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/AdminPanel.css';

function AdminPanel() {
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/places', {
        name,
        description: shortDescription,
        fullDescription,
        tags: tags.split(',').map(tag => tag.trim()),
        location: location.split(',').map(coord => parseFloat(coord.trim())),
        imageUrl,
      });
      console.log('Place added:', response.data);
      // Clear the form
      setName('');
      setShortDescription('');
      setFullDescription('');
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
            <label>Теги (через кому):</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Координати (через кому):</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
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
