const client = require('../db');

const getAllPlayers = async () => {
  const result = await client.query('SELECT * FROM players');
  return result.rows;
};

const getPlayerById = async (id) => {
  const result = await client.query('SELECT * FROM players WHERE id = $1', [id]);
  return result.rows[0];
};

const addPlayer = async (name, team_id, stats) => {
  const result = await client.query(
    'INSERT INTO players (name, team_id, stats) VALUES ($1, $2, $3) RETURNING *',
    [name, team_id, stats]
  );
  return result.rows[0];
};

module.exports = { getAllPlayers, getPlayerById, addPlayer };
