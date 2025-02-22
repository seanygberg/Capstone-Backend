const client = require('../db');


const getAllComments = async () => {
  const result = await client.query('SELECT * FROM comments');
  return result.rows;
};

const getCommentById = async (id) => {
  const result = await client.query('SELECT * FROM comments WHERE id = $1', [id]);
  return result.rows[0];
};

const addComment = async (user_id, game_id, content) => {
  const result = await client.query(
    'INSERT INTO comments (user_id, game_id, content) VALUES ($1, $2, $3) RETURNING *',
    [user_id, game_id, content]
  );
  return result.rows[0];
};

module.exports = { getAllComments, getCommentById, addComment };
