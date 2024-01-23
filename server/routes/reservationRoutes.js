const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.js');
const auth = require('../utils/auth'); // Assuming the auth middleware is in a file named 'auth.js' within a 'utils' directory

// Create reservation (protected route)
router.post('/reservations', auth, async (req, res) => {
  // ... (implementation from reservationController.js with authorization check)
});

// Get reservation by ID
router.get('/reservations/:id', async (req, res) => {
  // ... (implementation from reservationController.js)
});

// Update reservation (protected route)
router.put('/reservations/:id', auth, async (req, res) => {
  // ... (implementation from reservationController.js with authorization check)
});

module.exports = router;
