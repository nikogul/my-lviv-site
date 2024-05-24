// File: src/data/routes/review.js

const express = require('express');
const Review = require('../models/Review');
const Place = require('../models/Place');
const router = express.Router();

// Додати новий відгук
router.post('/', async (req, res) => {
  const { placeId, userId, comment, rating } = req.body;
  try {
    const newReview = new Review({ place: placeId, user: userId, comment, rating });
    await newReview.save();
    await Place.findByIdAndUpdate(placeId, { $push: { reviews: newReview._id } });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
