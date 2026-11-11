const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const { categoriesData, brandsData, productsData } = require('./seedData');

const LOCAL_STORE_FILE = path.join(__dirname, 'local_home_data.json');

// In-memory fallback dataset for seamless zero-downtime development and testing
let memoryUsers = [];
let memoryCategories = [];
let memoryBrands = [];
let memoryProducts = [];
let memoryCarts = [];
let memoryCartItems = [];
let memoryOrders = [];
let memoryOrderItems = [];
let memorySliders = [];
let memorySections = [];
let memoryOffers = [];
let memoryCoupons = [
  { id: 1, code: 'NOIR10', description: '10% OFF on all Eau De Parfums', discount_type: 'percentage', discount_value: 10, min_order_amount: 999, is_active: true },
  { id: 2, code: 'LUXE20', description: '20% OFF on orders above ₹4,999', discount_type: 'percentage', discount_value: 20, min_order_amount: 4999, is_active: true },
  { id: 3, code: 'FLORENCIA500', description: 'Flat ₹500 OFF on luxury purchases', discount_type: 'fixed', discount_value: 500, min_order_amount: 2999, is_active: true }
];
let memoryWishlists = [];
let memoryAddresses = [];
let memoryCollections = {
  featuredIds: [1, 2, 21, 22, 41, 42, 61, 62, 81, 82, 101, 102, 121, 122, 141, 142, 161, 162, 181, 182],
  bestsellerIds: [181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200],
  newArrivalIds: [161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180]
};

let idCounter = 1000;
const nextId = () => ++idCounter;

function initMemoryStore() {
  const adminHash = bcrypt.hashSync('Admin@123', 10);
  const custHash = bcrypt.hashSync('Customer@123', 10);

  memoryUsers = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@perfumeshop.com',
      password_hash: adminHash,
      role: 'admin',
      phone: '+91 98765 43210',
      address: 'Plot 42, Perfume Tower, Anna Salai',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600002',
      created_at: new Date()
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'customer@perfumeshop.com',
      password_hash: custHash,
      role: 'customer',
      phone: '+91 91234 56789',
      address: 'Flat 304, Green Meadows, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      created_at: new Date()
    }
  ];

  memoryCategories = categoriesData.map((c, index) => ({
    id: index + 1,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image_url: c.image_url,
    created_at: new Date()
  }));

  memoryBrands = brandsData.map((b, index) => ({
    id: index + 1,
    name: b.name,
    slug: b.slug,
    description: b.description,
    logo_url: b.logo_url,
    created_at: new Date()
  }));

  memoryProducts = productsData.map((p, index) => {
    const brand = memoryBrands.find(b => b.slug === p.brandSlug);
    const category = memoryCategories.find(c => c.slug === p.categorySlug);
    return {
      id: index + 1,
      name: p.name,
      slug: p.slug,
      brand_id: brand ? brand.id : null,
      brand_name: brand ? brand.name : 'Florencia Luxe',
      category_id: category ? category.id : null,
      category_name: category ? category.name : 'Woody & Earthy',
      gender: p.gender,
      description: p.description,
      short_description: p.short_description,
      price: Number(p.price),
      discount_price: Number(p.discount_price),
      stock: p.stock,
      volume_ml: p.volume_ml,
      concentration: p.concentration,
      top_notes: p.top_notes,
      heart_notes: p.heart_notes,
      base_notes: p.base_notes,
      image_url: p.image_url,
      gallery_urls: p.gallery_urls,
      is_featured: p.is_featured,
      rating: p.rating,
      review_count: p.review_count,
      created_at: new Date()
    };
  });

  // Seed sample order
  const sampleOrderId = 1;
  const p1 = memoryProducts[0];
  const p2 = memoryProducts[1];
  const p1Price = p1.discount_price || p1.price;
  const p2Price = p2.discount_price || p2.price;
  const total = p1Price + p2Price;

  memoryOrders = [
    {
      id: sampleOrderId,
      order_number: 'ORD-2026-98101',
      user_id: 2,
      customer_name: 'Priya Sharma',
      customer_email: 'customer@perfumeshop.com',
      customer_phone: '+91 91234 56789',
      shipping_address: 'Flat 304, Green Meadows, Indiranagar',
      shipping_city: 'Bengaluru',
      shipping_state: 'Karnataka',
      shipping_pincode: '560038',
      subtotal: total,
      discount: 0,
      shipping_fee: 0,
      total_amount: total,
      payment_method: 'UPI',
      payment_status: 'paid',
      order_status: 'shipped',
      created_at: new Date(Date.now() - 86400000)
    }
  ];

  memoryOrderItems = [
    {
      id: 1,
      order_id: sampleOrderId,
      product_id: p1.id,
      product_name: p1.name,
      size_ml: 50,
      price: p1Price,
      quantity: 1,
      total_price: p1Price,
      image_url: p1.image_url
    },
    {
      id: 2,
      order_id: sampleOrderId,
      product_id: p2.id,
      product_name: p2.name,
      size_ml: 50,
      price: p2Price,
      quantity: 1,
      total_price: p2Price,
      image_url: p2.image_url
    }
  ];

  memoryAddresses = [
    {
      id: 1,
      user_id: 2,
      full_name: 'Priya Sharma',
      phone: '+91 91234 56789',
      address_line1: 'Flat 304, Green Meadows',
      address_line2: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      address_type: 'Home',
      is_default: true,
      created_at: new Date()
    }
  ];

  // Dynamic Home Page Sliders (Exact 4 luxury slides)
  memorySliders = [
    {
      id: 1,
      tag: "HAUTE PARFUMERIE • EXCLUSIVE COLLECTION",
      offer_badge: "30% OFF",
      title: "Discover Your Signature Scent",
      subtitle: "Immerse yourself in artisanal French master perfumery. Handcrafted with precious floral and rare woody essences to create a captivating, long-lasting luxury aura.",
      primary_btn_text: "Shop Now",
      primary_btn_link: "/products",
      secondary_btn_text: "Explore Collections",
      secondary_btn_link: "/products?sort=rating",
      image_url: "/uploads/perfume-1793512240544-960322898.jpg",
      bg_gradient: "linear-gradient(135deg, #F5F3F8 0%, #E9E5F2 50%, #DDD8E8 100%)",
      accent_color: "#292536",
      display_order: 1,
      is_active: true,
      created_at: new Date()
    },
    {
      id: 2,
      tag: "WOMEN'S COUTURE COLLECTION",
      offer_badge: "25% OFF",
      title: "Elegance in Every Drop.",
      subtitle: "Delicate bouquets of French Grasse rose, nocturnal jasmine, and velvet white musk crafted for timeless poise and grace.",
      primary_btn_text: "Explore Women's Collection",
      primary_btn_link: "/products?gender=Women",
      secondary_btn_text: "Floral Blends",
      secondary_btn_link: "/products?gender=Women&sort=rating",
      image_url: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1200&q=85",
      bg_gradient: "linear-gradient(135deg, #FAF3F6 0%, #F6E6ED 50%, #EED5E0 100%)",
      accent_color: "#9C3A63",
      display_order: 2,
      is_active: true,
      created_at: new Date()
    },
    {
      id: 3,
      tag: "GENDERLESS NICHE EDITIONS",
      offer_badge: "BUY 1 GET 1 OFFER",
      title: "Fragrance Without Limits.",
      subtitle: "Boundary-defying unisex creations uniting crisp ocean breezes, sparkling bergamot zest, and rich Madagascar vanilla.",
      primary_btn_text: "Explore Unisex Collection",
      primary_btn_link: "/products?gender=Unisex",
      secondary_btn_text: "View All Fragrances",
      secondary_btn_link: "/products?gender=Unisex&sort=newest",
      image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85",
      bg_gradient: "linear-gradient(135deg, #F1F6F4 0%, #E2ECE8 50%, #D1DFDB 100%)",
      accent_color: "#2E6656",
      display_order: 3,
      is_active: true,
      created_at: new Date()
    },
    {
      id: 4,
      tag: "HAUTE LUXURY RESERVE",
      offer_badge: "UP TO 40% OFF",
      title: "Experience Luxury Fragrances.",
      subtitle: "Precious aged Cambodian agarwood, crystal ambergris, and rare royal saffron formulations with 14+ hour sillage.",
      primary_btn_text: "Shop Luxury Collection",
      primary_btn_link: "/products?category=woody-earthy",
      secondary_btn_text: "Explore Oud Blends",
      secondary_btn_link: "/products?sort=rating",
      image_url: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85",
      bg_gradient: "linear-gradient(135deg, #F9F5EC 0%, #F2E9D4 50%, #E7D8B6 100%)",
      accent_color: "#9A7322",
      display_order: 4,
      is_active: true,
      created_at: new Date()
    }
  ];

  // Dynamic Home Page Sections Visibility & Display Order
  memorySections = [
    {
      id: 1,
      section_key: 'hero_slider',
      name: 'Hero Slider',
      title: 'Hero Image Slider',
      subtitle: 'Dynamic full-width 4-slide carousel',
      is_enabled: true,
      display_order: 1
    },
    {
      id: 2,
      section_key: 'value_props',
      name: 'Value Propositions',
      title: 'Our Craftsmanship Commitments',
      subtitle: 'Why perfume lovers choose ÉLIXIR',
      is_enabled: true,
      display_order: 2
    },
    {
      id: 3,
      section_key: 'categories',
      name: 'Fragrance Families / Categories',
      title: 'Explore Fragrance Families',
      subtitle: 'Curated By Scent Family',
      is_enabled: true,
      display_order: 3
    },
    {
      id: 4,
      section_key: 'featured_products',
      name: 'Featured Products',
      title: 'Trending Artisanal Blends',
      subtitle: 'Hand-picked luxury selections',
      is_enabled: true,
      display_order: 4
    },
    {
      id: 5,
      section_key: 'special_offer',
      name: 'Special Promotional Banner',
      title: 'Exclusive Privilege Offer',
      subtitle: 'Complimentary Discovery Atomizer Set',
      is_enabled: true,
      display_order: 5
    },
    {
      id: 6,
      section_key: 'best_sellers',
      name: 'Best Sellers',
      title: 'Signature Bestsellers',
      subtitle: 'Most coveted 12+ hour sillage formulations',
      is_enabled: true,
      display_order: 6
    },
    {
      id: 7,
      section_key: 'new_arrivals',
      name: 'New Arrivals',
      title: 'New In The House',
      subtitle: 'Fresh extraits from master French perfumers',
      is_enabled: true,
      display_order: 7
    },
    {
      id: 8,
      section_key: 'fragrance_pyramid',
      name: 'Fragrance Pyramid Guide',
      title: 'How An Artisanal Perfume Evolves',
      subtitle: 'The 3-stage olfactory architecture',
      is_enabled: true,
      display_order: 8
    },
    {
      id: 9,
      section_key: 'testimonials',
      name: 'Customer Reviews',
      title: 'The Connoisseur Verdict',
      subtitle: 'Loved By 25,000+ Fragrance Aficionados',
      is_enabled: true,
      display_order: 9
    },
    {
      id: 10,
      section_key: 'newsletter',
      name: 'Newsletter VIP Signup',
      title: 'Join The ÉLIXIR Circle',
      subtitle: 'Receive private allocation notices & 10% off',
      is_enabled: true,
      display_order: 10
    }
  ];

  // Dynamic Home Page Promotional Offers
  memoryOffers = [
    {
      id: 1,
      badge: 'LIMITED TIME PRIVILEGE',
      title: 'Complimentary Discovery Atomizer Set',
      description: 'Receive a deluxe 3x5ml discovery flight featuring our most coveted artisanal extraits with every order above ₹2,499. Unlock your exclusive 10% off coupon code below.',
      discount_pct: '10% OFF + GIFT',
      code: 'NOIR10',
      banner_image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
      link: '/products',
      btn_text: 'Claim Privilege Offer',
      start_date: '2026-10-01',
      end_date: '2026-12-31',
      is_active: true,
      created_at: new Date()
    }
  ];

  if (!loadLocalHomeData()) {
    saveLocalHomeData();
  }
}

