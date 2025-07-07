const express = require('express');
const Order = require('../models/Order');
const OrderHistory = require('../models/OrderHistory');
const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    console.log('✅ /api/order POST route hit');
    console.log('Order data:', req.body);
    const { userId, items, total, address, location } = req.body;
    const order = new Order({ userId, items, total, address, location });
    await order.save();
    console.log('Order created:', order);
    // Add to order history
    await OrderHistory.findOneAndUpdate(
      { userId },
      { $push: { orders: order._id } },
      { upsert: true }
    );
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    console.log('✅ /api/order/user route hit for userId:', req.params.userId);
    const orders = await Order.find({ userId: req.params.userId });
    console.log('Found orders:', orders);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
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
