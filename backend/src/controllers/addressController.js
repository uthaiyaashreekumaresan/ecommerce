const Store = require('../db/store');

exports.getMyAddresses = async (req, res, next) => {
  try {
    const addresses = await Store.getUserAddresses(req.user.id);
    res.json({ success: true, data: addresses });
  } catch (err) {
    next(err);
  }
};

exports.addAddress = async (req, res, next) => {
  try {
    const { fullName, phone, addressLine1, addressLine2, city, state, pincode, addressType, isDefault } = req.body;
    if (!fullName || !phone || !addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({ success: false, message: 'Please provide full address details.' });
    }
    const address = await Store.addAddress(req.user.id, {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      addressType,
      isDefault: Boolean(isDefault)
    });
    res.status(201).json({ success: true, message: 'Address saved successfully.', data: address });
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fullName, phone, addressLine1, addressLine2, city, state, pincode, addressType, isDefault } = req.body;
    const updated = await Store.updateAddress(req.user.id, id, {
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      addressType,
      isDefault
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Address not found or unauthorized.' });
    }
    res.json({ success: true, message: 'Address updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const success = await Store.deleteAddress(req.user.id, id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Address not found or unauthorized.' });
    }
    res.json({ success: true, message: 'Address deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.setDefaultAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Store.setDefaultAddress(req.user.id, id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Address not found or unauthorized.' });
    }
    res.json({ success: true, message: 'Default address updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
};