function saveLocalHomeData() {
  try {
    const data = {
      memorySliders,
      memorySections,
      memoryOffers,
      memoryCollections,
      memoryWishlists
    };
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('Failed to save local home data:', err.message);
  }
}

function loadLocalHomeData() {
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const content = fs.readFileSync(LOCAL_STORE_FILE, 'utf8');
      const data = JSON.parse(content);
      if (Array.isArray(data.memorySliders) && data.memorySliders.length > 0) {
        memorySliders = data.memorySliders;
      }
      if (Array.isArray(data.memorySections) && data.memorySections.length > 0) {
        memorySections = data.memorySections;
      }
      if (Array.isArray(data.memoryOffers) && data.memoryOffers.length > 0) {
        memoryOffers = data.memoryOffers;
      }
      if (data.memoryCollections) {
        memoryCollections = data.memoryCollections;
      }
      if (Array.isArray(data.memoryWishlists)) {
        memoryWishlists = data.memoryWishlists;
      }
      return true;
    }
  } catch (err) {
    console.warn('Failed to load local home data:', err.message);
  }
  return false;
}

initMemoryStore();

// --- DATA ACCESS METHODS WITH POSTGRES & SEAMLESS FALLBACK ---

const Store = {
  // USER METHODS
  async findUserByEmail(email) {
    if (!email) return null;
    if (db.getIsConnected()) {
      try {
        const res = await db.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryUsers.find(u => u.email && u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  async findUserByGoogleId(googleId) {
    if (!googleId) return null;
    if (db.getIsConnected()) {
      try {
        const res = await db.query('SELECT * FROM users WHERE google_id = $1', [googleId]);
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG findUserByGoogleId error, using memory fallback:', err.message);
      }
    }
    return memoryUsers.find(u => u.google_id === googleId) || null;
  },

  async findUserById(id) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query('SELECT id, name, email, role, phone, address, city, state, pincode, google_id, avatar, auth_provider, created_at FROM users WHERE id = $1', [id]);
        return res.rows[0] || null;
      } catch (err) {
        // fallback in case optional oauth columns are pending
        try {
          const resFallback = await db.query('SELECT id, name, email, role, phone, address, city, state, pincode, created_at FROM users WHERE id = $1', [id]);
          return resFallback.rows[0] || null;
        } catch (e) {
          console.warn('PG error, using memory fallback:', e.message);
        }
      }
    }
    const u = memoryUsers.find(u => u.id === Number(id));
    if (!u) return null;
    const { password_hash, ...safe } = u;
    return safe;
  },

  async createUser({ name, email, password_hash, role = 'customer', phone, address, city, state, pincode, google_id = null, avatar = null, auth_provider = 'local' }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO users (name, email, password_hash, role, phone, address, city, state, pincode, google_id, avatar, auth_provider)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           RETURNING id, name, email, role, phone, address, city, state, pincode, google_id, avatar, auth_provider, created_at`,
          [name, email, password_hash, role, phone, address, city, state, pincode, google_id, avatar, auth_provider]
        );
        return res.rows[0];
      } catch (err) {
        try {
          const resFallback = await db.query(
            `INSERT INTO users (name, email, password_hash, role, phone, address, city, state, pincode)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, name, email, role, phone, address, city, state, pincode, created_at`,
            [name, email, password_hash, role, phone, address, city, state, pincode]
          );
          return resFallback.rows[0];
        } catch (e) {
          console.warn('PG error, using memory fallback:', e.message);
        }
      }
    }
    const newUser = {
      id: nextId(),
      name,
      email,
      password_hash,
      role,
      phone,
      address,
      city,
      state,
      pincode,
      google_id,
      avatar,
      auth_provider,
      created_at: new Date()
    };
    memoryUsers.push(newUser);
    const { password_hash: _, ...safe } = newUser;
    return safe;
  },

  async updateUser(id, fields) {
    if (db.getIsConnected()) {
      try {
        const sets = [];
        const vals = [];
        let i = 1;
        for (const [k, v] of Object.entries(fields)) {
          sets.push(`${k} = $${i}`);
          vals.push(v);
          i++;
        }
        vals.push(id);
        const res = await db.query(
          `UPDATE users SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${i} 
           RETURNING id, name, email, role, phone, address, city, state, pincode`,
          vals
        );
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    const user = memoryUsers.find(u => u.id === Number(id));
    if (!user) return null;
    Object.assign(user, fields);
    const { password_hash, ...safe } = user;
    return safe;
  },

  async getAllUsers() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT u.id, u.name, u.email, u.role, u.phone, u.city, u.created_at,
                  COUNT(o.id) AS total_orders,
                  COALESCE(SUM(o.total_amount), 0) AS total_spent
           FROM users u
           LEFT JOIN orders o ON o.user_id = u.id
           WHERE u.role != 'admin'
           GROUP BY u.id
           ORDER BY u.created_at DESC`
        );
        return res.rows;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryUsers
      .filter(u => u.role !== 'admin')
      .map(u => {
        const orders = memoryOrders.filter(o => o.user_id === u.id);
        const totalSpent = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
        return {
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          phone: u.phone,
          city: u.city,
          created_at: u.created_at,
          total_orders: orders.length,
          total_spent: totalSpent
        };
      });
  },

  // CATEGORY METHODS
  async getAllCategories() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT c.*, COUNT(p.id) AS product_count 
           FROM categories c 
           LEFT JOIN products p ON p.category_id = c.id 
           GROUP BY c.id 
           ORDER BY c.id ASC`
        );
        return res.rows;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryCategories.map(c => ({
      ...c,
      product_count: memoryProducts.filter(p => p.category_id === c.id).length
    }));
  },

  async createCategory({ name, slug, description, image_url }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO categories (name, slug, description, image_url)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [name, slug, description, image_url]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    const newCat = { id: nextId(), name, slug, description, image_url, created_at: new Date() };
    memoryCategories.push(newCat);
    return newCat;
  },

  async updateCategory(id, { name, slug, description, image_url }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `UPDATE categories SET name=$1, slug=$2, description=$3, image_url=$4 WHERE id=$5 RETURNING *`,
          [name, slug, description, image_url, id]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    const cat = memoryCategories.find(c => c.id === Number(id));
    if (cat) {
      Object.assign(cat, { name, slug, description, image_url });
    }
    return cat;
  },

  async deleteCategory(id) {
    if (db.getIsConnected()) {
      try {
        await db.query('DELETE FROM categories WHERE id = $1', [id]);
        return true;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    memoryCategories = memoryCategories.filter(c => c.id !== Number(id));
    return true;
  },

  // BRAND METHODS
  async getAllBrands() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT b.*, COUNT(p.id) AS product_count 
           FROM brands b 
           LEFT JOIN products p ON p.brand_id = b.id 
           GROUP BY b.id 
           ORDER BY b.name ASC`
        );
        return res.rows;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryBrands.map(b => ({
      ...b,
      product_count: memoryProducts.filter(p => p.brand_id === b.id).length
    }));
  },

  async createBrand({ name, slug, description, logo_url }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO brands (name, slug, description, logo_url)
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [name, slug, description, logo_url]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    const newBrand = { id: nextId(), name, slug, description, logo_url, created_at: new Date() };
    memoryBrands.push(newBrand);
    return newBrand;
  },

  async updateBrand(id, { name, slug, description, logo_url }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `UPDATE brands SET name=$1, slug=$2, description=$3, logo_url=$4 WHERE id=$5 RETURNING *`,
          [name, slug, description, logo_url, id]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    const brand = memoryBrands.find(b => b.id === Number(id));
    if (brand) {
      Object.assign(brand, { name, slug, description, logo_url });
    }
    return brand;
  },

  async deleteBrand(id) {
    if (db.getIsConnected()) {
      try {
        await db.query('DELETE FROM brands WHERE id = $1', [id]);
        return true;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    memoryBrands = memoryBrands.filter(b => b.id !== Number(id));
    return true;
  },

  // PRODUCT METHODS
  async getProducts({ category, category_id, brand, brand_id, gender, notes, minPrice, maxPrice, size, search, sort, page = 1, limit = 20 }) {
    if (db.getIsConnected()) {
      try {
        let where = ['1=1'];
        let params = [];
        let pIndex = 1;

        if (category_id) {
          where.push(`p.category_id = $${pIndex}`);
          params.push(Number(category_id));
          pIndex++;
        } else if (category) {
          where.push(`(c.slug = $${pIndex} OR c.name ILIKE $${pIndex})`);
          params.push(category);
          pIndex++;
        }
        if (brand) {
          where.push(`(b.slug = $${pIndex} OR b.name ILIKE $${pIndex})`);
          params.push(brand);
          pIndex++;
        }
        if (gender) {
          where.push(`p.gender = $${pIndex}`);
          params.push(gender);
          pIndex++;
        }
        if (minPrice) {
          where.push(`COALESCE(p.discount_price, p.price) >= $${pIndex}`);
          params.push(Number(minPrice));
          pIndex++;
        }
        if (maxPrice) {
          where.push(`COALESCE(p.discount_price, p.price) <= $${pIndex}`);
          params.push(Number(maxPrice));
          pIndex++;
        }
        if (size) {
          where.push(`p.volume_ml = $${pIndex}`);
          params.push(Number(size));
          pIndex++;
        }
        if (notes) {
          where.push(`(
            EXISTS (SELECT 1 FROM unnest(p.top_notes) tn WHERE tn ILIKE $${pIndex}) OR
            EXISTS (SELECT 1 FROM unnest(p.heart_notes) hn WHERE hn ILIKE $${pIndex}) OR
            EXISTS (SELECT 1 FROM unnest(p.base_notes) bn WHERE bn ILIKE $${pIndex})
          )`);
          params.push(`%${notes}%`);
          pIndex++;
        }
        if (search) {
          where.push(`(p.name ILIKE $${pIndex} OR c.name ILIKE $${pIndex} OR b.name ILIKE $${pIndex} OR p.description ILIKE $${pIndex} OR p.short_description ILIKE $${pIndex})`);
          params.push(`%${search}%`);
          pIndex++;
        }

        let orderBy = 'p.is_featured DESC, p.created_at DESC';
        if (sort === 'price-asc') orderBy = 'COALESCE(p.discount_price, p.price) ASC';
        if (sort === 'price-desc') orderBy = 'COALESCE(p.discount_price, p.price) DESC';
        if (sort === 'rating') orderBy = 'p.rating DESC';
        if (sort === 'newest') orderBy = 'p.created_at DESC';

        const offset = (Number(page) - 1) * Number(limit);

        const countQuery = `
          SELECT COUNT(*) as total 
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          LEFT JOIN brands b ON p.brand_id = b.id
          WHERE ${where.join(' AND ')}
        `;
        const countRes = await db.query(countQuery, params);
        const total = parseInt(countRes.rows[0].total, 10);

        const listQuery = `
          SELECT p.*, c.name as category_name, c.slug as category_slug,
                 b.name as brand_name, b.slug as brand_slug
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          LEFT JOIN brands b ON p.brand_id = b.id
          WHERE ${where.join(' AND ')}
          ORDER BY ${orderBy}
          LIMIT $${pIndex} OFFSET $${pIndex + 1}
        `;
        params.push(Number(limit), offset);
        const res = await db.query(listQuery, params);

        return {
          products: res.rows,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit))
          }
        };
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    // In-memory query filter engine
    let list = [...memoryProducts];

    if (category) {
      list = list.filter(p => {
        const cat = memoryCategories.find(c => c.id === p.category_id);
        return cat && (cat.slug === category || cat.name.toLowerCase() === category.toLowerCase());
      });
    }

    if (brand) {
      list = list.filter(p => {
        const b = memoryBrands.find(br => br.id === p.brand_id);
        return b && (b.slug === brand || b.name.toLowerCase() === brand.toLowerCase());
      });
    }

    if (gender) {
      list = list.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    }

    if (minPrice) {
      list = list.filter(p => (p.discount_price || p.price) >= Number(minPrice));
    }

    if (maxPrice) {
      list = list.filter(p => (p.discount_price || p.price) <= Number(maxPrice));
    }

    if (size) {
      list = list.filter(p => p.volume_ml === Number(size));
    }

    if (notes) {
      const qNote = notes.toLowerCase();
      list = list.filter(p => {
        const allNotes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].join(' ').toLowerCase();
        return allNotes.includes(qNote);
      });
    }

    if (search) {
      const s = search.toLowerCase();
      const isYsl = s === 'ysl';
      list = list.filter(p => {
        const cat = memoryCategories.find(c => c.id === p.category_id);
        const b = memoryBrands.find(br => br.id === p.brand_id);
        const catName = (cat ? cat.name : (p.category_name || '')).toLowerCase();
        const brandName = (b ? b.name : (p.brand_name || '')).toLowerCase();
        const brandSlug = (b ? b.slug : (p.brand_slug || '')).toLowerCase();
        return (
          p.name.toLowerCase().includes(s) || 
          catName.includes(s) ||
          brandName.includes(s) ||
          brandSlug.includes(s) ||
          (isYsl && (brandSlug === 'ysl' || brandName.includes('saint laurent') || p.name.toLowerCase().includes('saint laurent'))) ||
          (p.short_description && p.short_description.toLowerCase().includes(s)) ||
          p.description.toLowerCase().includes(s)
        );
      });
    }

    if (sort === 'price-asc') {
      list.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    const total = list.length;
    const offset = (Number(page) - 1) * Number(limit);
    const paginated = list.slice(offset, offset + Number(limit));

    return {
      products: paginated,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    };
  },

  async getSearchSuggestions(query, limit = 8) {
    const q = (query || '').trim();
    if (!q) {
      return { products: [], categories: [], brands: [], totalMatches: 0 };
    }

    if (db.getIsConnected()) {
      try {
        const param = `%${q}%`;
        const productsQuery = `
          SELECT p.id, p.name, p.slug, p.price, p.discount_price, p.image_url, p.rating, p.volume_ml,
                 c.name as category_name, c.slug as category_slug,
                 b.name as brand_name, b.slug as brand_slug
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          LEFT JOIN brands b ON p.brand_id = b.id
          WHERE p.name ILIKE $1 OR c.name ILIKE $1 OR b.name ILIKE $1 OR p.short_description ILIKE $1
          ORDER BY 
            CASE 
              WHEN p.name ILIKE $2 THEN 1
              WHEN p.name ILIKE $1 THEN 2
              WHEN b.name ILIKE $1 THEN 3
              WHEN c.name ILIKE $1 THEN 4
              ELSE 5
            END,
            p.rating DESC
          LIMIT $3
        `;
        const prodRes = await db.query(productsQuery, [param, `${q}%`, limit]);

        const countQuery = `
          SELECT COUNT(*) as total
          FROM products p
          LEFT JOIN categories c ON p.category_id = c.id
          LEFT JOIN brands b ON p.brand_id = b.id
          WHERE p.name ILIKE $1 OR c.name ILIKE $1 OR b.name ILIKE $1 OR p.short_description ILIKE $1
        `;
        const countRes = await db.query(countQuery, [param]);

        const catQuery = `
          SELECT id, name, slug 
          FROM categories 
          WHERE name ILIKE $1 OR slug ILIKE $1 
          LIMIT 3
        `;
        const catRes = await db.query(catQuery, [param]);

        const brandQuery = `
          SELECT id, name, slug 
          FROM brands 
          WHERE name ILIKE $1 OR slug ILIKE $1 
          LIMIT 3
        `;
        const brandRes = await db.query(brandQuery, [param]);

        return {
          products: prodRes.rows,
          categories: catRes.rows,
          brands: brandRes.rows,
          totalMatches: parseInt(countRes.rows[0].total, 10)
        };
      } catch (err) {
        console.warn('PG suggestions error, using memory fallback:', err.message);
      }
    }

    // In-memory auto-suggestions matching name, category, and brand
    const s = q.toLowerCase();
    const isYsl = s === 'ysl';

    // 1. Categories match
    const matchingCategories = memoryCategories
      .filter(c => c.name.toLowerCase().includes(s) || c.slug.toLowerCase().includes(s))
      .slice(0, 3)
      .map(c => ({ id: c.id, name: c.name, slug: c.slug }));

    // 2. Brands match
    const matchingBrands = memoryBrands
      .filter(b => b.name.toLowerCase().includes(s) || b.slug.toLowerCase().includes(s) || (isYsl && b.slug === 'ysl'))
      .slice(0, 3)
      .map(b => ({ id: b.id, name: b.name, slug: b.slug }));

    // 3. Products match by name, category, and brand
    const matchedProducts = [];
    for (const p of memoryProducts) {
      const cat = memoryCategories.find(c => c.id === p.category_id);
      const b = memoryBrands.find(br => br.id === p.brand_id);
      const catName = cat ? cat.name : (p.category_name || '');
      const brandName = b ? b.name : (p.brand_name || '');
      const brandSlug = b ? b.slug : (p.brand_slug || '');

      const nameLower = p.name.toLowerCase();
      const catLower = catName.toLowerCase();
      const brandLower = brandName.toLowerCase();
      const descLower = (p.short_description || '').toLowerCase();

      let score = 0;
      if (nameLower.startsWith(s)) score = 100;
      else if (nameLower.includes(s)) score = 80;
      else if (brandLower.includes(s) || (isYsl && brandSlug === 'ysl')) score = 60;
      else if (catLower.includes(s)) score = 50;
      else if (descLower.includes(s)) score = 30;

      if (score > 0) {
        matchedProducts.push({
          score,
          product: {
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            discount_price: p.discount_price,
            image_url: p.image_url,
            rating: p.rating,
            volume_ml: p.volume_ml,
            category_name: catName,
            category_slug: cat ? cat.slug : '',
            brand_name: brandName,
            brand_slug: b ? b.slug : ''
          }
        });
      }
    }

    matchedProducts.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (b.product.rating || 0) - (a.product.rating || 0);
    });

    const totalMatches = matchedProducts.length;
    const products = matchedProducts.slice(0, limit).map(m => m.product);

    return {
      products,
      categories: matchingCategories,
      brands: matchingBrands,
      totalMatches
    };
  },

  async getFeaturedProducts() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT p.*, c.name as category_name, b.name as brand_name
           FROM products p
           LEFT JOIN categories c ON p.category_id = c.id
           LEFT JOIN brands b ON p.brand_id = b.id
           WHERE p.is_featured = true
           ORDER BY p.rating DESC, p.created_at DESC
           LIMIT 20`
        );
        return res.rows;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryProducts.filter(p => p.is_featured).slice(0, 20);
  },

  async getProductById(id) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT p.*, c.name as category_name, c.slug as category_slug,
                  b.name as brand_name, b.slug as brand_slug
           FROM products p
           LEFT JOIN categories c ON p.category_id = c.id
           LEFT JOIN brands b ON p.brand_id = b.id
           WHERE p.id = $1`,
          [id]
        );
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryProducts.find(p => p.id === Number(id)) || null;
  },

  async getProductBySlug(slug) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT p.*, c.name as category_name, c.slug as category_slug,
                  b.name as brand_name, b.slug as brand_slug
           FROM products p
           LEFT JOIN categories c ON p.category_id = c.id
           LEFT JOIN brands b ON p.brand_id = b.id
           WHERE p.slug = $1`,
          [slug]
        );
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryProducts.find(p => p.slug === slug) || null;
  },

  async getRelatedProducts(productId, categoryId, limit = 4) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT p.*, c.name as category_name, b.name as brand_name
           FROM products p
           LEFT JOIN categories c ON p.category_id = c.id
           LEFT JOIN brands b ON p.brand_id = b.id
           WHERE p.id != $1 AND (p.category_id = $2 OR $2 IS NULL)
           ORDER BY p.rating DESC
           LIMIT $3`,
          [productId, categoryId, limit]
        );
        return res.rows;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    return memoryProducts
      .filter(p => p.id !== Number(productId) && (!categoryId || p.category_id === Number(categoryId)))
      .slice(0, limit);
  },

  async createProduct(data) {
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const topNotes = Array.isArray(data.top_notes) ? data.top_notes : (data.top_notes ? data.top_notes.split(',').map(s=>s.trim()) : []);
    const heartNotes = Array.isArray(data.heart_notes) ? data.heart_notes : (data.heart_notes ? data.heart_notes.split(',').map(s=>s.trim()) : []);
    const baseNotes = Array.isArray(data.base_notes) ? data.base_notes : (data.base_notes ? data.base_notes.split(',').map(s=>s.trim()) : []);

    const img1 = data.image_url_1 || data.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
    const img2 = data.image_url_2 || null;
    const img3 = data.image_url_3 || null;
    const galleryUrls = data.gallery_urls && Array.isArray(data.gallery_urls) && data.gallery_urls.length > 0 
      ? data.gallery_urls 
      : [img1, img2, img3].filter(Boolean);

    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO products 
           (name, slug, brand_id, category_id, gender, description, short_description, price, discount_price, 
            stock, volume_ml, concentration, top_notes, heart_notes, base_notes, image_url, image_url_1, image_url_2, image_url_3, gallery_urls, is_featured)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
           RETURNING *`,
          [
            data.name,
            slug,
            data.brand_id || null,
            data.category_id || null,
            data.gender || 'Unisex',
            data.description || '',
            data.short_description || '',
            Number(data.price),
            data.discount_price ? Number(data.discount_price) : null,
            Number(data.stock || 0),
            Number(data.volume_ml || 50),
            data.concentration || 'Eau De Parfum (EDP)',
            topNotes,
            heartNotes,
            baseNotes,
            img1,
            img1,
            img2,
            img3,
            galleryUrls,
            Boolean(data.is_featured)
          ]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    const brand = memoryBrands.find(b => b.id === Number(data.brand_id));
    const category = memoryCategories.find(c => c.id === Number(data.category_id));

    const newProd = {
      id: nextId(),
      name: data.name,
      slug,
      brand_id: data.brand_id ? Number(data.brand_id) : null,
      brand_name: brand ? brand.name : 'Florencia Luxe',
      category_id: data.category_id ? Number(data.category_id) : null,
      category_name: category ? category.name : 'Woody & Earthy',
      gender: data.gender || 'Unisex',
      description: data.description || '',
      short_description: data.short_description || '',
      price: Number(data.price),
      discount_price: data.discount_price ? Number(data.discount_price) : null,
      stock: Number(data.stock || 0),
      volume_ml: Number(data.volume_ml || 50),
      concentration: data.concentration || 'Eau De Parfum (EDP)',
      top_notes: topNotes,
      heart_notes: heartNotes,
      base_notes: baseNotes,
      image_url: data.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      gallery_urls: data.gallery_urls || [],
      is_featured: Boolean(data.is_featured),
      rating: 5.0,
      review_count: 0,
      created_at: new Date()
    };
    memoryProducts.unshift(newProd);
    return newProd;
  },

  async updateProductImage(id, imageUrl) {
    if (!imageUrl) throw new Error('Image URL is required.');
    const numId = Number(id);

    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `UPDATE products 
           SET 
             image_url = $1, 
             image_url_1 = $1,
             gallery_urls = ARRAY[$1, COALESCE(image_url_2, $1), COALESCE(image_url_3, $1)],
             updated_at = NOW() 
           WHERE id = $2 
           RETURNING *`,
          [imageUrl, numId]
        );
        if (res.rows.length > 0) {
          const updated = res.rows[0];
          const memIndex = memoryProducts.findIndex(p => p.id === numId);
          if (memIndex !== -1) {
            memoryProducts[memIndex] = { 
              ...memoryProducts[memIndex], 
              image_url: imageUrl,
              image_url_1: imageUrl,
              gallery_urls: [imageUrl, memoryProducts[memIndex].image_url_2 || imageUrl, memoryProducts[memIndex].image_url_3 || imageUrl]
            };
          }
          return updated;
        }
        return null;
      } catch (err) {
        console.error('PostgreSQL updateProductImage error:', err.message);
        throw err;
      }
    }

    const prod = memoryProducts.find(p => p.id === numId);
    if (!prod) return null;
    prod.image_url = imageUrl;
    prod.image_url_1 = imageUrl;
    if (!Array.isArray(prod.gallery_urls)) prod.gallery_urls = [];
    prod.gallery_urls[0] = imageUrl;
    return prod;
  },

  async getProduct3Images(id) {
    const numId = Number(id);
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT id, name, slug, image_url, image_url_1, image_url_2, image_url_3, gallery_urls 
           FROM products 
           WHERE id = $1`,
          [numId]
        );
        if (res.rows.length > 0) {
          const row = res.rows[0];
          const g = Array.isArray(row.gallery_urls) ? row.gallery_urls : [];
          const img1 = row.image_url_1 || row.image_url || g[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
          const img2 = row.image_url_2 || (g.length > 1 ? g[1] : (g.length > 0 && g[0] !== img1 ? g[0] : 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80'));
          const img3 = row.image_url_3 || (g.length > 2 ? g[2] : (g.length > 1 && g[1] !== img2 ? g[1] : 'https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80'));
          return {
            id: row.id,
            name: row.name,
            slug: row.slug,
            image_url_1: img1,
            image_url_2: img2,
            image_url_3: img3,
            images: [img1, img2, img3]
          };
        }
        return null;
      } catch (err) {
        console.error('PostgreSQL getProduct3Images error:', err.message);
        throw err;
      }
    }
    const prod = memoryProducts.find(p => p.id === numId);
    if (!prod) return null;
    const g = Array.isArray(prod.gallery_urls) ? prod.gallery_urls : [];
    const img1 = prod.image_url_1 || prod.image_url || g[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
    const img2 = prod.image_url_2 || (g.length > 1 ? g[1] : 'https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80');
    const img3 = prod.image_url_3 || (g.length > 2 ? g[2] : 'https://images.unsplash.com/photo-1558710347-d8257f52e427?auto=format&fit=crop&w=800&q=80');
    return {
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      image_url_1: img1,
      image_url_2: img2,
      image_url_3: img3,
      images: [img1, img2, img3]
    };
  },

  async updateProduct3Image(id, imageIndex, imageUrl) {
    if (!imageUrl) throw new Error('Image URL is required.');
    const numId = Number(id);
    const idx = Number(imageIndex);
    if (![1, 2, 3].includes(idx)) {
      throw new Error('Image index must be 1, 2, or 3.');
    }

    if (db.getIsConnected()) {
      try {
        let query = '';
        if (idx === 1) {
          query = `
            UPDATE products 
            SET 
              image_url_1 = $1, 
              image_url = $1,
              gallery_urls = ARRAY[$1, COALESCE(image_url_2, $1), COALESCE(image_url_3, $1)],
              updated_at = NOW() 
            WHERE id = $2 
            RETURNING *`;
        } else if (idx === 2) {
          query = `
            UPDATE products 
            SET 
              image_url_2 = $1,
              gallery_urls = ARRAY[COALESCE(image_url_1, image_url), $1, COALESCE(image_url_3, $1)],
              updated_at = NOW() 
            WHERE id = $2 
            RETURNING *`;
        } else {
          query = `
            UPDATE products 
            SET 
              image_url_3 = $1,
              gallery_urls = ARRAY[COALESCE(image_url_1, image_url), COALESCE(image_url_2, image_url), $1],
              updated_at = NOW() 
            WHERE id = $2 
            RETURNING *`;
        }

        const res = await db.query(query, [imageUrl, numId]);
        if (res.rows.length > 0) {
          const updated = res.rows[0];
          const memIndex = memoryProducts.findIndex(p => p.id === numId);
          if (memIndex !== -1) {
            const col = `image_url_${idx}`;
            memoryProducts[memIndex][col] = imageUrl;
            if (idx === 1) memoryProducts[memIndex].image_url = imageUrl;
            if (!Array.isArray(memoryProducts[memIndex].gallery_urls)) {
              memoryProducts[memIndex].gallery_urls = [];
            }
            memoryProducts[memIndex].gallery_urls[idx - 1] = imageUrl;
          }
          return updated;
        }
        return null;
      } catch (err) {
        console.error('PostgreSQL updateProduct3Image error:', err.message);
        throw err;
      }
    }

    const prod = memoryProducts.find(p => p.id === numId);
    if (!prod) return null;
    const col = `image_url_${idx}`;
    prod[col] = imageUrl;
    if (idx === 1) prod.image_url = imageUrl;
    if (!Array.isArray(prod.gallery_urls)) prod.gallery_urls = [];
    prod.gallery_urls[idx - 1] = imageUrl;
    return prod;
  },

  async updateProduct3Images(id, { image_url_1, image_url_2, image_url_3 }) {
    const numId = Number(id);
    if (db.getIsConnected()) {
      try {
        const sets = ['updated_at = NOW()'];
        const values = [];
        let pIndex = 1;

        if (image_url_1 !== undefined && image_url_1 !== null) {
          sets.push(`image_url_1 = $${pIndex++}`);
          values.push(image_url_1);
          sets.push(`image_url = $${pIndex++}`);
          values.push(image_url_1);
        }
        if (image_url_2 !== undefined && image_url_2 !== null) {
          sets.push(`image_url_2 = $${pIndex++}`);
          values.push(image_url_2);
        }
        if (image_url_3 !== undefined && image_url_3 !== null) {
          sets.push(`image_url_3 = $${pIndex++}`);
          values.push(image_url_3);
        }

        // Keep gallery_urls array in sync with the 3 images
        sets.push(`gallery_urls = ARRAY[
          COALESCE(image_url_1, image_url),
          COALESCE(image_url_2, image_url),
          COALESCE(image_url_3, image_url)
        ]`);

        values.push(numId);
        const query = `UPDATE products SET ${sets.join(', ')} WHERE id = $${pIndex} RETURNING *`;
        const res = await db.query(query, values);
        if (res.rows.length > 0) {
          const updated = res.rows[0];
          const memIndex = memoryProducts.findIndex(p => p.id === numId);
          if (memIndex !== -1) {
            if (image_url_1 !== undefined) {
              memoryProducts[memIndex].image_url_1 = image_url_1;
              memoryProducts[memIndex].image_url = image_url_1;
            }
            if (image_url_2 !== undefined) memoryProducts[memIndex].image_url_2 = image_url_2;
            if (image_url_3 !== undefined) memoryProducts[memIndex].image_url_3 = image_url_3;
          }
          return updated;
        }
        return null;
      } catch (err) {
        console.error('PostgreSQL updateProduct3Images error:', err.message);
        throw err;
      }
    }

    const prod = memoryProducts.find(p => p.id === numId);
    if (!prod) return null;
    if (image_url_1 !== undefined) {
      prod.image_url_1 = image_url_1;
      prod.image_url = image_url_1;
    }
    if (image_url_2 !== undefined) prod.image_url_2 = image_url_2;
    if (image_url_3 !== undefined) prod.image_url_3 = image_url_3;
    return prod;
  },

  async updateProduct(id, data) {
    const topNotes = Array.isArray(data.top_notes) ? data.top_notes : (data.top_notes ? data.top_notes.split(',').map(s=>s.trim()) : undefined);
    const heartNotes = Array.isArray(data.heart_notes) ? data.heart_notes : (data.heart_notes ? data.heart_notes.split(',').map(s=>s.trim()) : undefined);
    const baseNotes = Array.isArray(data.base_notes) ? data.base_notes : (data.base_notes ? data.base_notes.split(',').map(s=>s.trim()) : undefined);
    const numId = Number(id);

    if (db.getIsConnected()) {
      try {
        // Build dynamic update query to prevent overwriting existing fields with null
        const sets = ['updated_at = NOW()'];
        const values = [];
        let idx = 1;

        if (data.name !== undefined) { sets.push(`name = $${idx++}`); values.push(data.name); }
        if (data.brand_id !== undefined) { sets.push(`brand_id = $${idx++}`); values.push(data.brand_id ? Number(data.brand_id) : null); }
        if (data.category_id !== undefined) { sets.push(`category_id = $${idx++}`); values.push(data.category_id ? Number(data.category_id) : null); }
        if (data.gender !== undefined) { sets.push(`gender = $${idx++}`); values.push(data.gender); }
        if (data.description !== undefined) { sets.push(`description = $${idx++}`); values.push(data.description); }
        if (data.short_description !== undefined) { sets.push(`short_description = $${idx++}`); values.push(data.short_description); }
        if (data.price !== undefined) { sets.push(`price = $${idx++}`); values.push(Number(data.price)); }
        if (data.discount_price !== undefined) { sets.push(`discount_price = $${idx++}`); values.push(data.discount_price !== null && data.discount_price !== '' ? Number(data.discount_price) : null); }
        if (data.stock !== undefined) { sets.push(`stock = $${idx++}`); values.push(Number(data.stock)); }
        if (data.volume_ml !== undefined) { sets.push(`volume_ml = $${idx++}`); values.push(Number(data.volume_ml)); }
        if (data.concentration !== undefined) { sets.push(`concentration = $${idx++}`); values.push(data.concentration); }
        if (topNotes !== undefined) { sets.push(`top_notes = $${idx++}`); values.push(topNotes); }
        if (heartNotes !== undefined) { sets.push(`heart_notes = $${idx++}`); values.push(heartNotes); }
        if (baseNotes !== undefined) { sets.push(`base_notes = $${idx++}`); values.push(baseNotes); }
        if (data.image_url_1 !== undefined) {
          sets.push(`image_url_1 = $${idx++}`); values.push(data.image_url_1);
          sets.push(`image_url = $${idx++}`); values.push(data.image_url_1);
        } else if (data.image_url !== undefined) {
          sets.push(`image_url = $${idx++}`); values.push(data.image_url);
          sets.push(`image_url_1 = $${idx++}`); values.push(data.image_url);
        }
        if (data.image_url_2 !== undefined) {
          sets.push(`image_url_2 = $${idx++}`); values.push(data.image_url_2 || null);
        }
        if (data.image_url_3 !== undefined) {
          sets.push(`image_url_3 = $${idx++}`); values.push(data.image_url_3 || null);
        }
        if (data.gallery_urls !== undefined) {
          sets.push(`gallery_urls = $${idx++}`); values.push(data.gallery_urls);
        } else if (data.image_url_1 !== undefined || data.image_url !== undefined || data.image_url_2 !== undefined || data.image_url_3 !== undefined) {
          sets.push(`gallery_urls = ARRAY[
            COALESCE(image_url_1, image_url),
            COALESCE(image_url_2, image_url),
            COALESCE(image_url_3, image_url)
          ]`);
        }
        if (data.is_featured !== undefined) { sets.push(`is_featured = $${idx++}`); values.push(Boolean(data.is_featured)); }

        values.push(numId);
        const query = `UPDATE products SET ${sets.join(', ')} WHERE id = $${idx} RETURNING *`;
        const res = await db.query(query, values);

        if (res.rows.length > 0) {
          const updated = res.rows[0];
          const memIdx = memoryProducts.findIndex(p => p.id === numId);
          if (memIdx !== -1) {
            memoryProducts[memIdx] = { ...memoryProducts[memIdx], ...updated };
          }
          return updated;
        }
        return null;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    const prod = memoryProducts.find(p => p.id === numId);
    if (!prod) return null;

    if (data.name !== undefined) prod.name = data.name;
    if (data.brand_id !== undefined) {
      prod.brand_id = Number(data.brand_id);
      const b = memoryBrands.find(br => br.id === prod.brand_id);
      if (b) prod.brand_name = b.name;
    }
    if (data.category_id !== undefined) {
      prod.category_id = Number(data.category_id);
      const c = memoryCategories.find(cat => cat.id === prod.category_id);
      if (c) prod.category_name = c.name;
    }
    if (data.gender !== undefined) prod.gender = data.gender;
    if (data.description !== undefined) prod.description = data.description;
    if (data.short_description !== undefined) prod.short_description = data.short_description;
    if (data.price !== undefined) prod.price = Number(data.price);
    if (data.discount_price !== undefined) prod.discount_price = Number(data.discount_price);
    if (data.stock !== undefined) prod.stock = Number(data.stock);
    if (data.volume_ml !== undefined) prod.volume_ml = Number(data.volume_ml);
    if (data.concentration !== undefined) prod.concentration = data.concentration;
    if (topNotes !== undefined) prod.top_notes = topNotes;
    if (heartNotes !== undefined) prod.heart_notes = heartNotes;
    if (baseNotes !== undefined) prod.base_notes = baseNotes;
    if (data.image_url !== undefined) prod.image_url = data.image_url;
    if (data.is_featured !== undefined) prod.is_featured = Boolean(data.is_featured);

    return prod;
  },

  async deleteProduct(id) {
    if (db.getIsConnected()) {
      try {
        await db.query('DELETE FROM products WHERE id = $1', [id]);
        return true;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }
    memoryProducts = memoryProducts.filter(p => p.id !== Number(id));
    return true;
  },

  // ORDER METHODS
  async createOrder({ userId, customerName, customerEmail, customerPhone, address, city, state, pincode, items, subtotal, discount = 0, shippingFee = 0, totalAmount, paymentMethod = 'COD' }) {
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    if (db.getIsConnected()) {
      try {
        const orderRes = await db.query(
          `INSERT INTO orders 
           (order_number, user_id, customer_name, customer_email, customer_phone, 
            shipping_address, shipping_city, shipping_state, shipping_pincode, 
            subtotal, discount, shipping_fee, total_amount, payment_method, payment_status, order_status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
           RETURNING *`,
          [
            orderNumber,
            userId || null,
            customerName,
            customerEmail,
            customerPhone,
            address,
            city,
            state,
            pincode,
            subtotal,
            discount,
            shippingFee,
            totalAmount,
            paymentMethod,
            paymentMethod === 'COD' ? 'pending' : 'paid',
            'placed'
          ]
        );
        const order = orderRes.rows[0];

        // Record payment in payments table
        await db.query(
          `INSERT INTO payments (order_id, payment_method, transaction_id, amount, status)
           VALUES ($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING`,
          [order.id, paymentMethod, `TXN-${order.order_number}`, totalAmount, paymentMethod === 'COD' ? 'pending' : 'completed']
        );

        const insertedItems = [];
        for (const it of items) {
          const itemRes = await db.query(
            `INSERT INTO order_items (order_id, product_id, product_name, size_ml, price, quantity, total_price, image_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [order.id, it.productId || null, it.productName, it.size_ml || 50, it.price, it.quantity, it.price * it.quantity, it.imageUrl || null]
          );
          insertedItems.push(itemRes.rows[0]);

          // Decrement stock in products, product_variants, and inventory
          if (it.productId) {
            await db.query(`UPDATE products SET stock = GREATEST(0, stock - $1) WHERE id = $2`, [it.quantity, it.productId]);
            await db.query(`UPDATE product_variants SET stock = GREATEST(0, stock - $1) WHERE product_id = $2 AND size_ml = $3`, [it.quantity, it.productId, it.size_ml || 50]);
            await db.query(`UPDATE inventory SET current_stock = GREATEST(0, current_stock - $1), updated_at = NOW() WHERE product_id = $2`, [it.quantity, it.productId]);
          }
        }
        order.items = insertedItems;
        return order;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    const newOrder = {
      id: nextId(),
      order_number: orderNumber,
      user_id: userId ? Number(userId) : null,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      shipping_address: address,
      shipping_city: city,
      shipping_state: state,
      shipping_pincode: pincode,
      subtotal: Number(subtotal),
      discount: Number(discount),
      shipping_fee: Number(shippingFee),
      total_amount: Number(totalAmount),
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'COD' ? 'pending' : 'paid',
      order_status: 'placed',
      created_at: new Date()
    };

    const insertedItems = items.map(it => {
      // Decrement stock in memory
      const prod = memoryProducts.find(p => p.id === Number(it.productId));
      if (prod) {
        prod.stock = Math.max(0, prod.stock - it.quantity);
      }
      return {
        id: nextId(),
        order_id: newOrder.id,
        product_id: it.productId,
        product_name: it.productName,
        size_ml: it.size_ml || 50,
        price: Number(it.price),
        quantity: Number(it.quantity),
        total_price: Number(it.price) * Number(it.quantity),
        image_url: it.imageUrl
      };
    });

    memoryOrders.unshift(newOrder);
    memoryOrderItems.push(...insertedItems);
    newOrder.items = insertedItems;
    return newOrder;
  },

  async getOrdersByUser(userId) {
    if (db.getIsConnected()) {
      try {
        const orderRes = await db.query(
          `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
          [userId]
        );
        const orders = orderRes.rows;
        for (const o of orders) {
          const itemsRes = await db.query(`SELECT * FROM order_items WHERE order_id = $1`, [o.id]);
          o.items = itemsRes.rows;
        }
        return orders;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    const orders = memoryOrders.filter(o => o.user_id === Number(userId));
    return orders.map(o => ({
      ...o,
      items: memoryOrderItems.filter(item => item.order_id === o.id)
    }));
  },

  async getAllOrders() {
    if (db.getIsConnected()) {
      try {
        const orderRes = await db.query(`SELECT * FROM orders ORDER BY created_at DESC`);
        const orders = orderRes.rows;
        for (const o of orders) {
          const itemsRes = await db.query(`SELECT * FROM order_items WHERE order_id = $1`, [o.id]);
          o.items = itemsRes.rows;
        }
        return orders;
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    return memoryOrders.map(o => ({
      ...o,
      items: memoryOrderItems.filter(item => item.order_id === o.id)
    }));
  },

  async getOrderById(idOrOrderNumber) {
    if (db.getIsConnected()) {
      try {
        const isNum = !isNaN(Number(idOrOrderNumber)) && Number(idOrOrderNumber) > 0;
        const orderRes = await db.query(
          `SELECT * FROM orders WHERE id = $1 OR order_number = $2 LIMIT 1`,
          [isNum ? Number(idOrOrderNumber) : -1, String(idOrOrderNumber)]
        );
        if (orderRes.rows.length === 0) return null;
        const order = orderRes.rows[0];
        const itemsRes = await db.query(`SELECT * FROM order_items WHERE order_id = $1`, [order.id]);
        order.items = itemsRes.rows;
        const payRes = await db.query(`SELECT * FROM payments WHERE order_id = $1 LIMIT 1`, [order.id]);
        order.payment = payRes.rows[0] || null;
        return order;
      } catch (err) {
        console.warn('PG getOrderById error:', err.message);
      }
    }
    const ord = memoryOrders.find(o => o.id === Number(idOrOrderNumber) || o.order_number === String(idOrOrderNumber));
    if (!ord) return null;
    return {
      ...ord,
      items: memoryOrderItems.filter(item => item.order_id === ord.id)
    };
  },

  async updateOrderStatus(orderId, status) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `UPDATE orders SET order_status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
          [status, orderId]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    const ord = memoryOrders.find(o => o.id === Number(orderId));
    if (ord) {
      ord.order_status = status;
      ord.updated_at = new Date();
    }
    return ord;
  },

  // ADMIN DASHBOARD STATS
  async getAdminStats() {
    if (db.getIsConnected()) {
      try {
        const revRes = await db.query(`SELECT COALESCE(SUM(total_amount), 0) AS total_revenue, COUNT(id) AS total_orders FROM orders WHERE order_status != 'cancelled'`);
        const prodRes = await db.query(`SELECT COUNT(id) AS total_products FROM products`);
        const custRes = await db.query(`SELECT COUNT(id) AS total_customers FROM users WHERE role = 'customer'`);
        const lowStockRes = await db.query(`SELECT id, name, stock, image_url, price, discount_price FROM products WHERE stock <= 10 ORDER BY stock ASC`);
        const recentOrdersRes = await db.query(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 5`);

        return {
          totalRevenue: parseFloat(revRes.rows[0].total_revenue),
          totalOrders: parseInt(revRes.rows[0].total_orders, 10),
          totalProducts: parseInt(prodRes.rows[0].total_products, 10),
          totalCustomers: parseInt(custRes.rows[0].total_customers, 10),
          lowStockCount: lowStockRes.rows.length,
          lowStockProducts: lowStockRes.rows,
          recentOrders: recentOrdersRes.rows
        };
      } catch (err) {
        console.warn('PG error, using memory fallback:', err.message);
      }
    }

    const validOrders = memoryOrders.filter(o => o.order_status !== 'cancelled');
    const totalRevenue = validOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
    const lowStock = memoryProducts.filter(p => p.stock <= 10);

    return {
      totalRevenue,
      totalOrders: memoryOrders.length,
      totalProducts: memoryProducts.length,
      totalCustomers: memoryUsers.filter(u => u.role === 'customer').length,
      lowStockCount: lowStock.length,
      lowStockProducts: lowStock,
      recentOrders: memoryOrders.slice(0, 5)
    };
  },

  // ====================================================
  // --- DYNAMIC HOME PAGE MANAGEMENT METHODS ---
  // ====================================================

  async getPublicHomePage() {
    // 1. Sliders (active only, ordered)
    let sliders = [];
    if (db.getIsConnected()) {
      try {
        const res = await db.query(`SELECT * FROM home_sliders WHERE is_active = true ORDER BY display_order ASC, id ASC`);
        sliders = res.rows;
      } catch (err) {
        console.warn('PG slider fetch error, fallback:', err.message);
      }
    }
    if (!sliders || sliders.length === 0) {
      sliders = memorySliders.filter(s => s.is_active).sort((a, b) => a.display_order - b.display_order);
    }

    // 2. Sections (enabled only, ordered)
    let sections = [];
    if (db.getIsConnected()) {
      try {
        const res = await db.query(`SELECT * FROM home_sections WHERE is_enabled = true ORDER BY display_order ASC, id ASC`);
        sections = res.rows;
      } catch (err) {
        console.warn('PG sections fetch error, fallback:', err.message);
      }
    }
    if (!sections || sections.length === 0) {
      sections = memorySections.filter(s => s.is_enabled).sort((a, b) => a.display_order - b.display_order);
    }

    // 3. Collections & Products
    const allProducts = await this.getProducts({ limit: 1000 });
    const prods = allProducts.products || [];

    // Featured products
    let featuredProducts = [];
    if (memoryCollections.featuredIds && memoryCollections.featuredIds.length > 0) {
      featuredProducts = memoryCollections.featuredIds.map(id => prods.find(p => p.id === Number(id))).filter(Boolean);
    }
    if (featuredProducts.length === 0) {
      featuredProducts = prods.filter(p => p.is_featured).slice(0, 20);
    }

    // Best Sellers
    let bestSellers = [];
    if (memoryCollections.bestsellerIds && memoryCollections.bestsellerIds.length > 0) {
      bestSellers = memoryCollections.bestsellerIds.map(id => prods.find(p => p.id === Number(id))).filter(Boolean);
    }
    if (bestSellers.length === 0) {
      bestSellers = [...prods].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 20);
    }

    // New Arrivals
    let newArrivals = [];
    if (memoryCollections.newArrivalIds && memoryCollections.newArrivalIds.length > 0) {
      newArrivals = memoryCollections.newArrivalIds.map(id => prods.find(p => p.id === Number(id))).filter(Boolean);
    }
    if (newArrivals.length === 0) {
      newArrivals = [...prods].sort((a, b) => b.id - a.id).slice(0, 20);
    }

    // Categories for Home Page (excluding Oud Collection, Body Mists, New Arrivals, Best Sellers)
    const allCategories = await this.getAllCategories();
    const excludedHomeSlugs = ['oud-collection', 'body-mists', 'new-arrivals', 'best-sellers'];
    const categories = allCategories.filter(c => !excludedHomeSlugs.includes(c.slug));

    // Active Offers
    let offers = [];
    if (db.getIsConnected()) {
      try {
        const res = await db.query(`SELECT * FROM home_offers WHERE is_active = true ORDER BY id DESC`);
        if (res.rows.length > 0) offers = res.rows;
      } catch (err) {
        console.warn('PG offers fetch error, fallback:', err.message);
      }
    }
    if (!offers || offers.length === 0) {
      offers = memoryOffers.filter(o => o.is_active);
    }
    const offer = offers[0] || null;

    return {
      sliders,
      sections,
      featuredProducts,
      bestSellers,
      newArrivals,
      categories,
      offer,
      offers
    };
  },

  async getAdminHomePage() {
    let sliders = [];
    let sections = [];
    let offers = [];

    if (db.getIsConnected()) {
      try {
        const sRes = await db.query(`SELECT * FROM home_sliders ORDER BY display_order ASC, id ASC`);
        sliders = sRes.rows;
        const secRes = await db.query(`SELECT * FROM home_sections ORDER BY display_order ASC, id ASC`);
        sections = secRes.rows;
        const oRes = await db.query(`SELECT * FROM home_offers ORDER BY id DESC`);
        offers = oRes.rows;
      } catch (err) {
        console.warn('PG admin homepage fetch error, fallback:', err.message);
      }
    }

    if (!sliders || sliders.length === 0) {
      sliders = [...memorySliders].sort((a, b) => a.display_order - b.display_order);
    }
    if (!sections || sections.length === 0) {
      sections = [...memorySections].sort((a, b) => a.display_order - b.display_order);
    }
    if (!offers || offers.length === 0) {
      offers = [...memoryOffers];
    }

    const allProds = await this.getProducts({ limit: 1000 });
    const categories = await this.getAllCategories();

    return {
      sliders,
      sections,
      offers,
      collections: memoryCollections,
      products: (allProds.products || []).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        discount_price: p.discount_price,
        image_url: p.image_url,
        category_name: p.category_name,
        gender: p.gender,
        rating: p.rating,
        stock: p.stock,
        is_featured: p.is_featured
      })),
      categories
    };
  },

  async createSlider(data) {
    const newSlide = {
      id: nextId(),
      tag: data.tag || 'HAUTE PARFUMERIE',
      offer_badge: data.offer_badge || '',
      title: data.title || 'Artisanal Fragrance',
      subtitle: data.subtitle || '',
      primary_btn_text: data.primary_btn_text || 'Explore Catalog',
      primary_btn_link: data.primary_btn_link || '/products',
      secondary_btn_text: data.secondary_btn_text || 'Shop Bestsellers',
      secondary_btn_link: data.secondary_btn_link || '/products?sort=rating',
      image_url: data.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1920&q=85',
      bg_gradient: data.bg_gradient || 'linear-gradient(135deg, #F7F5FA 0%, #ECE7F3 100%)',
      accent_color: data.accent_color || '#77708F',
      display_order: Number(data.display_order) || (memorySliders.length + 1),
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
      created_at: new Date()
    };

    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO home_sliders (tag, title, subtitle, primary_btn_text, primary_btn_link, secondary_btn_text, secondary_btn_link, image_url, display_order, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
          [newSlide.tag, newSlide.title, newSlide.subtitle, newSlide.primary_btn_text, newSlide.primary_btn_link, newSlide.secondary_btn_text, newSlide.secondary_btn_link, newSlide.image_url, newSlide.display_order, newSlide.is_active]
        );
        if (res.rows && res.rows[0]) newSlide.id = res.rows[0].id;
      } catch (err) {
        console.warn('PG slider insert error:', err.message);
      }
    }

    memorySliders.push(newSlide);
    saveLocalHomeData();
    return newSlide;
  },

  async updateSlider(id, data) {
    id = Number(id);
    let slide = memorySliders.find(s => s.id === id);
    if (!slide) return null;

    Object.assign(slide, {
      tag: data.tag !== undefined ? data.tag : slide.tag,
      offer_badge: data.offer_badge !== undefined ? data.offer_badge : slide.offer_badge,
      title: data.title !== undefined ? data.title : slide.title,
      subtitle: data.subtitle !== undefined ? data.subtitle : slide.subtitle,
      primary_btn_text: data.primary_btn_text !== undefined ? data.primary_btn_text : slide.primary_btn_text,
      primary_btn_link: data.primary_btn_link !== undefined ? data.primary_btn_link : slide.primary_btn_link,
      secondary_btn_text: data.secondary_btn_text !== undefined ? data.secondary_btn_text : slide.secondary_btn_text,
      secondary_btn_link: data.secondary_btn_link !== undefined ? data.secondary_btn_link : slide.secondary_btn_link,
      image_url: data.image_url !== undefined ? data.image_url : slide.image_url,
      bg_gradient: data.bg_gradient !== undefined ? data.bg_gradient : slide.bg_gradient,
      accent_color: data.accent_color !== undefined ? data.accent_color : slide.accent_color,
      display_order: data.display_order !== undefined ? Number(data.display_order) : slide.display_order,
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : slide.is_active,
      updated_at: new Date()
    });

    if (db.getIsConnected()) {
      try {
        await db.query(
          `UPDATE home_sliders SET tag=$1, title=$2, subtitle=$3, primary_btn_text=$4, primary_btn_link=$5, secondary_btn_text=$6, secondary_btn_link=$7, image_url=$8, display_order=$9, is_active=$10, updated_at=CURRENT_TIMESTAMP WHERE id=$11`,
          [slide.tag, slide.title, slide.subtitle, slide.primary_btn_text, slide.primary_btn_link, slide.secondary_btn_text, slide.secondary_btn_link, slide.image_url, slide.display_order, slide.is_active, id]
        );
      } catch (err) {
        console.warn('PG slider update error:', err.message);
      }
    }

    saveLocalHomeData();
    return slide;
  },

  async deleteSlider(id) {
    id = Number(id);
    const index = memorySliders.findIndex(s => s.id === id);
    if (index === -1) return false;
    memorySliders.splice(index, 1);

    if (db.getIsConnected()) {
      try {
        await db.query(`DELETE FROM home_sliders WHERE id=$1`, [id]);
      } catch (err) {
        console.warn('PG slider delete error:', err.message);
      }
    }
    saveLocalHomeData();
    return true;
  },

  async toggleSlider(id) {
    id = Number(id);
    const slide = memorySliders.find(s => s.id === id);
    if (!slide) return null;
    slide.is_active = !slide.is_active;

    if (db.getIsConnected()) {
      try {
        await db.query(`UPDATE home_sliders SET is_active=$1 WHERE id=$2`, [slide.is_active, id]);
      } catch (err) {
        console.warn('PG slider toggle error:', err.message);
      }
    }
    saveLocalHomeData();
    return slide;
  },

  async reorderSliders(orderedIds) {
    orderedIds.forEach((id, index) => {
      const slide = memorySliders.find(s => s.id === Number(id));
      if (slide) {
        slide.display_order = index + 1;
      }
    });

    if (db.getIsConnected()) {
      try {
        for (let i = 0; i < orderedIds.length; i++) {
          await db.query(`UPDATE home_sliders SET display_order=$1 WHERE id=$2`, [i + 1, Number(orderedIds[i])]);
        }
      } catch (err) {
        console.warn('PG slider reorder error:', err.message);
      }
    }
    saveLocalHomeData();
    return memorySliders.sort((a, b) => a.display_order - b.display_order);
  },

  async updateSections(sectionsArray) {
    sectionsArray.forEach(updatedSec => {
      const sec = memorySections.find(s => s.section_key === updatedSec.section_key);
      if (sec) {
        if (updatedSec.title !== undefined) sec.title = updatedSec.title;
        if (updatedSec.subtitle !== undefined) sec.subtitle = updatedSec.subtitle;
        if (updatedSec.is_enabled !== undefined) sec.is_enabled = Boolean(updatedSec.is_enabled);
        if (updatedSec.display_order !== undefined) sec.display_order = Number(updatedSec.display_order);
      }
    });

    if (db.getIsConnected()) {
      try {
        for (let s of sectionsArray) {
          await db.query(
            `UPDATE home_sections SET title=$1, subtitle=$2, is_enabled=$3, display_order=$4, updated_at=CURRENT_TIMESTAMP WHERE section_key=$5`,
            [s.title, s.subtitle, s.is_enabled, s.display_order, s.section_key]
          );
        }
      } catch (err) {
        console.warn('PG sections update error:', err.message);
      }
    }

    saveLocalHomeData();
    return memorySections.sort((a, b) => a.display_order - b.display_order);
  },

  async toggleSection(sectionKey) {
    const sec = memorySections.find(s => s.section_key === sectionKey);
    if (!sec) return null;
    sec.is_enabled = !sec.is_enabled;

    if (db.getIsConnected()) {
      try {
        await db.query(`UPDATE home_sections SET is_enabled=$1 WHERE section_key=$2`, [sec.is_enabled, sectionKey]);
      } catch (err) {
        console.warn('PG section toggle error:', err.message);
      }
    }
    saveLocalHomeData();
    return sec;
  },

  async createOffer(data) {
    const newOffer = {
      id: nextId(),
      badge: data.badge || 'SPECIAL PRIVILEGE',
      title: data.title || 'Complimentary Gift Offer',
      description: data.description || '',
      discount_pct: data.discount_pct || '10% OFF',
      code: data.code || 'NOIR10',
      banner_image: data.banner_image || 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
      link: data.link || '/products',
      btn_text: data.btn_text || 'Claim Offer Now',
      start_date: data.start_date || new Date().toISOString().split('T')[0],
      end_date: data.end_date || '2026-12-31',
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : true,
      created_at: new Date()
    };

    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO home_offers (badge, title, description, discount_pct, code, banner_image, link, btn_text, start_date, end_date, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
          [newOffer.badge, newOffer.title, newOffer.description, newOffer.discount_pct, newOffer.code, newOffer.banner_image, newOffer.link, newOffer.btn_text, newOffer.start_date, newOffer.end_date, newOffer.is_active]
        );
        if (res.rows && res.rows[0]) newOffer.id = res.rows[0].id;
      } catch (err) {
        console.warn('PG offer insert error:', err.message);
      }
    }

    memoryOffers.unshift(newOffer);
    saveLocalHomeData();
    return newOffer;
  },

  async updateOffer(id, data) {
    id = Number(id);
    let offer = memoryOffers.find(o => o.id === id);
    if (!offer) return null;

    Object.assign(offer, {
      badge: data.badge !== undefined ? data.badge : offer.badge,
      title: data.title !== undefined ? data.title : offer.title,
      description: data.description !== undefined ? data.description : offer.description,
      discount_pct: data.discount_pct !== undefined ? data.discount_pct : offer.discount_pct,
      code: data.code !== undefined ? data.code : offer.code,
      banner_image: data.banner_image !== undefined ? data.banner_image : offer.banner_image,
      link: data.link !== undefined ? data.link : offer.link,
      btn_text: data.btn_text !== undefined ? data.btn_text : offer.btn_text,
      start_date: data.start_date !== undefined ? data.start_date : offer.start_date,
      end_date: data.end_date !== undefined ? data.end_date : offer.end_date,
      is_active: data.is_active !== undefined ? Boolean(data.is_active) : offer.is_active
    });

    if (db.getIsConnected()) {
      try {
        await db.query(
          `UPDATE home_offers SET badge=$1, title=$2, description=$3, discount_pct=$4, code=$5, banner_image=$6, link=$7, btn_text=$8, start_date=$9, end_date=$10, is_active=$11 WHERE id=$12`,
          [offer.badge, offer.title, offer.description, offer.discount_pct, offer.code, offer.banner_image, offer.link, offer.btn_text, offer.start_date, offer.end_date, offer.is_active, id]
        );
      } catch (err) {
        console.warn('PG offer update error:', err.message);
      }
    }

    saveLocalHomeData();
    return offer;
  },

  async deleteOffer(id) {
    id = Number(id);
    const index = memoryOffers.findIndex(o => o.id === id);
    if (index === -1) return false;
    memoryOffers.splice(index, 1);

    if (db.getIsConnected()) {
      try {
        await db.query(`DELETE FROM home_offers WHERE id=$1`, [id]);
      } catch (err) {
        console.warn('PG offer delete error:', err.message);
      }
    }
    saveLocalHomeData();
    return true;
  },

  async toggleOffer(id) {
    id = Number(id);
    const offer = memoryOffers.find(o => o.id === id);
    if (!offer) return null;
    offer.is_active = !offer.is_active;

    if (db.getIsConnected()) {
      try {
        await db.query(`UPDATE home_offers SET is_active=$1 WHERE id=$2`, [offer.is_active, id]);
      } catch (err) {
        console.warn('PG offer toggle error:', err.message);
      }
    }
    saveLocalHomeData();
    return offer;
  },

  async updateCollections(data) {
    if (Array.isArray(data.featuredIds)) {
      memoryCollections.featuredIds = data.featuredIds.map(Number);
      memoryProducts.forEach(p => {
        p.is_featured = memoryCollections.featuredIds.includes(p.id);
      });
    }
    if (Array.isArray(data.bestsellerIds)) {
      memoryCollections.bestsellerIds = data.bestsellerIds.map(Number);
    }
    if (Array.isArray(data.newArrivalIds)) {
      memoryCollections.newArrivalIds = data.newArrivalIds.map(Number);
    }

    if (db.getIsConnected()) {
      try {
        if (data.featuredIds) {
          await db.query(`UPDATE products SET is_featured = (id = ANY($1::int[]))`, [memoryCollections.featuredIds]);
        }
      } catch (err) {
        console.warn('PG collections update error:', err.message);
      }
    }

    saveLocalHomeData();
    return memoryCollections;
  },

  // --- WISHLIST METHODS ---
  async getWishlist(userId) {
    userId = Number(userId);
    if (db.getIsConnected()) {
      try {
        const query = `
          SELECT p.*, b.name AS brand_name, c.name AS category_name
          FROM wishlists w
          JOIN products p ON w.product_id = p.id
          LEFT JOIN brands b ON p.brand_id = b.id
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE w.user_id = $1
          ORDER BY w.created_at DESC
        `;
        const res = await db.query(query, [userId]);
        return res.rows;
      } catch (err) {
        console.warn('PG getWishlist error:', err.message);
      }
    }
    const userWishlist = memoryWishlists.filter(w => w.user_id === userId);
    const productIds = userWishlist.map(w => w.product_id);
    return memoryProducts.filter(p => productIds.includes(p.id));
  },

  async addToWishlist(userId, productId) {
    userId = Number(userId);
    productId = Number(productId);
    const exists = memoryWishlists.some(w => w.user_id === userId && w.product_id === productId);
    if (!exists) {
      memoryWishlists.push({
        id: nextId(),
        user_id: userId,
        product_id: productId,
        created_at: new Date()
      });
      saveLocalHomeData();
    }
    if (db.getIsConnected()) {
      try {
        await db.query(
          `INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) ON CONFLICT (user_id, product_id) DO NOTHING`,
          [userId, productId]
        );
      } catch (err) {
        console.warn('PG addToWishlist error:', err.message);
      }
    }
    return this.getWishlist(userId);
  },

  async removeFromWishlist(userId, productId) {
    userId = Number(userId);
    productId = Number(productId);
    const index = memoryWishlists.findIndex(w => w.user_id === userId && w.product_id === productId);
    if (index !== -1) {
      memoryWishlists.splice(index, 1);
      saveLocalHomeData();
    }
    if (db.getIsConnected()) {
      try {
        await db.query(`DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2`, [userId, productId]);
      } catch (err) {
        console.warn('PG removeFromWishlist error:', err.message);
      }
    }
    return this.getWishlist(userId);
  },

  async toggleWishlist(userId, productId) {
    userId = Number(userId);
    productId = Number(productId);
    const exists = memoryWishlists.some(w => w.user_id === userId && w.product_id === productId);
    if (exists) {
      const items = await this.removeFromWishlist(userId, productId);
      return { inWishlist: false, items };
    } else {
      const items = await this.addToWishlist(userId, productId);
      return { inWishlist: true, items };
    }
  },

  async syncWishlist(userId, productIds) {
    userId = Number(userId);
    if (Array.isArray(productIds)) {
      for (const pid of productIds) {
        const id = Number(pid);
        if (!isNaN(id)) {
          const exists = memoryWishlists.some(w => w.user_id === userId && w.product_id === id);
          if (!exists) {
            memoryWishlists.push({
              id: nextId(),
              user_id: userId,
              product_id: id,
              created_at: new Date()
            });
          }
          if (db.getIsConnected()) {
            try {
              await db.query(
                `INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) ON CONFLICT (user_id, product_id) DO NOTHING`,
                [userId, id]
              );
            } catch (err) {}
          }
        }
      }
      saveLocalHomeData();
    }
    return this.getWishlist(userId);
  },

  // REVIEWS & RATINGS
  async getReviewsByProduct(productId) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC`,
          [productId]
        );
        return res.rows;
      } catch (err) {
        console.warn('PG getReviewsByProduct error:', err.message);
      }
    }
    return [];
  },

  async addReview({ productId, userId, userName, rating, title, comment }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO reviews (product_id, user_id, user_name, rating, title, comment, is_verified)
           VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING *`,
          [productId, userId || null, userName, rating, title || '', comment || '']
        );
        // Automatically recalculate product rating and review count
        await db.query(
          `UPDATE products SET 
             review_count = (SELECT COUNT(*) FROM reviews WHERE product_id = $1),
             rating = ROUND((SELECT AVG(rating) FROM reviews WHERE product_id = $1)::numeric, 1)
           WHERE id = $1`,
          [productId]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG addReview error:', err.message);
      }
    }
    return null;
  },

  // ADDRESSES
  async getUserAddresses(userId) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC`,
          [userId]
        );
        return res.rows;
      } catch (err) {
        console.warn('PG getUserAddresses error:', err.message);
      }
    }
    return memoryAddresses.filter(a => a.user_id === Number(userId));
  },

  async addAddress(userId, { fullName, phone, addressLine1, addressLine2, city, state, pincode, addressType = 'Home', isDefault = false }) {
    if (db.getIsConnected()) {
      try {
        if (isDefault) {
          await db.query(`UPDATE addresses SET is_default = false WHERE user_id = $1`, [userId]);
        }
        const res = await db.query(
          `INSERT INTO addresses (user_id, full_name, phone, address_line1, address_line2, city, state, pincode, address_type, is_default)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
          [userId, fullName, phone, addressLine1, addressLine2 || '', city, state, pincode, addressType, Boolean(isDefault)]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG addAddress error:', err.message);
      }
    }
    const newId = nextId();
    if (isDefault) {
      memoryAddresses.forEach(a => { if (a.user_id === Number(userId)) a.is_default = false; });
    }
    const newAddr = {
      id: newId,
      user_id: Number(userId),
      full_name: fullName,
      phone,
      address_line1: addressLine1,
      address_line2: addressLine2 || '',
      city,
      state,
      pincode,
      address_type: addressType,
      is_default: Boolean(isDefault),
      created_at: new Date()
    };
    memoryAddresses.unshift(newAddr);
    return newAddr;
  },

  async updateAddress(userId, addressId, { fullName, phone, addressLine1, addressLine2, city, state, pincode, addressType, isDefault }) {
    if (db.getIsConnected()) {
      try {
        if (isDefault) {
          await db.query(`UPDATE addresses SET is_default = false WHERE user_id = $1`, [userId]);
        }
        const res = await db.query(
          `UPDATE addresses 
           SET full_name = COALESCE($1, full_name),
               phone = COALESCE($2, phone),
               address_line1 = COALESCE($3, address_line1),
               address_line2 = COALESCE($4, address_line2),
               city = COALESCE($5, city),
               state = COALESCE($6, state),
               pincode = COALESCE($7, pincode),
               address_type = COALESCE($8, address_type),
               is_default = CASE WHEN $9::boolean IS NOT NULL THEN $9 ELSE is_default END
           WHERE id = $10 AND user_id = $11
           RETURNING *`,
          [fullName, phone, addressLine1, addressLine2, city, state, pincode, addressType, isDefault !== undefined ? Boolean(isDefault) : null, addressId, userId]
        );
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG updateAddress error:', err.message);
      }
    }
    const addr = memoryAddresses.find(a => a.id === Number(addressId) && a.user_id === Number(userId));
    if (addr) {
      if (isDefault) {
        memoryAddresses.forEach(a => { if (a.user_id === Number(userId)) a.is_default = false; });
      }
      if (fullName) addr.full_name = fullName;
      if (phone) addr.phone = phone;
      if (addressLine1) addr.address_line1 = addressLine1;
      if (addressLine2 !== undefined) addr.address_line2 = addressLine2;
      if (city) addr.city = city;
      if (state) addr.state = state;
      if (pincode) addr.pincode = pincode;
      if (addressType) addr.address_type = addressType;
      if (isDefault !== undefined) addr.is_default = Boolean(isDefault);
      return addr;
    }
    return null;
  },

  async deleteAddress(userId, addressId) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `DELETE FROM addresses WHERE id = $1 AND user_id = $2 RETURNING id`,
          [addressId, userId]
        );
        return res.rows.length > 0;
      } catch (err) {
        console.warn('PG deleteAddress error:', err.message);
      }
    }
    const idx = memoryAddresses.findIndex(a => a.id === Number(addressId) && a.user_id === Number(userId));
    if (idx !== -1) {
      memoryAddresses.splice(idx, 1);
      return true;
    }
    return false;
  },

  async setDefaultAddress(userId, addressId) {
    if (db.getIsConnected()) {
      try {
        await db.query(`UPDATE addresses SET is_default = false WHERE user_id = $1`, [userId]);
        const res = await db.query(
          `UPDATE addresses SET is_default = true WHERE id = $1 AND user_id = $2 RETURNING *`,
          [addressId, userId]
        );
        return res.rows[0] || null;
      } catch (err) {
        console.warn('PG setDefaultAddress error:', err.message);
      }
    }
    memoryAddresses.forEach(a => {
      if (a.user_id === Number(userId)) {
        a.is_default = (a.id === Number(addressId));
      }
    });
    return memoryAddresses.find(a => a.id === Number(addressId) && a.user_id === Number(userId)) || null;
  },

  // COUPONS & DISCOUNTS
  async validateCoupon(code, orderAmount = 0) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT * FROM coupons WHERE UPPER(code) = UPPER($1) AND is_active = true LIMIT 1`,
          [code]
        );
        if (res.rows.length === 0) return { valid: false, message: 'Invalid or expired coupon code.' };
        const coupon = res.rows[0];
        if (coupon.min_order_amount && Number(orderAmount) < Number(coupon.min_order_amount)) {
          return { valid: false, message: `Minimum cart value of ₹${coupon.min_order_amount} required.` };
        }
        let discount = 0;
        if (coupon.discount_type === 'percentage') {
          discount = Math.round((Number(orderAmount) * Number(coupon.discount_value)) / 100);
          if (coupon.max_discount && discount > Number(coupon.max_discount)) {
            discount = Number(coupon.max_discount);
          }
        } else {
          discount = Number(coupon.discount_value);
        }
        return {
          valid: true,
          code: coupon.code,
          discount,
          discount_type: coupon.discount_type,
          discount_value: Number(coupon.discount_value),
          message: `Coupon ${coupon.code} applied successfully!`
        };
      } catch (err) {
        console.warn('PG validateCoupon error:', err.message);
      }
    }
    const clean = code.trim().toUpperCase();
    if (clean === 'NOIR10') {
      const discount = Math.round(Number(orderAmount) * 0.1);
      return { valid: true, code: 'NOIR10', discount, message: '10% discount applied!' };
    }
    return { valid: false, message: 'Invalid coupon code.' };
  },

  async getAllCoupons() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(`SELECT * FROM coupons ORDER BY created_at DESC`);
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) {
        console.warn('PG getAllCoupons error:', err.message);
      }
    }
    return memoryCoupons;
  },

  async getActiveCoupons() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(`SELECT * FROM coupons WHERE is_active = true ORDER BY id ASC`);
        if (res.rows && res.rows.length > 0) return res.rows;
      } catch (err) {
        console.warn('PG getActiveCoupons error:', err.message);
      }
    }
    return memoryCoupons.filter(c => c.is_active);
  },

  async getOfferCoupon(offerId) {
    let offer = null;
    if (db.getIsConnected()) {
      try {
        if (offerId && offerId !== 'active' && offerId !== 'current') {
          const res = await db.query(`SELECT * FROM home_offers WHERE id = $1`, [Number(offerId)]);
          if (res.rows.length > 0) offer = res.rows[0];
        } else {
          const res = await db.query(`SELECT * FROM home_offers WHERE is_active = true ORDER BY id DESC LIMIT 1`);
          if (res.rows.length > 0) offer = res.rows[0];
        }
      } catch (err) {
        console.warn('PG getOfferCoupon error:', err.message);
      }
    }
    if (!offer) {
      if (offerId && offerId !== 'active' && offerId !== 'current') {
        offer = memoryOffers.find(o => o.id === Number(offerId)) || null;
      } else {
        offer = memoryOffers.find(o => o.is_active) || memoryOffers[0] || null;
      }
    }
    if (!offer) return null;

    const code = (offer.code || 'NOIR10').toUpperCase();
    let couponDetails = null;
    if (db.getIsConnected()) {
      try {
        const cRes = await db.query(`SELECT * FROM coupons WHERE UPPER(code) = $1 LIMIT 1`, [code]);
        if (cRes.rows.length > 0) couponDetails = cRes.rows[0];
      } catch (err) {}
    }
    if (!couponDetails) {
      couponDetails = memoryCoupons.find(c => c.code.toUpperCase() === code) || null;
    }

    return {
      offerId: offer.id,
      title: offer.title,
      badge: offer.badge,
      code: offer.code || 'NOIR10',
      discount_pct: offer.discount_pct || '10% OFF',
      description: couponDetails?.description || offer.description,
      min_order_amount: couponDetails?.min_order_amount || 999,
      discount_type: couponDetails?.discount_type || 'percentage',
      discount_value: couponDetails?.discount_value || 10
    };
  },

  // CONTACT MESSAGES
  async submitContactMessage({ name, email, phone, subject, message }) {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `INSERT INTO contact_messages (name, email, phone, subject, message, status)
           VALUES ($1, $2, $3, $4, $5, 'unread') RETURNING *`,
          [name, email, phone || null, subject, message]
        );
        return res.rows[0];
      } catch (err) {
        console.warn('PG submitContactMessage error:', err.message);
      }
    }
    return { name, email, subject, message, created_at: new Date() };
  },

  async getContactMessages() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(`SELECT * FROM contact_messages ORDER BY created_at DESC`);
        return res.rows;
      } catch (err) {
        console.warn('PG getContactMessages error:', err.message);
      }
    }
    return [];
  },

  // INVENTORY
  async getInventoryList() {
    if (db.getIsConnected()) {
      try {
        const res = await db.query(
          `SELECT p.id as product_id, p.name as product_name, p.slug, p.image_url,
                  p.stock, p.price, p.discount_price,
                  c.name as category_name, b.name as brand_name,
                  COALESCE(i.low_stock_threshold, 10) as low_stock_threshold,
                  COALESCE(i.reserved_stock, 0) as reserved_stock
           FROM products p
           LEFT JOIN categories c ON p.category_id = c.id
           LEFT JOIN brands b ON p.brand_id = b.id
           LEFT JOIN inventory i ON p.id = i.product_id
           ORDER BY p.stock ASC`
        );
        return res.rows;
      } catch (err) {
        console.warn('PG getInventoryList error:', err.message);
      }
    }
    return [];
  }
};

module.exports = Store;

