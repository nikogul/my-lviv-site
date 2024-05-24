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

module.exports = router;
