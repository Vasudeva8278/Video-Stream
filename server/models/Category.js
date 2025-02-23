const mongoose = require('mongoose');

const videoCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  sources: [{ type: String, required: true }],
  subtitle: { type: String, required: true },
  thumb: { type: String, required: true },
  category: { type: String, required: true, unique: true },
  genre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VideoCategory', videoCategorySchema);
