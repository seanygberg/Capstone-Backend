const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'db.kzlmwfnxoahkrvcqdiek.supabase.co',
  database: 'postgres',
  password: 'pDw3zIk9sw9KuPzn',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected'))
  .catch(err => console.error('Database connection error:', err.stack));

module.exports = client;

//postgresql://postgres:pDw3zIk9sw9KuPzn@db.kzlmwfnxoahkrvcqdiek.supabase.co:5432/postgres