const { Client } = require('pg');
require('dotenv').config({ path: __dirname + '/../../.env' });

const client = new Client({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'perfume_ecommerce',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'root'
});

async function main() {
  await client.connect();
  const res = await client.query(
    "SELECT id, name, slug, image_url, description FROM categories WHERE slug IN ('mens-perfumes', 'womens-perfumes', 'arabic-perfumes', 'luxury-perfumes', 'unisex-perfumes') ORDER BY id"
  );
  console.log('--- POSTGRESQL CATEGORIES TABLE RECORDS ---');
  console.table(res.rows);
  await client.end();
}

main().catch(console.error);

