const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'db.kzlmwfnxoahkrvcqdiek.supabase.co',
  database: 'postgres',
  password: 'Marist23',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected'))
  .catch(err => console.error('Database connection error:', err.stack));

module.exports = client;
