const bcrypt = require('bcrypt');
const User  = require('../models/user');
const { createToken } = require("../helpers/tokens");

// Sign up new users
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Default user not admin
    const newUser = await User.addUser(username, email, password);

    const token = createToken(newUser);
    return res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    return res.status(500).json({ error: "Error creating user", details: err.message });
  }
};


// Log in existing users
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Fetch the user by username
    const user = await User.getUserByName(username);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare the entered password (plaintext) with the stored hash (from the DB)
    const validPassword = await bcrypt.compare(password.trim(), user.password.trim());


    if (!validPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create a token if password is correct
    const token = createToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Error logging in", details: err.message });
  }
};

module.exports = { signup, login };