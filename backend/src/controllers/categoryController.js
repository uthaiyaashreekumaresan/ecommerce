const Store = require('../db/store');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Store.getAllCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
};

