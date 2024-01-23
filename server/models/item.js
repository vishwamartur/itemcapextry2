const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  available: { type: Boolean, default: true },
  // Add other necessary details
});

module.exports = mongoose.model('Item', itemSchema);
