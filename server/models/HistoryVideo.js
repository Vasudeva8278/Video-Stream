// models/HistoryVideo.js
const mongoose = require('mongoose');

const historyVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true, // Single source instead of an array
    },
    thumbnail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('HistoryVideo', historyVideoSchema);
