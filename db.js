const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'db.kzlmwfnxoahkrvcqdiek.supabase.co',
  database: 'postgres',
  password: 'pDw3zIk9sw9KuPzn',
  port: 5432,
  ssl: { rejectUnauthorized: false },
  connectionString: 'postgresql://postgres.kzlmwfnxoahkrvcqdiek:pDw3zIk9sw9KuPzn@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
});

client.connect()
  .then(() => console.log('Connected'))
  .catch(err => console.error('Database connection error:', err.stack));

module.exports = client;
