# ÉLIXIR PARFUMS — Luxury E-Commerce Platform

An artisanal online fragrance e-commerce platform and administrative backoffice modelled on the layout, product browsing, and shopping flow of **Florencia** (`florencia.co.in`), developed with **React.js**, **Bootstrap 5**, **Material UI 6**, **Node.js**, **Express**, and **PostgreSQL**.

---

## 🏛️ Architecture & Technology Stack

- **Frontend**:
  - **React 18** with **Vite** for fast, optimized builds
  - **Bootstrap 5** for responsive grid layouts (`container`, `row`, `col-*`)
  - **Material UI (MUI v6)** for interactive controls (Dialogs, Ratings, Sliders, Tabs, Badges, Steppers, Menus, Accordions)
  - **React Router v6** for client-side routing and protected routes
  - **Axios** with JWT authorization interceptors
- **Backend**:
  - **Node.js** with **Express.js**
  - **PostgreSQL** relational database with connection pooling (`pg`)
  - **JSON Web Token (JWT)** for role-based authentication (Admin vs Customer)
  - **Bcrypt.js** for one-way salted password hashing
  - **Multer** for perfume image uploads
  - **Environment-based configuration** via `.env` (no hardcoded credentials)

---

## 🔑 Demo Access Credentials

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@perfumeshop.com` | `Admin@123` | Backoffice Dashboard, Sales KPIs, Perfume CRUD, Image Uploads, Order Status Management, Category/Brand Control, Customer Records |
| **Customer** | `customer@perfumeshop.com` | `Customer@123` | Browsing, Filtering, Olfactory Pyramid, Bag, Checkout, Order Tracking |

*Tip: The Login page includes one-click demo fill buttons for both Admin and Customer!*

---

## 📁 Project Directory Structure

```
c:\Ecommerce website\
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # PostgreSQL pool connection & fallback engine
│   │   ├── controllers/
│   │   │   ├── adminController.js   # Dashboard KPIs, Product/Category CRUD, Orders, Upload
│   │   │   ├── authController.js    # Register, Login, JWT issuing, Profile
│   │   │   ├── brandController.js   # Perfume houses & brands
│   │   │   ├── categoryController.js# Fragrance families (Woody, Oriental, etc.)
│   │   │   ├── orderController.js   # Checkout, user orders, order lookup
│   │   │   └── productController.js # Catalog listing, filtering, search, detail, related
│   │   ├── db/
│   │   │   ├── schema.sql           # Complete PostgreSQL schema definitions
│   │   │   ├── seedData.js          # Realistic artisanal perfume dataset
│   │   │   ├── migrate.js           # Automated DB creation & schema execution
│   │   │   ├── seed.js              # Database population script
│   │   │   └── store.js             # Unified PostgreSQL & resilient data access layer
│   │   ├── middleware/
│   │   │   ├── adminAuth.js         # Admin role protection middleware
│   │   │   ├── auth.js              # JWT bearer authentication middleware
│   │   │   ├── errorHandler.js      # Centralized JSON error handler
│   │   │   └── upload.js            # Multer image upload handler
│   │   ├── routes/
│   │   │   ├── admin.routes.js
│   │   │   ├── auth.routes.js
│   │   │   ├── brand.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── order.routes.js
│   │   │   └── product.routes.js
│   │   └── server.js                # Express app entry point
│   ├── uploads/                     # Uploaded perfume image storage
│   ├── .env                         # Server environment variables
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminLayout.jsx      # Admin backoffice drawer & header
│   │   │   ├── FilterSidebar.jsx    # Olfactory notes, brand, gender, price filters
│   │   │   ├── Footer.jsx           # Brand story, newsletter, policies
│   │   │   ├── FragrancePyramid.jsx # Top, Heart, Base notes interactive pyramid
│   │   │   ├── Navbar.jsx           # Top announcement bar, logo, cart badge, menu
│   │   │   ├── ProductCard.jsx      # Responsive perfume card with quick add
│   │   │   └── ProtectedRoute.jsx   # Role-based route guard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state & methods
│   │   │   └── CartContext.jsx      # Cart, promo codes, totals calculation
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminCategories.jsx
│   │   │   │   ├── AdminCustomers.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminOrders.jsx
│   │   │   │   └── AdminProducts.jsx
│   │   │   ├── Cart.jsx             # Shopping bag with coupon code & free delivery bar
│   │   │   ├── Checkout.jsx         # 3-step checkout (Address -> Payment -> Review)
│   │   │   ├── Home.jsx             # Hero banner, USPs, Fragrance families, Bestsellers
│   │   │   ├── Login.jsx            # Sign in with 1-click demo buttons
│   │   │   ├── OrderSuccess.jsx     # Order confirmation with reference number
│   │   │   ├── Orders.jsx           # User order tracking & timeline
│   │   │   ├── ProductDetail.jsx    # Image gallery, notes pyramid, size selector
│   │   │   └── Products.jsx         # Full catalog with filtering & sorting
│   │   ├── services/
│   │   │   ├── adminService.js
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── orderService.js
│   │   │   └── productService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── theme.js                 # Luxury gold & charcoal Material UI theme
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── wireframes.md                    # Low-fidelity UI wireframes and layouts
├── package.json                     # Root orchestrator scripts
└── README.md
```

---

## 🗄️ Database Schema (PostgreSQL)

The database schema (`backend/src/db/schema.sql`) implements:
- **`users`**: `id`, `name`, `email` (unique), `password_hash`, `role` ('customer' | 'admin'), `phone`, `address`, `city`, `state`, `pincode`, timestamps.
- **`categories`**: `id`, `name`, `slug`, `description`, `image_url` (e.g. Woody & Earthy, Oriental & Amber, Floral, Fresh, Citrus, Gourmand).
- **`brands`**: `id`, `name`, `slug`, `description`, `logo_url` (e.g. Florencia Luxe, Maison Al-Aura, Velvet Essence, Royal Oud).
- **`products`**: `id`, `name`, `slug`, `brand_id`, `category_id`, `gender` ('Men' | 'Women' | 'Unisex'), `description`, `short_description`, `price`, `discount_price`, `stock`, `volume_ml`, `concentration`, `top_notes` (array), `heart_notes` (array), `base_notes` (array), `image_url`, `gallery_urls`, `is_featured`, `rating`, `review_count`.
- **`carts` & `cart_items`**: `id`, `user_id`, `product_id`, `size_ml`, `quantity`, `unit_price`.
- **`orders`**: `id`, `order_number` (unique), `user_id`, `customer_name`, `customer_email`, `customer_phone`, `shipping_address`, `shipping_city`, `shipping_state`, `shipping_pincode`, `subtotal`, `discount`, `shipping_fee`, `total_amount`, `payment_method`, `payment_status`, `order_status` ('placed' | 'shipped' | 'delivered' | 'cancelled').
- **`order_items`**: `id`, `order_id`, `product_id`, `product_name`, `size_ml`, `price`, `quantity`, `total_price`, `image_url`.

---

## 📡 REST API Endpoints

### Authentication (`/api/auth`)
- `POST /register`: Register a new customer
- `POST /login`: Authenticate and receive JWT
- `GET /me`: Get authenticated user profile (JWT required)
- `PUT /profile`: Update profile & address (JWT required)

### Products (`/api/products`)
- `GET /`: List perfumes with query parameters (`category`, `brand`, `gender`, `notes`, `minPrice`, `maxPrice`, `size`, `search`, `sort`, `page`, `limit`)
- `GET /featured`: Get homepage featured bestsellers
- `GET /:id`: Get single perfume by ID with brand and category details
- `GET /slug/:slug`: Get perfume by URL slug
- `GET /:id/related`: Get related fragrances by family/gender

### Fragrance Families & Brands
- `GET /api/categories`: List all categories with product counts
- `GET /api/brands`: List all perfume houses

### Shopping & Orders (`/api/orders`)
- `POST /checkout`: Place new order (supports guest and logged-in customers)
- `GET /my-orders`: Retrieve authenticated customer's order history
- `GET /:id`: Order details lookup

### Protected Admin Backoffice (`/api/admin`)
- `GET /dashboard/stats`: KPI metrics (Total sales, Orders, Active items, Low-stock alerts)
- `GET /products`: Retrieve all products for admin data table
- `POST /products`: Create new perfume formulation
- `PUT /products/:id`: Update perfume details, pricing, notes, stock
- `DELETE /products/:id`: Remove perfume from catalog
- `POST /categories` / `PUT /categories/:id` / `DELETE /categories/:id`: Category management
- `POST /brands` / `PUT /brands/:id` / `DELETE /brands/:id`: Brand house management
- `GET /orders`: View all customer orders
- `PUT /orders/:id/status`: Update order fulfillment status (`placed`, `shipped`, `delivered`, `cancelled`)
- `GET /customers`: Retrieve registered customer list with order count and lifetime spend
- `POST /upload`: Multipart file upload for perfume images

---

## 🚀 Setup & Execution Instructions

### 1. Prerequisites
- **Node.js** (v18+ or v24+)
- **PostgreSQL** (v14+ to v18) installed and running

### 2. Configure Environment Variables
Verify or edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secret_jwt_key_florencia_luxury_parfums_2026
JWT_EXPIRES_IN=7d

# PostgreSQL Connection Credentials
PGHOST=localhost
PGPORT=5432
PGDATABASE=perfume_ecommerce
PGUSER=postgres
PGPASSWORD=postgres
```

