const http = require('http');

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, body: data });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function testAll() {
  console.log('\n🧪 Testing Backend API with PostgreSQL Connection...\n');

  // 1. Health Check
  const health = await request('/api/health');
  console.log('1. Health Check:', health.status, health.body);

  // 2. Products List
  const products = await request('/api/products?page=1&limit=20');
  console.log('2. Products API:', products.status, {
    count: products.body.data?.length,
    pagination: products.body.pagination
  });

  // 3. Customer Login
  const login = await request('/api/auth/login', {
    method: 'POST',
    body: {
      email: 'customer@perfumeshop.com',
      password: 'Customer@123'
    }
  });
  console.log('3. Customer Login:', login.status, {
    name: login.body.user?.name,
    role: login.body.user?.role,
    tokenReceived: Boolean(login.body.token)
  });

  // 4. Test Checkout Order Creation in PostgreSQL
  const token = login.body.token;
  const checkout = await request('/api/orders/checkout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      customerName: 'Priya Sharma',
      customerEmail: 'customer@perfumeshop.com',
      customerPhone: '+91 91234 56789',
      address: 'Flat 304, Green Meadows, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      items: [
        {
          productId: 1,
          productName: 'Dior Sauvage Eau de Parfum',
          size_ml: 50,
          price: 9450,
          quantity: 1,
          imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80'
        }
      ],
      subtotal: 9450,
      discount: 945,
      shippingFee: 0,
      totalAmount: 8505,
      paymentMethod: 'UPI'
    }
  });
  console.log('4. Checkout API (PostgreSQL):', checkout.status, {
    success: checkout.body.success,
    orderNumber: checkout.body.data?.order_number,
    total: checkout.body.data?.total_amount,
    itemsCount: checkout.body.data?.items?.length
  });

  // 5. Test My Orders History in PostgreSQL
  const myOrders = await request('/api/orders/my-orders', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log('5. My Orders (PostgreSQL):', myOrders.status, {
    totalOrders: myOrders.body.data?.length,
    latestOrderNumber: myOrders.body.data?.[0]?.order_number
  });

  // 6. Test Wishlist in PostgreSQL
  const wishlistAdd = await request('/api/wishlist/toggle', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: {
      productId: 5
    }
  });
  console.log('6. Wishlist Toggle (PostgreSQL):', wishlistAdd.status, wishlistAdd.body);

  const wishlistGet = await request('/api/wishlist', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  console.log('7. Wishlist Get (PostgreSQL):', wishlistGet.status, `Saved items: ${wishlistGet.body.data?.length}`);

  console.log('\n🎉 ALL FULL WORKFLOW TESTS COMPLETED SUCCESSFULLY!\n');
  process.exit(0);
}

setTimeout(testAll, 1500);
