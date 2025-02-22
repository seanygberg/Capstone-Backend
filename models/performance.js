const client = require('../db');

// Get all performances
const getAllPerformances = async () => {
  const result = await client.query('SELECT * FROM performances');
  return result.rows;
};

// Get a performance by ID
const getPerformanceById = async (id) => {
  const result = await client.query('SELECT * FROM performances WHERE id = $1', [id]);
  return result.rows[0];
};

// Add a new performance
const addPerformance = async (player_id, game_id, points, assists, rebounds, steals, blocks) => {
  const result = await client.query(
    'INSERT INTO performances (player_id, game_id, points, assists, rebounds, steals, blocks) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [player_id, game_id, points, assists, rebounds, steals, blocks]
  );
  return result.rows[0];
};

// Update an current performance
const setPerformance = async (id, updates) => {
  const { points, assists, rebounds, steals, blocks } = updates;

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
  return result.rows[0];
};

// Delete a performance
const removePerformance = async (id) => {
  await client.query('DELETE FROM performances WHERE id = $1', [id]);
};

module.exports = {
  getAllPerformances,
  getPerformanceById,
  addPerformance,
  setPerformance,
  removePerformance
};
