const Store = require('../db/store');

exports.getSearchSuggestions = async (req, res, next) => {
  try {
    const query = (req.query.q || req.query.query || '').trim();
    if (!query) {
      return res.json({
        success: true,
        data: {
          products: [],
          categories: [],
          brands: [],
          totalMatches: 0
        }
      });
    }

    const suggestions = await Store.getSearchSuggestions(query);
    res.json({
      success: true,
      data: suggestions
    });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const {
      category,
      brand,
      gender,
      notes,
      minPrice,
      maxPrice,
      size,
      search,
      sort,
      page = 1,
      limit = 20
    } = req.query;

    const result = await Store.getProducts({
      category,
      brand,
      gender,
      notes,
      minPrice,
      maxPrice,
      size,
      search,
      sort,
      page,
      limit
    });

    res.json({
      success: true,
      data: result.products,
      pagination: result.pagination
    });
  } catch (err) {
    next(err);
  }
};

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const featured = await Store.getFeaturedProducts();
    res.json({
      success: true,
      data: featured
    });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { id } = req.params;
    const product = await Store.getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Perfume product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.getProductImages = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { id } = req.params;
    const imagesData = await Store.getProduct3Images(id);
    if (!imagesData) {
      return res.status(404).json({ success: false, message: 'Perfume product not found.' });
    }
    res.json({ success: true, data: imagesData });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySlug = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { slug } = req.params;
    const product = await Store.getProductBySlug(slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Perfume product not found.' });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

exports.getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryId } = req.query;
    const related = await Store.getRelatedProducts(id, categoryId, 4);
    res.json({ success: true, data: related });
  } catch (err) {
    next(err);
  }
};

