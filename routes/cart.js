const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get cart by userId
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add/update cart
router.post('/:userId', async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clear cart
router.delete('/:userId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
