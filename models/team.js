const { Client } = require('pg');
const client = require('../db');

const getTeamById = async () => {
    const result = await client.query('SELECT * FROM teams WHERE id = $1', [id]);
    return result.rows[0];
  };  

const getAllTeams = async () => {
  const result = await client.query('SELECT * FROM teams');
  return result.rows;
};

const addTeam = async (name, city) => {
  const result = await client.query(
    'INSERT INTO teams (name, city) VALUES ($1, $2) RETURNING *',
    [name, city]
  );
  return result.rows[0];
};

module.exports = { getTeamById, getAllTeams, addTeam };
