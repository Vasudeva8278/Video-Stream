// routes/historyVideoRoutes.js
const express = require('express');
const {
  getAllHistoryVideos,
  getHistoryVideoById,
  createHistoryVideo,
  updateHistoryVideo,
  deleteHistoryVideo,
} = require('../controllers/historyVideoController');

const router = express.Router();

// Get all history videos
router.get('/', getAllHistoryVideos);

// Get a single history video by ID
router.get('/:id', getHistoryVideoById);

// Create a new history video
router.post('/', createHistoryVideo);

// Update a history video by ID
router.put('/:id', updateHistoryVideo);

// Delete a history video by ID
router.delete('/:id', deleteHistoryVideo);

module.exports = router;
