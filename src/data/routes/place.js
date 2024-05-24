// File: src/data/routes/place.js

const express = require('express');
const Place = require('../models/Place');
const router = express.Router();

// Отримати всі місця
router.get('/', async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch places' });
  }
});

// Отримати окреме місце
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch place' });
  }
});

// Додати нове місце
router.post('/', async (req, res) => {
  const { name, description, tags, location, imageUrl } = req.body;
  try {
    const newPlace = new Place({ name, description, tags, location, imageUrl });
    await newPlace.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add place' });
  }
});

router.post('/saved', async (req, res) => {
  const { placeIds } = req.body;
  try {
    const places = await Place.find({ _id: { $in: placeIds } });
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch saved places' });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const places = await Place.find({ user: userId });
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch user places' });
  }
});

module.exports = router;
