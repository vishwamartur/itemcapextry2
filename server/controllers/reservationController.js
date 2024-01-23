const Reservation = require('../models/reservation.js');
const Item = require('../models/item.js');

// Create reservation
exports.createReservation = async (req, res) => {
  try {
    const { itemId, startDate, endDate } = req.body;

    // Check item availability
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check for conflicts
    const conflictingReservations = await Reservation.find({
      itemId,
      $or: [
        { startDate: { $lte: endDate, $gte: startDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ],
    });
    if (conflictingReservations.length > 0) {
      return res.status(409).json({ message: 'Item is already reserved during that time' });
    }

    // Create reservation
    const reservation = new Reservation({
      itemId,
      userId: req.user._id, // Assuming you have access to the user's ID
      startDate,
      endDate,
      status: 'pending',
    });
    const newReservation = await reservation.save();

    // Update item availability status if necessary
    // ...

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm reservation
exports.confirmReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Check authorization (ensure the user has permission to confirm the reservation)
    // ...

    reservation.status = 'confirmed';
    await reservation.save();
    res.json({ message: 'Reservation confirmed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel reservation
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    // ... (similar logic as confirmReservation)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    // ...
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations (with optional filtering and pagination)
exports.getAllReservations = async (req, res) => {
  try {
    // ...
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
