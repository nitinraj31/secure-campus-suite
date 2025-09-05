import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const debugDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-campus-suite');

    const users = await User.find({}).select('+password');
    console.log('Users in database:');
    users.forEach(user => {
      console.log(`- ${user.email}: ${user.password} (role: ${user.role})`);
    });

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

debugDatabase();
