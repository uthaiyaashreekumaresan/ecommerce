const Store = require('../db/store');

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields.' });
    }
    const saved = await Store.submitContactMessage({ name, email, phone, subject, message });
    res.status(201).json({ success: true, message: 'Your message has been sent to our perfumer concierges.', data: saved });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const msgs = await Store.getContactMessages();
    res.json({ success: true, data: msgs });
  } catch (err) {
    next(err);
  }
};

