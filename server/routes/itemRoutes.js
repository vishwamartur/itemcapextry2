const express = require('express');
const router = express.Router();
const Item = require('../models/item.js');
const auth = require('../utils/auth.js'); // Assuming the auth middleware is in a file named 'auth.js' within a 'utils' directory

// Fetch all items
router.get('/items', async (req, res) => {
  // ... (implementation from itemController.js)
});

// Search items
router.post('/items/search', async (req, res) => {
  // ... (implementation from itemController.js)
});

// Get item by ID
router.get('/items/:id', async (req, res) => {
  // ... (implementation from itemController.js)
});

// Manage reservations (protected route)
router.post('/items/:id/reservations.js', auth, async (req, res) => {
  // ... (implementation from itemController.js with authorization check)
});

module.exports = router;
