const express = require('express');
const Order = require('../models/Order');
const OrderHistory = require('../models/OrderHistory');
const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, total, address, location } = req.body;
    const order = new Order({ userId, items, total, address, location });
    await order.save();
    // Add to order history
    await OrderHistory.findOneAndUpdate(
      { userId },
      { $push: { orders: order._id } },
      { upsert: true }
    );
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order by id
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status/location
router.patch('/:orderId', async (req, res) => {
  try {
    const { status, location } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, location, updatedAt: Date.now() },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
