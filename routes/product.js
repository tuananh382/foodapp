const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  console.log('✅ /api/product route hit');
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Thêm sản phẩm mới
router.post('/', async (req, res) => {
  try {
    const { name, price, image, description } = req.body;
    const product = new Product({ name, price, image, description });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
