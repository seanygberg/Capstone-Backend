const client = require('../db');

class Player {
  /**
   * Retrieves all players from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of all players.
   */
  static async getAllPlayers() {
    const result = await client.query('SELECT * FROM players');
    return result.rows;
  }

  /**
   * Retrieves a player by their ID.
   * @param {number} id - The ID of the player.
   * @returns {Promise<Object|null>} A promise that resolves to the player object or null if not found.
   */
  static async getPlayerById(id) {
    const result = await client.query('SELECT * FROM players WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Adds a new player record to the database.
   * @param {string} name - The name of the player.
   * @param {number} team_id - The ID of the team the player belongs to.
   * @param {Object} stats - The player's statistics.
   * @returns {Promise<Object>} A promise that resolves to the newly created player record.
   */
  static async addPlayer(name, team_id, stats) {
    const result = await client.query(
      'INSERT INTO players (name, team_id, stats) VALUES ($1, $2, $3) RETURNING *',
      [name, team_id, stats]
    );
    return result.rows[0];
  }
}

module.exports = Player;