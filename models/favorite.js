const client = require('../db');

class Favorite {
  /**
   * Retrieves all favorites from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of favorites.
   */
  static async getAllFavorites() {
    const result = await client.query('SELECT * FROM favorites');
    return result.rows;
  }

  /**
   * Retrieves a specific favorite by its ID.
   * @param {number} id - The ID of the favorite.
   * @returns {Promise<Object|null>} A promise that resolves to the favorite object or null if not found.
   */
  static async getFavoriteById(id) {
    const result = await client.query('SELECT * FROM favorites WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Retrieves all favorite players for a user.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<Array>} A promise that resolves to an array of favorite players.
   */
  static async getFavoritePlayersByUser(user_id) {
    const result = await client.query('SELECT * FROM player_favorites WHERE user_id = $1 AND player_id IS NOT NULL', [user_id]);
    return result.rows;
  }

  /**
   * Retrieves all favorite teams for a user.
   * @param {number} user_id - The ID of the user.
   * @returns {Promise<Array>} A promise that resolves to an array of favorite teams.
   */
  static async getFavoriteTeamsByUser(user_id) {
    const result = await client.query('SELECT * FROM team_favorites WHERE user_id = $1 AND team_id IS NOT NULL', [user_id]);
    return result.rows;
  }

  /**
   * Adds a favorite player for a user.
   * @param {number} user_id - The ID of the user.
   * @param {number} player_id - The ID of the player to be favorited.
   * @returns {Promise<Object>} A promise that resolves to the newly created favorite player.
   */
  static async createFavoritePlayer(user_id, player_id) {
    const result = await client.query(
      'INSERT INTO player_favorites (user_id, player_id) VALUES ($1, $2) RETURNING *',
      [user_id, player_id]
    );
    return result.rows[0];
  }

  /**
   * Adds a favorite team for a user.
   * @param {number} user_id - The ID of the user.
   * @param {number} team_id - The ID of the team to be favorited.
   * @returns {Promise<Object>} A promise that resolves to the newly created favorite team.
   */
  static async createFavoriteTeam(user_id, team_id) {
    const result = await client.query(
      'INSERT INTO team_favorites (user_id, team_id) VALUES ($1, $2) RETURNING *',
      [user_id, team_id]
    );
    return result.rows[0];
  }

  /**
   * Removes a favorite (player or team) for a user.
   * @param {number} user_id - The ID of the user.
   * @param {number|null} player_id - The ID of the player to be removed (if applicable).
   * @param {number|null} team_id - The ID of the team to be removed (if applicable).
   * @throws Will throw an error if user_id is not provided or if neither player_id nor team_id is specified.
   */
  static async deleteFavorite(user_id, player_id = null, team_id = null) {
    if (!user_id) {
      throw new Error('User ID is required');
    }

    if (player_id) {
      await client.query('DELETE FROM player_favorites WHERE user_id = $1 AND player_id = $2', [user_id, player_id]);
    }

    if (team_id) {
      await client.query('DELETE FROM team_favorites WHERE user_id = $1 AND team_id = $2', [user_id, team_id]);
    }

    if (!player_id && !team_id) {
      throw new Error('Either player_id or team_id is required to delete a favorite');
    }
  }
}

module.exports = Favorite;
