// controllers/historyVideoController.js
const HistoryVideo = require('../models/HistoryVideo');

// Get all history videos
exports.getAllHistoryVideos = async (req, res) => {
  try {
    const videos = await HistoryVideo.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history videos' });
  }
};

// Get a single history video by ID
exports.getHistoryVideoById = async (req, res) => {
  try {
    const video = await HistoryVideo.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the video' });
  }
};

// Create a new history video
exports.createHistoryVideo = async (req, res) => {
  try {
    const video = new HistoryVideo(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the video' });
  }
};

// Update a history video by ID
exports.updateHistoryVideo = async (req, res) => {
  try {
    const video = await HistoryVideo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the video' });
  }
};

// Delete a history video by ID
exports.deleteHistoryVideo = async (req, res) => {
  try {
    const video = await HistoryVideo.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the video' });
  }
};
