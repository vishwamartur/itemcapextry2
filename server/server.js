const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./utils/database');
const auth = require('./utils/auth');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reservations', reservationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
