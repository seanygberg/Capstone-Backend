const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { createToken } = require("../helpers/tokens");

// Sign up new users
const signup = async (req, res) => {
  const { username, password, isAdmin } = req.body;
  
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    // Default user not admin
    const newUser = await User.create({
      username,
      password: hashPassword,
      isAdmin: isAdmin || false,
    });

    const token = createToken(newUser);
    return res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    return res.status(500).json({ error: "Error creating user" });
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
    return res.status(500).json({ error: "Error logging in" });
  }

}

const logout = () => {
  localStorage.removeItem('token');  // Remove the token
};


module.exports = { signup, login, logout };