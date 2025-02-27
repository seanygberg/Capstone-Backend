const express = require('express');
const { login, register, logout } = require('../middleware/auth');
const router = express.Router();

// POST route to register a new user
router.post('/register', register);

// POST route to log in
router.post('/login', login);

// POST route to log out
router.post('/logout', logout);

module.exports = router;