const client = require('../db');

class Stat {
  /**
   * Retrieves all stats from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of all stats.
   */
  static async getAllStats() {
    const result = await client.query('SELECT * FROM stats');
    return result.rows;
  }

  /**
   * Retrieves a stat by its ID.
   * @param {number} id - The ID of the stat.
   * @returns {Promise<Object|null>} A promise that resolves to the stat object or null if not found.
   */
  static async getStatById(id) {
    const result = await client.query('SELECT * FROM stats WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Adds a new stat record to the database.
   * @param {number} player_id - The ID of the player.
   * @param {number} game_id - The ID of the game.
   * @param {number} points - Number of points scored.
   * @param {number} assists - Number of assists.
   * @param {number} rebounds - Number of rebounds.
   * @returns {Promise<Object>} A promise that resolves to the newly created stat record.
   */
  static async addStat(player_id, game_id, points, assists, rebounds) {
    const result = await client.query(
      'INSERT INTO stats (player_id, game_id, points, assists, rebounds) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [player_id, game_id, points, assists, rebounds]
    );
    return result.rows[0];
  }
}

module.exports = Stat;
