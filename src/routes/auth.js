// backend/src/routes/auth.js
const express = require('express');
const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const router = express.Router();

// POST /auth/register
router.post('/register', register);

// GET  /auth/verify/:token
router.get('/verify/:token', verifyEmail);

// POST /auth/login
router.post('/login', login);

// POST /auth/forgot
router.post('/forgot', forgotPassword);

// POST /auth/reset/:token
router.post('/reset/:token', resetPassword);

module.exports = router;
