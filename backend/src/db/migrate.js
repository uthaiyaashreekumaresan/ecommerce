const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function runMigration() {
  const dbName = process.env.PGDATABASE || 'perfume_ecommerce';
  const config = {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'root',
  };

  console.log(`\n🚀 Initializing PostgreSQL migration for "${dbName}"...`);

  // Step 1: Connect to default 'postgres' database to ensure target DB exists
  const adminClient = new Client({ ...config, database: 'postgres' });
  try {
    await adminClient.connect();
    const checkDb = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb.rows.length === 0) {
      console.log(`Creating database "${dbName}"...`);
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created successfully.`);
    } else {
      console.log(`ℹ️ Database "${dbName}" already exists.`);
    }
  } catch (err) {
    console.warn(`Notice during database creation check: ${err.message}`);
  } finally {
    await adminClient.end();
  }

  // Step 2: Connect to target database and execute schema.sql
  const targetClient = new Client({ ...config, database: dbName });
  try {
    await targetClient.connect();
    console.log(`Connected to database "${dbName}". Running schema scripts...`);

    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    await targetClient.query(schemaSql);
    console.log('✅ PostgreSQL Schema applied successfully!');
    console.log('Tables initialized: users, categories, brands, products, carts, cart_items, orders, order_items');
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    process.exit(1);
  } finally {
    await targetClient.end();
  }
}

if (require.main === module) {
  runMigration();
}

module.exports = runMigration;

