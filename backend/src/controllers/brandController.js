const Store = require('../db/store');

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await Store.getAllBrands();
    res.json({ success: true, data: brands });
  } catch (err) {
    next(err);
  }
};

