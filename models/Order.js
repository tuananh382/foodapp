const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // pending, delivering, completed, cancelled
  address: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);
