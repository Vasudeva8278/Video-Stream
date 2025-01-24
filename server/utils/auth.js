const jwt = require('jsonwebtoken');

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header

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

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) { // Check for `isAdmin` property
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = { authenticateUser, isAdmin };






