const VideoCategory = require('../models/VideoCategory');
const { isAdmin } = require('../utils/auth'); // Utility function to check admin

// Create a new video category
exports.createVideoCategory = async (req, res) => {
  try {
    const videoCategory = new VideoCategory(req.body);
    await videoCategory.save();
    res.status(201).json(videoCategory);
  } catch (error) {
    console.error("Error creating video category:", error); // Print error to console for debugging
    res.status(400).json({ 
      message: "Error creating video category",
      error: error.message 
    });
  }
};

// Get all video categories
exports.getAllVideoCategories = async (req, res) => {
  try {
    const videoCategories = await VideoCategory.find();
    if (!videoCategories || videoCategories.length === 0) {
      return res.status(404).json({ message: 'No categories found' });
    }
    res.status(200).json(videoCategories);
  } catch (error) {
    console.error("Error fetching video categories:", error); // Print error to console for debugging
    res.status(500).json({ 
      message: "Error fetching video categories",
      error: error.message 
    });
  }
};

// Get a single video category by ID
exports.getVideoCategoryById = async (req, res) => {
  try {
    const videoCategory = await VideoCategory.findById(req.params.id);
    if (!videoCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(videoCategory);
  } catch (error) {
    console.error(`Error fetching video category with ID ${req.params.id}:`, error); // Print error to console for debugging
    res.status(500).json({
      message: `Error fetching video category with ID ${req.params.id}`,
      error: error.message
    });
  }
};


// Update a video category by ID (Admin only)
exports.updateVideoCategory = async (req, res) => {
  try {
    // Verify the token and extract the user data
    const user = req.user; // Assuming `verifyToken` has attached user to `req.user`

    if (!isAdmin(user)) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Find and update the video category by ID with the data from the request body
    const videoCategory = await VideoCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Apply validators during update
    );

    if (!videoCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Return the updated category
    res.status(200).json(videoCategory);
  } catch (error) {
    console.error(`Error updating video category with ID ${req.params.id}:`, error);
    res.status(400).json({
      message: `Error updating video category with ID ${req.params.id}`,
      error: error.message,
    });
  }
};

// Delete a video category by ID (Admin only)
exports.deleteVideoCategory = async (req, res) => {
  try {
    // Verify the token and extract the user data
    const user = req.user; // Assuming `verifyToken` has attached user to `req.user`

    if (!isAdmin(user)) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Find and delete the category by ID
    const videoCategory = await VideoCategory.findByIdAndDelete(req.params.id);
    if (!videoCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(`Error deleting video category with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: `Error deleting video category with ID ${req.params.id}`,
      error: error.message,
    });
  }
};
