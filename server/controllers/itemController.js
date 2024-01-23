const Item = require('../models/item.js');
const Reservation = require('../models/reservation.js');

// Fetch all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search items
exports.searchItems = async (req, res) => {
  try {
    const { query } = req.body;
    const items = await Item.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create item (if applicable)
exports.createItem = async (req, res) => {
  try {
    // Implement item creation logic here
    res.json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update item (if applicable)
exports.updateItem = async (req, res) => {
  try {
    // Implement item update logic here
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Manage reservations
exports.createReservation = async (req, res) => {
  try {
    // Implement reservation creation logic (check availability, prevent conflicts)
    res.json({ message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update reservation (e.g., confirm or cancel)
exports.updateReservation = async (req, res) => {
  try {
    // Implement reservation update logic (check authorization)
    res.json({ message: 'Reservation updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
