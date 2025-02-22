const client = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hash user password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password with hashed password
const comparePassword = async (password, storedPassword) => {
    return await bcrypt.compare(password, storedPassword);
};

// Generate JWT for user authentication
const generateAuthToken = (user) => {
    return jwt.sign(
        { id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' }
    );
};

// Add a new user
const addUser = async (username, email, password) => {
    const result = await client.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
    );
    return result.rows[0];
}

// Get all users
const getAllUsers = async () => {
    const result = await client.query('SELECT * FROM users');
    return result.rows;
}

// Get a user by id
const getUserById = async (id) => {
  const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Update a user
const updateUser = async (id, updatedUser) => {
    const { username, email, profile_picture_url, bio } = updatedUser;
    const query = `
      UPDATE users 
      SET 
        username = $1,
        email = $2,
        profile_picture_url = $3,
        bio = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $5
      RETURNING *;
    `;
  
    const result = await client.query(query, [username, email, profile_picture_url, bio, id]);
    return result.rows[0];
  };
  
// Delete a user
const deleteUser = async (id) => {
    await client.query('DELETE FROM users WHERE user_id = $1', [id]);
    if (!id) {
        throw new Error("User ID is required");
    }
};

module.exports = { 
    addUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
    hashPassword,
    comparePassword,
    generateAuthToken,
 };