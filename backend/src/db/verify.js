const { pool, testConnection } = require('../config/db');

async function verify() {
  await testConnection();
  const tablesRes = await pool.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
  );
  console.log('\n📊 Tables in PostgreSQL database:');
  for (const row of tablesRes.rows) {
    try {
      const countRes = await pool.query(`SELECT COUNT(*) AS count FROM "${row.table_name}"`);
      console.log(`   - ${row.table_name.padEnd(22)}: ${countRes.rows[0].count} rows`);
    } catch (e) {
      console.log(`   - ${row.table_name.padEnd(22)}: (query error: ${e.message})`);
    }
  }
  await pool.end();
}

verify().catch(console.error);

