import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [myPlaces, setMyPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(response.data);
          fetchSavedPlaces(response.data.savedPlaces);
          fetchMyPlaces(response.data._id);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      } else {
        navigate('/auth');
      }
    };

    const fetchSavedPlaces = async (placeIds) => {
      try {
        const response = await axios.post('http://localhost:5000/api/places/saved', { placeIds });
        setSavedPlaces(response.data);
      } catch (error) {
        console.error('Failed to fetch saved places:', error);
      }
    };

    const fetchMyPlaces = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/places/user/${userId}`);
        setMyPlaces(response.data);
      } catch (error) {
        console.error('Failed to fetch my places:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  if (!profile) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Ваш профіль, {profile.displayName}</h1>
        <div className="profile-actions">
          <button className="profile-button" onClick={() => navigate('/settings')}>
            Налаштування
          </button>
          <button className="profile-button" onClick={handleLogout}>
            Вийти
          </button>
        </div>
      </div>
      <div className="places-section">
        <h2>Збережено</h2>
        <div className="places-container">
          {savedPlaces.length > 0 ? (
            savedPlaces.map((place) => (
              <div key={place._id} className="place-card">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            ))
          ) : (
            <p>Збережених місць немає</p>
          )}
        </div>
      </div>
      <div className="places-section">
        <h2>Мої місця</h2>
        <div className="places-container">
          {myPlaces.length > 0 ? (
            myPlaces.map((place) => (
              <div key={place._id} className="place-card">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            ))
          ) : (
            <p>Опублікованих місць немає</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
