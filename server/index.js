require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors'); // Added for handling CORS
const videoCategoryRoutes = require('./routes/videoCategoryRoutes');
// Import Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const historyVideoRoutes = require('./routes/historyVideoRoutes');
// Initialize the app
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests (if needed for your app)
app.use(express.json()); // Parse JSON request bodies

// Setup session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secure session with a secret key
    resave: false,
    saveUninitialized: false,
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/auth', authRoutes);
app.use('/category', categoryRoutes);
app.use('/api', videoCategoryRoutes);
app.use('/history', historyVideoRoutes);

// MongoDB connection and server startup
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Start server after successful DB connection
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Initiate database connection and start the server
connectToDatabase();
