const mongoose = require('mongoose');

// Schema for video category
const videoCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sources: [{ type: String, required: true }],
  subtitle: { type: String, required: true },
  thumb: { type: String, required: true },
  category: { type: String, required: true }, // Allow duplicates in category
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure that no unique index is applied to `category`
videoCategorySchema.index({ category: 1 }, { unique: false });

module.exports = mongoose.model('VideoCategory', videoCategorySchema);
