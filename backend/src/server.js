const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const brandRoutes = require('./routes/brand.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');
const homepageRoutes = require('./routes/homepage.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const reviewRoutes = require('./routes/review.routes');
const addressRoutes = require('./routes/address.routes');
const couponRoutes = require('./routes/coupon.routes');
const contactRoutes = require('./routes/contact.routes');
const { pool, getIsConnected, testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend
app.use(cors({
  origin: '*',
  credentials: true
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Static files for uploaded perfume images & public assets
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

// Root & Health Check with PostgreSQL Status
app.get('/api/health', async (req, res) => {
  const isConnected = getIsConnected();
  res.json({
    status: 'ok',
    database: {
      type: 'PostgreSQL',
      connected: isConnected,
      name: process.env.PGDATABASE || 'perfume_ecommerce',
      port: process.env.PGPORT || 5432
    },
    message: isConnected
      ? 'Luxury Perfume E-Commerce API is connected to PostgreSQL'
      : 'Luxury Perfume E-Commerce API is offline',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/contact', contactRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.url}` });
});

// Global Error Handler
app.use(errorHandler);

let server;

// Requirement 11: Ensure Express backend starts ONLY after PostgreSQL connection is established
async function startServer() {
  try {
    // 1. Establish PostgreSQL database connection first
    await testConnection();

    // 2. Start Express server only after DB connection succeeds
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server: Database connection could not be established.');
    process.exit(1);
  }
}

// Requirement 12: Configure graceful shutdown for database pool & server
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} signal received. Closing HTTP server and PostgreSQL pool...`);
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed.');
      try {
        await pool.end();
        console.log('PostgreSQL pool closed successfully.');
      } catch (poolErr) {
        console.error('Error closing PostgreSQL pool:', poolErr.message);
      }
      process.exit(0);
    });
  } else {
    try {
      await pool.end();
    } catch (_) {}
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

startServer();

module.exports = app;
