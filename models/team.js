const client = require('../db');

class Team {
  /**
   * Retrieves a team by its ID.
   * @param {number} id - The ID of the team.
   * @returns {Promise<Object|null>} A promise that resolves to the team object or null if not found.
   */
  static async getTeamById(id) {
    const result = await client.query('SELECT * FROM teams WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Retrieves all teams from the database.
   * @returns {Promise<Array>} A promise that resolves to an array of all teams.
   */
  static async getAllTeams() {
    const result = await client.query('SELECT * FROM teams');
    return result.rows;
  }

  /**
   * Adds a new team record to the database.
   * @param {string} name - The name of the team.
   * @param {string} city - The city of the team.
   * @returns {Promise<Object>} A promise that resolves to the newly created team record.
   */
  static async addTeam(name, city) {
    const result = await client.query(
      'INSERT INTO teams (name, city) VALUES ($1, $2) RETURNING *',
      [name, city]
    );
    return result.rows[0];
  }
}

module.exports = Team;
