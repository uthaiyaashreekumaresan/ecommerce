const Store = require('../db/store');

exports.getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const reviews = await Store.getReviewsByProduct(productId);
    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;
    if (!productId || !rating) {
      return res.status(400).json({ success: false, message: 'Product ID and Rating (1-5) are required.' });
    }
    const review = await Store.addReview({
      productId: Number(productId),
      userId: req.user ? req.user.id : null,
      userName: req.user ? req.user.name : (req.body.userName || 'Verified Buyer'),
      rating: Number(rating),
      title,
      comment
    });
    res.status(201).json({ success: true, message: 'Review submitted successfully!', data: review });
  } catch (err) {
    next(err);
  }
};

