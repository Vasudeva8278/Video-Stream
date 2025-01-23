const express = require('express');
const passport = require('passport');
const { signup, login } = require('../controllers/authController');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard');
});


router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
