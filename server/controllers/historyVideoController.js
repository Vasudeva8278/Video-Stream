const HistoryVideo = require('../models/HistoryVideo');

// Controller to get all history videos
const getHistoryVideos = async (req, res) => {
  try {
    const historyVideos = await HistoryVideo.find().populate('user', 'username'); // Populating user with their username
    res.status(200).json({ historyVideos });
  } catch (error) {
    console.error('Error fetching history videos:', error.message);
    res.status(500).json({ message: 'Error fetching history videos' });
  }
};

// Controller to add a new history video
const addHistoryVideo = async (req, res) => {
  try {
    const { title, description, source, thumbnail } = req.body;
    
    if (!title || !description || !source || !thumbnail) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newHistoryVideo = new HistoryVideo({
      user: req.user.id, // User is populated via JWT token
      title,
      description,
      source,
      thumbnail,
    });

    await newHistoryVideo.save();
    res.status(201).json({ message: 'History video added successfully', video: newHistoryVideo });
  } catch (error) {
    console.error('Error adding history video:', error.message);
    res.status(500).json({ message: 'Error adding history video' });
  }
};

module.exports = {
  getHistoryVideos,
  addHistoryVideo,
};