### 3. Run Database Migrations & Seed Data
Execute the migration and seed scripts from the backend:
```bash
# In backend directory:
cd "c:\Ecommerce website\backend"
npm run migrate
npm run seed
```
This automatically:
1. Creates the `perfume_ecommerce` database if not present.
2. Applies all tables, foreign keys, and indexes from `schema.sql`.
3. Seeds Admin user (`admin@perfumeshop.com` / `Admin@123`), demo customer, categories, brands, sample perfumes, and demo orders.

*(Note: The backend also contains a built-in fallback data engine. If PostgreSQL is temporarily stopped or during initial setup, the backend runs seamlessly without crashing and allows immediate exploration).*

### 4. Start the Backend API Server
```bash
cd "c:\Ecommerce website\backend"
npm start
```
The server will start at: `http://localhost:5000`
- API Health Check: `http://localhost:5000/api/health`
- Products API: `http://localhost:5000/api/products`

### 5. Start the React Frontend Application
In a new terminal:
```bash
cd "c:\Ecommerce website\frontend"
npm run dev
```
The Vite development server will start at: `http://localhost:3000`

---

## 🧪 Verification & Feature Walkthrough

1. **Storefront Browsing**:
   - Open `http://localhost:3000`
   - Explore the Hero Banner, Trust Badges, Fragrance Family tiles, and Bestsellers.
   - Click the interactive **Olfactory Fragrance Pyramid** to see Top, Heart, and Base notes.
