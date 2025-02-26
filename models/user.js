const client = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // Compare password with hashed password
    static async comparePassword(password, storedPassword) {
        return await bcrypt.compare(password, storedPassword);
    }

    // Generate JWT for user authentication
    static generateAuthToken(user) {
        return jwt.sign(
            { id: user.user_id, email: user.email },
            process.env.JWT_SECRET
        );
    }

    // Add a new user with hashed password
    static async addUser(username, email, password) {
        const hashedPassword = await this.hashPassword(password);
        const result = await client.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        return result.rows[0];
    }

    // Get all users
    static async getAllUsers() {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    }

    // Get a user by ID
    static async getUserById(id) {
        const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
        return result.rows[0];
    }

    // Get a user by email
    static async getUserByEmail(email) {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }

    // Update a user
    static async updateUser(id, updatedUser) {
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
    }

    // Delete a user
    static async deleteUser(id) {
        if (!id) {
            throw new Error("User ID is required");
        }
        await client.query('DELETE FROM users WHERE user_id = $1', [id]);
    }
}

module.exports = User;
