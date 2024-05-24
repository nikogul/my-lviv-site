const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Add user reference
});


module.exports = mongoose.model('Place', placeSchema);