2. **Product Catalog & Filtering**:
   - Navigate to **Shop All** (`/products`).
   - Filter by Fragrance Family (e.g. *Woody & Earthy*), Gender (*Unisex*), or specific notes (*Oud*, *Bergamot*).
   - Adjust the Price Range slider (₹499 to ₹2,499) and sort by *Price: Low to High* or *Customer Rating*.
3. **Product Detail Page**:
   - Click on any perfume (e.g. *Oud Royale Eau De Parfum*).
   - Switch bottle sizes between **50 ML** and **100 ML** to observe dynamic price recalculation.
   - Read the Olfactory Notes breakdown and application guide.
4. **Shopping Bag & 3-Step Checkout**:
   - Add perfumes to bag and proceed to `/cart`.
   - Enter promo code `NOIR10` to get **10% OFF**. Observe the free shipping progress bar.
   - Click **Proceed to Checkout**, fill in delivery address, choose payment method (COD, UPI, Card), and place order.
   - Receive instant order confirmation reference.
5. **Customer Order History**:
   - Sign in as `customer@perfumeshop.com` (`Customer@123`).
   - Click **My Orders** in the account menu to view order status timeline and item breakdowns.
6. **Admin Panel**:
   - Sign in as `admin@perfumeshop.com` (`Admin@123`).
   - Click **Admin Dashboard** (`/admin`).
   - Inspect Sales Revenue, Orders count, Catalog items, and **Low Stock Alerts** (items with stock < 10).
   - Go to **Products** (`/admin/products`): Add new perfumes, upload bottle images, set top/heart/base notes, edit pricing, or delete items.
   - Go to **Orders** (`/admin/orders`): Update order status between `placed` → `shipped` → `delivered`.
   - Go to **Categories & Brands** (`/admin/categories`): Add or customize fragrance families.
   - Go to **Customers** (`/admin/customers`): Review customer engagement and lifetime spend.

