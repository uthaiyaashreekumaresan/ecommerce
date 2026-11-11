const Store = require('../db/store');

exports.getPublicHomePage = async (req, res, next) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    const data = await Store.getPublicHomePage();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAdminHomePage = async (req, res, next) => {
  try {
    const data = await Store.getAdminHomePage();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// --- SLIDER CONTROLLERS ---
exports.createSlider = async (req, res, next) => {
  try {
    const { title, tag, subtitle, primary_btn_text, primary_btn_link, secondary_btn_text, secondary_btn_link, image_url, display_order, is_active } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Slide title is required' });
    }
    const newSlide = await Store.createSlider({
      title,
      tag,
      subtitle,
      primary_btn_text,
      primary_btn_link,
      secondary_btn_text,
      secondary_btn_link,
      image_url,
      display_order,
      is_active
    });
    res.status(201).json({ success: true, message: 'Slide created successfully', data: newSlide });
  } catch (err) {
    next(err);
  }
};

exports.updateSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Store.updateSlider(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }
    res.json({ success: true, message: 'Slide updated successfully', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Store.deleteSlider(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }
    res.json({ success: true, message: 'Slide deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.toggleSlider = async (req, res, next) => {
  try {
    const { id } = req.params;
    const slide = await Store.toggleSlider(id);
    if (!slide) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }
    res.json({ success: true, message: `Slide ${slide.is_active ? 'enabled' : 'disabled'} successfully`, data: slide });
  } catch (err) {
    next(err);
  }
};

exports.reorderSliders = async (req, res, next) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds array is required' });
    }
    const sliders = await Store.reorderSliders(orderedIds);
    res.json({ success: true, message: 'Sliders reordered successfully', data: sliders });
  } catch (err) {
    next(err);
  }
};

// --- SECTION CONTROLLERS ---
exports.updateSections = async (req, res, next) => {
  try {
    const { sections } = req.body;
    if (!Array.isArray(sections)) {
      return res.status(400).json({ success: false, message: 'sections array is required' });
    }
    const updated = await Store.updateSections(sections);
    res.json({ success: true, message: 'Home page sections updated successfully', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.toggleSection = async (req, res, next) => {
  try {
    const { key } = req.params;
    const section = await Store.toggleSection(key);
    if (!section) {
      return res.status(404).json({ success: false, message: 'Section not found' });
    }
    res.json({ success: true, message: `Section ${section.is_enabled ? 'enabled' : 'disabled'} successfully`, data: section });
  } catch (err) {
    next(err);
  }
};

// --- OFFER CONTROLLERS ---
exports.createOffer = async (req, res, next) => {
  try {
    const offer = await Store.createOffer(req.body);
    res.status(201).json({ success: true, message: 'Offer banner created successfully', data: offer });
  } catch (err) {
    next(err);
  }
};

exports.updateOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await Store.updateOffer(id, req.body);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer banner updated successfully', data: offer });
  } catch (err) {
    next(err);
  }
};

exports.deleteOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Store.deleteOffer(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, message: 'Offer banner deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.toggleOffer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const offer = await Store.toggleOffer(id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, message: `Offer ${offer.is_active ? 'enabled' : 'disabled'} successfully`, data: offer });
  } catch (err) {
    next(err);
  }
};

// --- COLLECTIONS CONTROLLER ---
exports.updateCollections = async (req, res, next) => {
  try {
    const collections = await Store.updateCollections(req.body);
    res.json({ success: true, message: 'Home page collections updated successfully', data: collections });
  } catch (err) {
    next(err);
  }
};

