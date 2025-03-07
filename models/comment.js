const client = require('../db');


class Comment {
  /**
   * Retrieves all comments from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of comments.
   */
  static async getAllComments() {
    const result = await client.query('SELECT * FROM comments');
    return result.rows;
  }

  /**
   * Retrieves a specific comment by its ID.
   * @param {number} id - The ID of the comment.
   * @returns {Promise<Object|null>} A promise that resolves to the comment object or null if not found.
   */
  static async getCommentById(id) {
    const result = await client.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Adds a new comment to the database.
   * @param {number} user_id - The ID of the user.
   * @param {number} game_id - The ID of the game.
   * @param {string} content - The content of the comment.
   * @returns {Promise<Object>} A promise that resolves to the newly created comment.
   */
  static async addComment(user_id, game_id, content) {
    const result = await client.query(
      'INSERT INTO comments (user_id, game_id, content) VALUES ($1, $2, $3) RETURNING *',
      [user_id, game_id, content]
    );
    return result.rows[0];
  }
}

module.exports = Comment;
