const mongoose = require('mongoose');

const OrderHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

module.exports = mongoose.model('OrderHistory', OrderHistorySchema);
