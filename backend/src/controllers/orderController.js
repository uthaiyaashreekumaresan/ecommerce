const Store = require('../db/store');

exports.checkout = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      state,
      pincode,
      items,
      subtotal,
      discount = 0,
      shippingFee = 0,
      totalAmount,
      paymentMethod = 'COD'
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full shipping details (name, email, phone, address, city, state, pincode).'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Your cart is empty. Add perfume items before checking out.'
      });
    }

    const userId = req.user ? req.user.id : null;

    const order = await Store.createOrder({
      userId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      state,
      pincode,
      items,
      subtotal,
      discount,
      shippingFee,
      totalAmount,
      paymentMethod
    });

    res.status(201).json({
      success: true,
      message: 'Your order has been placed successfully!',
      data: order
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Store.getOrdersByUser(req.user.id);
    res.json({
      success: true,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Store.getOrderById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Security check: Only the owning user or an authorized admin can view account orders
    if (order.user_id) {
      if (!req.user || (req.user.role !== 'admin' && order.user_id !== req.user.id)) {
        return res.status(403).json({ success: false, message: 'Unauthorized to view this order.' });
      }
    }

    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

