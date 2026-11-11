const db = require('../config/db');

async function migrate() {
  try {
    console.log('--- Starting 3-Image Schema Migration ---');

    // 1. Add image_url_1, image_url_2, image_url_3 columns to products
    await db.query(`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS image_url_1 TEXT,
      ADD COLUMN IF NOT EXISTS image_url_2 TEXT,
      ADD COLUMN IF NOT EXISTS image_url_3 TEXT;
    `);
    console.log('✓ Columns image_url_1, image_url_2, image_url_3 added (or verified).');

    // 2. Populate image_url_1, image_url_2, image_url_3 from existing image_url & gallery_urls
    const res = await db.query(`SELECT id, image_url, gallery_urls, image_url_1, image_url_2, image_url_3 FROM products`);
    console.log(`Found ${res.rows.length} products to migrate.`);

    for (const p of res.rows) {
      const g = Array.isArray(p.gallery_urls) ? p.gallery_urls : [];
      
      const img1 = p.image_url_1 || p.image_url || (g[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80');
      // If gallery has multiple, use g[1], else g[0] or img1
      const img2 = p.image_url_2 || (g.length > 1 ? g[1] : (g.length > 0 && g[0] !== img1 ? g[0] : 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80'));
      // If gallery has 3, use g[2], else fallback
      const img3 = p.image_url_3 || (g.length > 2 ? g[2] : (g.length > 1 && g[1] !== img2 ? g[1] : 'https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80'));

      await db.query(`
        UPDATE products 
        SET 
          image_url_1 = $1,
          image_url_2 = $2,
          image_url_3 = $3,
          image_url = $1,
          gallery_urls = ARRAY[$1, $2, $3],
          updated_at = NOW()
        WHERE id = $4
      `, [img1, img2, img3, p.id]);
    }

    console.log('✓ All products updated with 3 distinct image URLs.');

    // 3. Verify sample
    const sample = await db.query(`SELECT id, name, image_url_1, image_url_2, image_url_3 FROM products LIMIT 3`);
    console.log('Verification Sample:', sample.rows);

    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();

