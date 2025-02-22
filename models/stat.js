const client = require('../db');

const createStatTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS stats (
      id SERIAL PRIMARY KEY,
      player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
      game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
      points INTEGER,
      assists INTEGER,
      rebounds INTEGER
    );
  `;
  await client.query(query);
};

const getAllStats = async () => {
  const result = await client.query('SELECT * FROM stats');
  return result.rows;
};

const getStatById = async (id) => {
  const result = await client.query('SELECT * FROM stats WHERE id = $1', [id]);
  return result.rows[0];
};

const addStat = async (player_id, game_id, points, assists, rebounds) => {
  const result = await client.query(
    'INSERT INTO stats (player_id, game_id, points, assists, rebounds) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [player_id, game_id, points, assists, rebounds]
  );
  return result.rows[0];
};

module.exports = { getAllStats, getStatById, addStat };