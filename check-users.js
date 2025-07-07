const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/foodapp');

// Import User model
const User = require('./models/User');

async function checkUsers() {
  try {
    const users = await User.find({});
    console.log('Users in database:', users);
    process.exit(0);
  } catch (error) {
    console.error('Error checking users:', error);
    process.exit(1);
  }
}

checkUsers(); 