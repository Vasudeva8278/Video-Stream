const express = require('express');
const router = express.Router();
const videoCategoryController = require('../controllers/videoCategoryController');

// Create a new video category
router.post('/videoCategory', videoCategoryController.createVideoCategory);

// Get all video categories
router.get('/videoCategories', videoCategoryController.getAllVideoCategories);

// Get a video category by ID
router.get('/videoCategory/:id', videoCategoryController.getVideoCategoryById);

// Update a video category by ID
router.put('/videoCategory/:id', videoCategoryController.updateVideoCategory);

// Delete a video category by ID
router.delete('/videoCategory/:id', videoCategoryController.deleteVideoCategory);

module.exports = router;
