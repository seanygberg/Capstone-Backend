const client = require('../db');

// Get all favorites
const getAllFavorites = async () => {
  const result = await client.query('SELECT * FROM favorites');
  return result.rows;
};

// Get a specific favorite by ID
const getFavoriteById = async (id) => {
  const result = await client.query('SELECT * FROM favorites WHERE id = $1', [id]);
  return result.rows[0];
};

// Get all favorite players for a user
const getFavoritePlayersByUser = async (user_id) => {
  const result = await client.query('SELECT * FROM player_favorites WHERE user_id = $1 AND player_id IS NOT NULL', [user_id]);
  return result.rows;
};

// Get all favorite teams for a user
const getFavoriteTeamsByUser = async (user_id) => {
  const result = await client.query('SELECT * FROM team_favorites WHERE user_id = $1 AND team_id IS NOT NULL', [user_id]);
  return result.rows;
};

// Add a favorite player
const createFavoritePlayer = async (user_id, player_id) => {
  const result = await client.query(
    'INSERT INTO player_favorites (user_id, player_id) VALUES ($1, $2) RETURNING *',
    [user_id, player_id]
  );
  return result.rows[0];
};

// Add a favorite team
const createFavoriteTeam = async (user_id, team_id) => {
  const result = await client.query(
    'INSERT INTO team_favorites (user_id, team_id) VALUES ($1, $2) RETURNING *',
    [user_id, team_id]
  );
  return result.rows[0];
};

// Remove a favorite
const deleteFavorite = async (user_id, player_id, team_id) => {
    if (!user_id) {
      throw new Error('User ID is required');
    }
  
    if (player_id) {
      await client.query('DELETE FROM favorites WHERE user_id = $1 AND player_id = $2', [user_id, player_id]);
    }
  
    if (team_id) {
      await client.query('DELETE FROM favorites WHERE user_id = $1 AND team_id = $2', [user_id, team_id]);
    }
  
    throw new Error('Either player_id or team_id is required to delete a favorite');
  };
  
module.exports = {
  getAllFavorites,
  getFavoriteById,
  getFavoritePlayersByUser,
  getFavoriteTeamsByUser,
  createFavoritePlayer,
  createFavoriteTeam,
  deleteFavorite
};
