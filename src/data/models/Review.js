const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model('Review', reviewSchema);
