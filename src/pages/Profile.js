import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfile(response.data);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="profile">
      <h1>Мій профіль</h1>
      <p>Логін: {profile.username}</p>
      <p>Відображуване ім'я: {profile.displayName}</p>
      {/* Тут можна додати інші елементи профілю */}
    </div>
  );
}

export default Profile;
