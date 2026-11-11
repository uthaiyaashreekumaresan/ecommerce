const fs = require('fs');
const path = require('path');
const Store = require('../db/store');

// DASHBOARD STATS
exports.getStats = async (req, res, next) => {
  try {
    const stats = await Store.getAdminStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
};

// PRODUCTS MANAGEMENT
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category_id, category, brand_id, search, limit = 1000, page = 1 } = req.query;
    const result = await Store.getProducts({
      limit: Number(limit),
      page: Number(page),
      category_id: category_id ? Number(category_id) : undefined,
      category,
      brand_id: brand_id ? Number(brand_id) : undefined,
      search
    });
    res.json({ success: true, data: result.products, pagination: result.pagination });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      brand_id,
      category_id,
      gender,
      description,
      short_description,
      price,
      discount_price,
      stock,
      volume_ml,
      concentration,
      top_notes,
      heart_notes,
      base_notes,
      image_url,
      image_url_1,
      image_url_2,
      image_url_3,
      gallery_urls,
      is_featured
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Perfume name and price are required.' });
    }

    const newProduct = await Store.createProduct({
      name,
      brand_id,
      category_id,
      gender,
      description,
      short_description,
      price,
      discount_price,
      stock,
      volume_ml,
      concentration,
      top_notes,
      heart_notes,
      base_notes,
      image_url: image_url_1 || image_url,
      image_url_1: image_url_1 || image_url,
      image_url_2,
      image_url_3,
      gallery_urls,
      is_featured
    });

    res.status(201).json({ success: true, message: 'Perfume created successfully.', data: newProduct });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Store.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Perfume not found.' });
    }
    res.json({ success: true, message: 'Perfume updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
};

const saveUploadedFile = (file) => {
  if (!file) return null;
  try {
    const publicUploadsDir = path.join(__dirname, '../../../frontend/public/uploads');
    if (!fs.existsSync(publicUploadsDir)) {
      fs.mkdirSync(publicUploadsDir, { recursive: true });
    }
    fs.copyFileSync(file.path, path.join(publicUploadsDir, file.filename));
  } catch (syncErr) {
    // Non-fatal
  }
  return `/uploads/${file.filename}`;
};

exports.getProduct3Images = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const { id } = req.params;
    const imagesData = await Store.getProduct3Images(id);
    if (!imagesData) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    res.json({ success: true, data: imagesData });
  } catch (err) {
    next(err);
  }
};

exports.updateProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    let finalImageUrl = req.body.image_url || req.body.imageUrl;

    // If a file was uploaded in this request
    if (req.file) {
      finalImageUrl = saveUploadedFile(req.file);
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: 'No image file or image URL provided.' });
    }

    const updated = await Store.updateProductImage(id, finalImageUrl);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      message: 'Product image updated and saved to PostgreSQL successfully.',
      imageUrl: finalImageUrl,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProductImageIndex = async (req, res, next) => {
  try {
    const { id } = req.params;
    const index = parseInt(req.params.index, 10);
    if (![1, 2, 3].includes(index)) {
      return res.status(400).json({ success: false, message: 'Image index must be 1, 2, or 3.' });
    }

    let finalImageUrl = req.body.image_url || req.body.imageUrl || req.body.url;
    if (req.file) {
      finalImageUrl = saveUploadedFile(req.file);
    }

    if (!finalImageUrl) {
      return res.status(400).json({ success: false, message: `No image file or URL provided for Image ${index}.` });
    }

    const updated = await Store.updateProduct3Image(id, index, finalImageUrl);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      message: `Product Image ${index} updated and saved to PostgreSQL successfully.`,
      imageIndex: index,
      imageUrl: finalImageUrl,
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct3Images = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = {};

    if (req.files) {
      if (req.files.image1 && req.files.image1[0]) {
        updateData.image_url_1 = saveUploadedFile(req.files.image1[0]);
      }
      if (req.files.image2 && req.files.image2[0]) {
        updateData.image_url_2 = saveUploadedFile(req.files.image2[0]);
      }
      if (req.files.image3 && req.files.image3[0]) {
        updateData.image_url_3 = saveUploadedFile(req.files.image3[0]);
      }
    }

    if (req.file) {
      const idx = req.body.index || req.query.index || 1;
      updateData[`image_url_${idx}`] = saveUploadedFile(req.file);
    }

    if (req.body.image_url_1 || req.body.imageUrl1) {
      updateData.image_url_1 = req.body.image_url_1 || req.body.imageUrl1;
    }
    if (req.body.image_url_2 || req.body.imageUrl2) {
      updateData.image_url_2 = req.body.image_url_2 || req.body.imageUrl2;
    }
    if (req.body.image_url_3 || req.body.imageUrl3) {
      updateData.image_url_3 = req.body.image_url_3 || req.body.imageUrl3;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, message: 'No images provided to update.' });
    }

    const updated = await Store.updateProduct3Images(id, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    res.json({
      success: true,
      message: 'Product images updated in PostgreSQL successfully.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Store.deleteProduct(id);
    res.json({ success: true, message: 'Perfume deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// CATEGORIES MANAGEMENT
exports.createCategory = async (req, res, next) => {
  try {
    const { name, slug, description, image_url } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }
    const catSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = await Store.createCategory({ name, slug: catSlug, description, image_url });
    res.status(201).json({ success: true, message: 'Category created.', data: created });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Store.updateCategory(id, req.body);
    res.json({ success: true, message: 'Category updated.', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Store.deleteCategory(id);
    res.json({ success: true, message: 'Category deleted.' });
  } catch (err) {
    next(err);
  }
};

// BRANDS MANAGEMENT
exports.createBrand = async (req, res, next) => {
  try {
    const { name, slug, description, logo_url } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Brand name is required.' });
    }
    const brandSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = await Store.createBrand({ name, slug: brandSlug, description, logo_url });
    res.status(201).json({ success: true, message: 'Brand created.', data: created });
  } catch (err) {
    next(err);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Store.updateBrand(id, req.body);
    res.json({ success: true, message: 'Brand updated.', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Store.deleteBrand(id);
    res.json({ success: true, message: 'Brand deleted.' });
  } catch (err) {
    next(err);
  }
};

// ORDERS MANAGEMENT
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Store.getAllOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['placed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updated = await Store.updateOrderStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, message: `Order marked as ${status}.`, data: updated });
  } catch (err) {
    next(err);
  }
};

// CUSTOMERS MANAGEMENT
exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Store.getAllUsers();
    res.json({ success: true, data: customers });
  } catch (err) {
    next(err);
  }
};

// IMAGE UPLOAD HANDLER
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    // Sync to frontend public uploads directory for seamless zero-latency dev serving
    try {
      const publicUploadsDir = path.join(__dirname, '../../../frontend/public/uploads');
      if (!fs.existsSync(publicUploadsDir)) {
        fs.mkdirSync(publicUploadsDir, { recursive: true });
      }
      fs.copyFileSync(req.file.path, path.join(publicUploadsDir, req.file.filename));
    } catch (syncErr) {
      // Non-fatal if frontend dir is not accessible
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativeUrl = `/uploads/${req.file.filename}`;
    const fileUrl = `${baseUrl}${relativeUrl}`;

    res.json({
      success: true,
      message: 'Image uploaded successfully.',
      url: relativeUrl,
      fullUrl: fileUrl,
      data: {
        url: relativeUrl,
        fullUrl: fileUrl,
        filename: req.file.filename
      },
      filename: req.file.filename
    });
  } catch (err) {
    next(err);
  }
};

exports.getInventory = async (req, res, next) => {
  try {
    const list = await Store.getInventoryList();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
};


