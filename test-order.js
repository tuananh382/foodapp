const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodapp');

// Import Order model
const Order = require('./models/Order');

async function createTestOrder() {
  try {
    const testOrder = new Order({
      userId: '686827cb3f102fe9b36599a3', // Using the testuser ID
      items: [
        {
          productId: 'test-product-1',
          name: 'Pizza Hải Sản',
          price: 150,
          quantity: 2,
          image: 'https://i.imgur.com/seafoodpizza.jpg',
        },
        {
          productId: 'test-product-2',
          name: 'Bánh Mì Thịt',
          price: 25,
          quantity: 1,
          image: 'https://i.imgur.com/banhmithit.jpg',
        }
      ],
      total: 325,
      status: 'pending',
      address: '123 Test Street, Test City',
      location: {
        lat: 10.762622,
        lng: 106.660172,
      }
    });

    await testOrder.save();
    console.log('Test order created:', testOrder);
    process.exit(0);
  } catch (error) {
    console.error('Error creating test order:', error);
    process.exit(1);
  }
}

createTestOrder(); 