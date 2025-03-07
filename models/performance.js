const client = require('../db');

class Performance {
  /**
   * Retrieves all performances from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of all performances.
   */
  static async getAllPerformances() {
    const result = await client.query('SELECT * FROM performances');
    return result.rows;
  }

  /**
   * Retrieves a performance by its ID.
   * @param {number} id - The ID of the performance.
   * @returns {Promise<Object|null>} A promise that resolves to the performance object or null if not found.
   */
  static async getPerformanceById(id) {
    const result = await client.query('SELECT * FROM performances WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Adds a new performance record to the database.
   * @param {number} player_id - The ID of the player.
   * @param {number} game_id - The ID of the game.
   * @param {number} points - Number of points scored.
   * @param {number} assists - Number of assists.
   * @param {number} rebounds - Number of rebounds.
   * @param {number} steals - Number of steals.
   * @param {number} blocks - Number of blocks.
   * @returns {Promise<Object>} A promise that resolves to the newly created performance record.
   */
  static async addPerformance(player_id, game_id, points, assists, rebounds, steals, blocks) {
    const result = await client.query(
      'INSERT INTO performances (player_id, game_id, points, assists, rebounds, steals, blocks) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [player_id, game_id, points, assists, rebounds, steals, blocks]
    );
    return result.rows[0];
  }

  /**
   * Updates an existing performance record.
   * @param {number} id - The ID of the performance to update.
   * @param {number} updates.points - Updated points.
   * @param {number} updates.assists - Updated assists.
   * @param {number} updates.rebounds - Updated rebounds.
   * @param {number} updates.steals - Updated steals.
   * @param {number} updates.blocks - Updated blocks.
   * @returns {Promise<Object|null>} A promise that resolves to the updated performance record or null if not found.
   */
  static async setPerformance(id, { points, assists, rebounds, steals, blocks }) {
    const result = await client.query(
      `UPDATE performances
       SET points = $1,
           assists = $2,
           rebounds = $3,
           steals = $4,
           blocks = $5
       WHERE id = $6 RETURNING *`,
      [points, assists, rebounds, steals, blocks, id]
    );
    return result.rows[0] || null;
  }

  /**
   * Deletes a performance record from the database.
   * @param {number} id - The ID of the performance to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  static async removePerformance(id) {
    await client.query('DELETE FROM performances WHERE id = $1', [id]);
  }
}

module.exports = Performance;
