const express = require('express');
const User = require('../models/user');
const router = express.Router();

const { getUserById, getAllUsers, addUser } = User;

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Add a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await addUser(username, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
