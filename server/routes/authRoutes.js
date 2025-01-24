const express = require('express');
const { signup, login } = require('../controllers/authController'); // Correct import
const router = express.Router();

router.post('/signup', signup); // Using signup function
router.post('/login', login); // Using login function

module.exports = router;
