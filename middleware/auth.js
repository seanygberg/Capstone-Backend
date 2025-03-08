const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { createToken } = require("../helpers/tokens");

// Sign up new users
const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password, isAdmin } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({
      where: { $or: [{ username }, { email }] },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Default user not admin
    const newUser = await User.addUser({
      username,
      email,
      password: hashPassword,
      isAdmin: isAdmin || false,
    });

    const token = createToken(newUser);
    return res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    return res.status(500).json({ error: "Error creating user", details: err.message });
  }
}

// Log in existing users
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user if one exists
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the entered password with the one in the db
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create a token
    const token = createToken(user);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Error logging in", details: err.message });
  }
}

module.exports = { signup, login };