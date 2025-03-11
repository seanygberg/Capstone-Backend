const express = require('express');
const User = require('../models/user');
const router = express.Router();
const {authenticateToken} = require('../helpers/tokens')
const jwt = require('jsonwebtoken');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.getAllUsers();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.addUser(username, email, password);
    res.status(201).json({ 
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Get user by username
router.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch user from the database using the username
    const user = await User.getUserByName(username);  // Adjust based on your ORM or query method

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user data as response
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      // Add other fields you want to send back
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

module.exports = router;