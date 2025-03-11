const client = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User {
    // Hash password
    static async hashPassword(password) {
        if (!password) {
            throw new Error('Password is required');
        }
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
        try {
            // Check if the username already exists
            const usernameCheck = await client.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            );

            if (usernameCheck.rows.length > 0) {
                throw new Error('Username already exists');
            }

            // Check if the email already exists
            const emailCheck = await client.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (emailCheck.rows.length > 0) {
                throw new Error('Email already exists');
            }

            

            const hashedPassword = await this.hashPassword(password);
            const result = await client.query(`
                WITH max_id AS (
                    SELECT MAX(user_id) AS max_user_id
                    FROM users
                )
                INSERT INTO users (user_id, username, email, password)
                SELECT max_user_id + 1, $1, $2, $3
                FROM max_id
                RETURNING *;
            `, [username, email, hashedPassword]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error adding user: ${error.message}`);
        }
    }

    // Get all users
    static async getAllUsers() {
        try {
            const result = await client.query('SELECT * FROM users');
            console.log(result.rows.length);
            return result.rows;
        } catch (error) {
            throw new Error('Error fetching users');
        }
    }

    // Get a user by ID
    static async getUserById(id) {
        try {
            const result = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error fetching user with ID ${id}: ${error.message}`);
        }
    }

    // Get a user by name
    static async getUserByName(name) {
        try {
            const result = await client.query(
                'SELECT * FROM users WHERE username = $1', 
                [name]
            ); 
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(`Error fetching user with name ${name}: ${error.message}`);
        }
    }


    // Get a user by email
    static async getUserByEmail(email) {
        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error fetching user with email ${email}: ${error.message}`);
        }
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

        try {
            const result = await client.query(query, [username, email, profile_picture_url, bio, id]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error updating user with ID ${id}: ${error.message}`);
        }
    }

    // Delete a user
    static async deleteUser(id) {
        if (!id) {
            throw new Error("User ID is required");
        }

        try {
            // Check if the user exists before deleting
            const user = await client.query('SELECT * FROM users WHERE user_id = $1', [id]);
            if (!user.rows.length) {
                throw new Error("User not found");
            }

            await client.query('DELETE FROM users WHERE user_id = $1', [id]);
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
        }
    }
}

module.exports = User;