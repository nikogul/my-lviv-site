const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Імпорт middleware

// Реєстрація користувача
router.post('/register', async (req, res) => {
  const { username, password, displayName } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Цей псевдонім вже зайнятий' });
    }

    // Хешуйте пароль перед збереженням
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword, displayName });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Не вдалося зареєструвати користувача' });
  }
});

// Логін користувача
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Невірні дані для входу' });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Невірні дані для входу' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error during user login:', error.message);
    res.status(400).json({ error: 'Не вдалося увійти', details: error.message });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('savedPlaces');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Не вдалося отримати профіль' });
  }
});

module.exports = router;
