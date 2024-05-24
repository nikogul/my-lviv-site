const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Додайте цей рядок
const connectDB = require('./config');
const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const reviewRoutes = require('./routes/review');

const app = express();
const port = 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors()); // Додайте цей рядок

app.use('/api/users', userRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
