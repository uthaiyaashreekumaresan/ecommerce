const Store = require('../db/store');

// GET /api/wishlist
exports.getWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await Store.getWishlist(userId);
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/wishlist/toggle
exports.toggleWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId is required' });
    }
    const result = await Store.toggleWishlist(userId, productId);
    res.json({
      success: true,
      inWishlist: result.inWishlist,
      message: result.inWishlist ? 'Added to wishlist' : 'Removed from wishlist',
      data: result.items,
      count: result.items.length
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/wishlist/add
exports.addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: 'productId is required' });
    }
    const items = await Store.addToWishlist(userId, productId);
    res.json({
      success: true,
      message: 'Product added to wishlist',
      data: items,
      count: items.length
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/wishlist/:productId
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const items = await Store.removeFromWishlist(userId, productId);
    res.json({
      success: true,
      message: 'Product removed from wishlist',
      data: items,
      count: items.length
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/wishlist/sync
exports.syncWishlist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productIds } = req.body;
    const items = await Store.syncWishlist(userId, productIds);
    res.json({
      success: true,
      message: 'Wishlist synced successfully',
      data: items,
      count: items.length
    });
  } catch (err) {
    next(err);
  }
};

