const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Отримати токен з заголовків запиту
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Необхідно авторизуватися' });
  }

  try {
    // Перевірити і розшифрувати токен
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded; // Зберегти інформацію про користувача в запиті
    next(); // Передати управління наступному middleware або роуту
  } catch (error) {
    res.status(401).json({ error: 'Неправильний або прострочений токен' });
  }
};

module.exports = authMiddleware;
