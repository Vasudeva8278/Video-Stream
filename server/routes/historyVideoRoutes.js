const express = require('express');
const jwt = require('jsonwebtoken');
const { getHistoryVideos, addHistoryVideo } = require('../controllers/historyVideoController');
const router = express.Router();

// Authentication middleware to verify JWT token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    
    req.user = decoded; // Attach decoded user data to the request
    next();
  });
};

// Route to get all history videos (No JWT required)
router.get('/videos', getHistoryVideos);

// Route to add a new history video (JWT required)
router.post('/videos', authenticate, addHistoryVideo);

module.exports = router;
