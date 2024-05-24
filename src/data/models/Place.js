// File: src/data/models/Place.js

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fullDescription: String, // Додати це поле
  tags: [String],
  rating: Number,
  location: { type: [Number], required: true },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      rating: Number,
    },
  ],
  imageUrl: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Додати посилання на користувача
});

module.exports = mongoose.model('Place', placeSchema);
