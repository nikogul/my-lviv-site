import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/Auth.css';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      } catch (error) {
        setError('Невірні дані для входу');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', { username, password, displayName });
        localStorage.setItem('token', response.data.token);
        navigate('/profile');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError(error.response.data.error || 'Не вдалося зареєструвати користувача');
        } else {
          setError('Не вдалося зареєструвати користувача');
        }
      }
    }
  };

  return (
    <div className="auth">
      <h1>{isLogin ? 'Вхід' : 'Реєстрація'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Відображуване ім'я"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Увійти' : 'Зареєструватися'}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button className="toggle-button" onClick={toggleMode}>
        {isLogin ? 'Зареєструйтесь' : 'Увійти'}
      </button>
    </div>
  );
}

export default Auth;
