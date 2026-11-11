const Store = require('../db/store');

exports.validateCoupon = async (req, res, next) => {
  try {
    const { code } = req.params;
    const amount = Number(req.query.amount || 0);
    const result = await Store.validateCoupon(code, amount);
    if (!result.valid) {
      return res.status(400).json({ success: false, message: result.message });
    }
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getActiveCoupons = async (req, res, next) => {
  try {
    const coupons = await Store.getActiveCoupons();
    res.json({ success: true, data: coupons });
  } catch (err) {
    next(err);
  }
};

exports.getOfferCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Store.getOfferCoupon(id);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Promotional coupon offer not found.' });
    }
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Store.getAllCoupons();
    res.json({ success: true, data: coupons });
  } catch (err) {
    next(err);
  }
};


