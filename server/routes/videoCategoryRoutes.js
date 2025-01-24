const express = require('express');
const router = express.Router();
const videoCategoryController = require('../controllers/videoCategoryController');
const { authenticateUser, isAdmin } = require('../utils/auth');  // Import middlewares

// Routes
router.post('/categories', authenticateUser, videoCategoryController.createVideoCategory);
router.get('/categories', authenticateUser, videoCategoryController.getAllVideoCategories);
router.get('/categories/:id', authenticateUser, videoCategoryController.getVideoCategoryById);
router.put('/categories/:id', authenticateUser, isAdmin, videoCategoryController.updateVideoCategory);
router.delete('/categories/:id', authenticateUser, isAdmin, videoCategoryController.deleteVideoCategory);

module.exports = router;
