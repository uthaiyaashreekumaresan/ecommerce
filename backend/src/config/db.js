const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'perfume_ecommerce',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'root',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// Error listener for idle clients in pool
pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err.message);
});

let isPgConnected = false;

/**
 * Test PostgreSQL database connection
 * Returns true if connection succeeds, throws Error if it fails
 */
async function testConnection() {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    isPgConnected = true;
    console.log('PostgreSQL Connected Successfully');
    return true;
  } catch (err) {
    isPgConnected = false;
    const msg = err.message || (err.errors && err.errors[0] && err.errors[0].message) || err.code || 'Connection refused';
    console.error(`\n❌ PostgreSQL Connection Failed:`);
    console.error(`   Host     : ${process.env.PGHOST || 'localhost'}:${process.env.PGPORT || '5432'}`);
    console.error(`   Database : ${process.env.PGDATABASE || 'perfume_ecommerce'}`);
    console.error(`   User     : ${process.env.PGUSER || 'postgres'}`);
    console.error(`   Error    : ${msg}`);
    console.error(`\n   Ensure the PostgreSQL Windows background service is started:`);
    console.error(`   Run in Admin PowerShell: net start postgresql-x64-18\n`);
    throw err;
  }
}

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  getIsConnected: () => isPgConnected,
  testConnection
};
