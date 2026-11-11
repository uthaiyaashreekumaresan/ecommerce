const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { categoriesData, brandsData, productsData } = require('./seedData');

async function runSeed() {
  const dbName = process.env.PGDATABASE || 'perfume_ecommerce';
  const config = {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'root',
    database: dbName,
  };

  const client = new Client(config);

  try {
    await client.connect();
    console.log(`\n🌱 Seeding database "${dbName}"...`);

    // 1. Seed Users & Admins
    const adminPasswordHash = await bcrypt.hash('Admin@123', 10);
    const customerPasswordHash = await bcrypt.hash('Customer@123', 10);

    const userQueries = [
      {
        text: `INSERT INTO users (name, email, password_hash, role, phone, address, city, state, pincode)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
               ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, password_hash = EXCLUDED.password_hash
               RETURNING id, role`,
        values: ['Admin', 'admin@perfumeshop.com', adminPasswordHash, 'admin', '+91 98765 43210', 'Plot 42, Perfume Tower, Anna Salai', 'Chennai', 'Tamil Nadu', '600002']
      },
      {
        text: `INSERT INTO users (name, email, password_hash, role, phone, address, city, state, pincode)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
               ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
               RETURNING id, role`,
        values: ['Priya Sharma', 'customer@perfumeshop.com', customerPasswordHash, 'customer', '+91 91234 56789', 'Flat 304, Green Meadows, Indiranagar', 'Bengaluru', 'Karnataka', '560038']
      }
    ];

    let adminUserId = null;
    let customerUserId = null;

    for (const q of userQueries) {
      const res = await client.query(q.text, q.values);
      if (res.rows[0].role === 'admin') adminUserId = res.rows[0].id;
      if (res.rows[0].role === 'customer') customerUserId = res.rows[0].id;
    }
    console.log('✅ Users seeded securely.');

    // 2. Seed Admins Table
    if (adminUserId) {
      await client.query(
        `INSERT INTO admins (user_id, admin_level, department, permissions, last_login)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id) DO NOTHING`,
        [adminUserId, 'superadmin', 'Management', ['all']]
      );
      console.log('✅ Admin credentials registered in admins table.');
    }

    // 3. Seed Addresses Table
    if (customerUserId) {
      await client.query(
        `INSERT INTO addresses (user_id, full_name, phone, address_line1, address_line2, city, state, pincode, address_type, is_default)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT DO NOTHING`,
        [customerUserId, 'Priya Sharma', '+91 91234 56789', 'Flat 304, Green Meadows', 'Indiranagar 100ft Road', 'Bengaluru', 'Karnataka', '560038', 'Home', true]
      );
      console.log('✅ Customer addresses seeded.');
    }

    // 4. Seed Categories
    const categoryMap = {};
    for (const cat of categoriesData) {
      const res = await client.query(
        `INSERT INTO categories (name, slug, description, image_url)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE SET description = EXCLUDED.description, image_url = EXCLUDED.image_url
         RETURNING id, slug`,
        [cat.name, cat.slug, cat.description, cat.image_url]
      );
      categoryMap[cat.slug] = res.rows[0].id;
    }
    console.log(`✅ ${categoriesData.length} Fragrance Categories seeded.`);

    // 5. Seed Brands
    const brandMap = {};
    for (const brand of brandsData) {
      const res = await client.query(
        `INSERT INTO brands (name, slug, description, logo_url)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (slug) DO UPDATE SET description = EXCLUDED.description, logo_url = EXCLUDED.logo_url
         RETURNING id, slug`,
        [brand.name, brand.slug, brand.description, brand.logo_url]
      );
      brandMap[brand.slug] = res.rows[0].id;
    }
    console.log(`✅ ${brandsData.length} Fragrance Brands seeded.`);

    // 6. Seed Products, Product Images, Product Variants, and Inventory
    let productCount = 0;
    for (const p of productsData) {
      const brandId = brandMap[p.brandSlug] || null;
      const categoryId = categoryMap[p.categorySlug] || null;

      const pRes = await client.query(
        `INSERT INTO products 
         (name, slug, brand_id, category_id, gender, description, short_description, price, discount_price, 
          stock, volume_ml, concentration, top_notes, heart_notes, base_notes, image_url, gallery_urls, is_featured, rating, review_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
         ON CONFLICT (slug) DO UPDATE SET 
          brand_id = EXCLUDED.brand_id,
          category_id = EXCLUDED.category_id,
          price = EXCLUDED.price,
          discount_price = EXCLUDED.discount_price,
          stock = EXCLUDED.stock,
          image_url = EXCLUDED.image_url,
          concentration = EXCLUDED.concentration,
          top_notes = EXCLUDED.top_notes,
          heart_notes = EXCLUDED.heart_notes,
          base_notes = EXCLUDED.base_notes
         RETURNING id`,
        [
          p.name,
          p.slug,
          brandId,
          categoryId,
          p.gender,
          p.description,
          p.short_description,
          p.price,
          p.discount_price,
          p.stock,
          p.volume_ml,
          p.concentration,
          p.top_notes,
          p.heart_notes,
          p.base_notes,
          p.image_url,
          p.gallery_urls,
          p.is_featured,
          p.rating,
          p.review_count
        ]
      );

      const productId = pRes.rows[0].id;

      // Seed Product Images
      await client.query(
        `INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order)
         VALUES ($1, $2, $3, true, 1)
         ON CONFLICT DO NOTHING`,
        [productId, p.image_url, p.name]
      );

      // Seed Product Variants (50ml & 100ml)
      const v50Res = await client.query(
        `INSERT INTO product_variants (product_id, size_ml, sku, price, discount_price, stock)
         VALUES ($1, 50, $2, $3, $4, $5)
         ON CONFLICT (product_id, size_ml) DO UPDATE SET price = EXCLUDED.price, discount_price = EXCLUDED.discount_price
         RETURNING id`,
        [productId, `${p.slug}-50ml`, p.price, p.discount_price, p.stock || 50]
      );

      const price100 = Math.round(p.price * 1.6);
      const discountPrice100 = p.discount_price ? Math.round(p.discount_price * 1.6) : null;
      await client.query(
        `INSERT INTO product_variants (product_id, size_ml, sku, price, discount_price, stock)
         VALUES ($1, 100, $2, $3, $4, $5)
         ON CONFLICT (product_id, size_ml) DO UPDATE SET price = EXCLUDED.price, discount_price = EXCLUDED.discount_price`,
        [productId, `${p.slug}-100ml`, price100, discountPrice100, 30]
      );

      // Seed Inventory
      if (v50Res.rows.length > 0) {
        await client.query(
          `INSERT INTO inventory (product_id, variant_id, current_stock, reserved_stock, low_stock_threshold)
           VALUES ($1, $2, $3, 0, 10)
           ON CONFLICT DO NOTHING`,
          [productId, v50Res.rows[0].id, p.stock || 50]
        );
      }

      productCount++;
    }
    console.log(`✅ ${productCount} Perfume Products, Variants, Images & Inventory seeded.`);

    // 7. Seed Coupons & Discounts
    const coupons = [
      { code: 'NOIR10', desc: '10% OFF on all Eau De Parfums', type: 'percentage', val: 10, min: 999 },
      { code: 'LUXE20', desc: '20% OFF on orders above ₹4,999', type: 'percentage', val: 20, min: 4999 },
      { code: 'FLORENCIA500', desc: 'Flat ₹500 OFF on luxury purchases', type: 'fixed', val: 500, min: 2999 }
    ];

    for (const c of coupons) {
      await client.query(
        `INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, is_active)
         VALUES ($1, $2, $3, $4, $5, true)
         ON CONFLICT (code) DO NOTHING`,
        [c.code, c.desc, c.type, c.val, c.min]
      );
    }
    console.log('✅ Coupons & Promotions seeded (NOIR10, LUXE20, FLORENCIA500).');

    // 8. Seed Demo Order, Order Items & Payment
    const customerRes = await client.query(`SELECT id FROM users WHERE email = $1`, ['customer@perfumeshop.com']);
    const productRes = await client.query(`SELECT id, name, price, discount_price, image_url FROM products LIMIT 2`);
    
    if (customerRes.rows.length > 0 && productRes.rows.length >= 2) {
      const userId = customerRes.rows[0].id;
      const p1 = productRes.rows[0];
      const p2 = productRes.rows[1];
      const p1Price = parseFloat(p1.discount_price || p1.price);
      const p2Price = parseFloat(p2.discount_price || p2.price);
      const subtotal = p1Price + p2Price;
      const totalAmount = subtotal;

      const orderRes = await client.query(
        `INSERT INTO orders 
         (order_number, user_id, customer_name, customer_email, customer_phone, 
          shipping_address, shipping_city, shipping_state, shipping_pincode, 
          subtotal, discount, shipping_fee, total_amount, payment_method, payment_status, order_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
         ON CONFLICT (order_number) DO NOTHING
         RETURNING id`,
        [
          'ORD-2026-98101',
          userId,
          'Priya Sharma',
          'customer@perfumeshop.com',
          '+91 91234 56789',
          'Flat 304, Green Meadows, Indiranagar',
          'Bengaluru',
          'Karnataka',
          '560038',
          subtotal,
          0,
          0,
          totalAmount,
          'UPI',
          'paid',
          'shipped'
        ]
      );

      if (orderRes.rows.length > 0) {
        const orderId = orderRes.rows[0].id;
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, size_ml, price, quantity, total_price, image_url)
           VALUES 
           ($1, $2, $3, 50, $4, 1, $4, $5),
           ($1, $6, $7, 50, $8, 1, $8, $9)`,
          [orderId, p1.id, p1.name, p1Price, p1.image_url, p2.id, p2.name, p2Price, p2.image_url]
        );

        // Seed Payment Record
        await client.query(
          `INSERT INTO payments (order_id, payment_method, transaction_id, amount, status)
           VALUES ($1, 'UPI', $2, $3, 'completed')
           ON CONFLICT DO NOTHING`,
          [orderId, 'TXN-UPI-98101-OK', totalAmount]
        );
        console.log('✅ Demo Order #ORD-2026-98101 & Payment record seeded.');
      }
    }

    // 9. Seed Authentic Reviews
    if (productRes.rows.length > 0) {
      await client.query(
        `INSERT INTO reviews (product_id, user_name, rating, title, comment, is_verified)
         VALUES 
         ($1, 'Kavita Menon', 5, 'Masterpiece Longevity', 'Extremely luxurious fragrance. Easily lasts 12+ hours on linen and skin. Sillage is captivating.', true),
         ($1, 'Arjun Reddy', 5, 'Unmatched Scent Profile', 'The blend of amber and bergamot is exquisite. Compliments everywhere I wear it.', true)
         ON CONFLICT DO NOTHING`,
        [productRes.rows[0].id]
      );
      console.log('✅ Verified Customer Reviews seeded.');
    }

    // 10. Seed Sample Contact Messages
    await client.query(
      `INSERT INTO contact_messages (name, email, phone, subject, message, status)
       VALUES 
       ('Rohit Verma', 'rohit.v@example.com', '+91 98888 77777', 'Inquiry about French Oak & Oud sample vial', 'Hi team, do you offer 2ml discovery sets for the Oud Collection?', 'unread')
       ON CONFLICT DO NOTHING`
    );
    console.log('✅ Contact Inquiries seeded.');

    // 11. Seed Dynamic Home Page Collections
    const homeSections = [
      { key: 'hero_slider', name: 'Hero Carousel', title: 'Haute Parfumerie Collection', is_enabled: true, order: 1 },
      { key: 'featured_perfumes', name: 'Signature Bestsellers', title: 'Curated Masterpieces', is_enabled: true, order: 2 },
      { key: 'new_arrivals', name: 'New In The House', title: 'Latest Scent Arrivals', is_enabled: true, order: 3 },
      { key: 'special_offer', name: 'Seasonal Offers', title: 'Exclusive Privilege', is_enabled: true, order: 4 }
    ];

    for (const sec of homeSections) {
      await client.query(
        `INSERT INTO home_sections (section_key, name, title, is_enabled, display_order)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (section_key) DO UPDATE SET title = EXCLUDED.title, is_enabled = EXCLUDED.is_enabled`,
        [sec.key, sec.name, sec.title, sec.is_enabled, sec.order]
      );
    }
    console.log('✅ Home Sections seeded.');

    console.log('\n✨ Database seeding completed successfully with all 17 tables populated!\n');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  runSeed();
}

module.exports = runSeed;
