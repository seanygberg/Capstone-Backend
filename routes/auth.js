const express = require('express');
const { login, signup } = require('../middleware/auth');
const router = express.Router();

// POST route to register a new user
router.post('/signup', signup);

// POST route to log in
router.post('/login', login);


module.exports = router;