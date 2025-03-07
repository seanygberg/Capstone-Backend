const client = require('../db');


class Game {
  /**
   * Retrieves all games from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of games.
   */
  static async getAllGames() {
    const result = await client.query('SELECT * FROM games');
    return result.rows;
  }

  /**
   * Retrieves a specific game by its ID.
   * @param {number} id - The ID of the game.
   * @returns {Promise<Object|null>} A promise that resolves to the game object or null if not found.
   */
  static async getGameById(id) {
    const result = await client.query('SELECT * FROM games WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Adds a new game to the database.
   * @param {string} date - The date of the game.
   * @param {number} home_team_id - The ID of the home team.
   * @param {number} away_team_id - The ID of the away team.
   * @param {number} home_score - The score of the home team.
   * @param {number} away_score - The score of the away team.
   * @returns {Promise<Object>} A promise that resolves to the newly created game.
   */
  static async addGame(date, home_team_id, away_team_id, home_score, away_score) {
    const result = await client.query(
      'INSERT INTO games (date, home_team_id, away_team_id, home_score, away_score) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [date, home_team_id, away_team_id, home_score, away_score]
    );
    return result.rows[0];
  }
}

module.exports = Game;
