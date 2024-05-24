// src/data/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Імпортувати модель User

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Необхідно авторизуватися' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findById(decoded.userId); // Перевірити існування користувача
    if (!user) {
      return res.status(401).json({ error: 'Користувач не знайдений' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Неправильний або прострочений токен' });
  }
};

module.exports = authMiddleware;
