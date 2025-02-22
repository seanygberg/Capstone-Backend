const client = require('../db');


const getAllGames = async () => {
  const result = await client.query('SELECT * FROM games');
  return result.rows;
};

const getGameById = async (id) => {
  const result = await client.query('SELECT * FROM games WHERE id = $1', [id]);
  return result.rows[0];
};

const addGame = async (date, home_team_id, away_team_id, home_score, away_score) => {
  const result = await client.query(
    'INSERT INTO games (date, home_team_id, away_team_id, home_score, away_score) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [date, home_team_id, away_team_id, home_score, away_score]
  );
  return result.rows[0];
};

module.exports = { getAllGames, getGameById, addGame };
