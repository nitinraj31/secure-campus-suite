import mongoose from 'mongoose';
import User from '../models/User';
import Room from '../models/Room';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-campus-suite');

    // Clear existing data
    await User.deleteMany({});
    await Room.deleteMany({});

    // Create demo users (password will be hashed by the pre-save hook)
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@campus.com',
      password: 'admin123',
      role: 'Admin',
      room: null,
      status: 'Active'
    });

    const studentUser = new User({
      name: 'Demo Student',
      email: 'student@campus.com',
      password: 'admin123',
      role: 'Student',
      room: 'A-101',
      status: 'Active'
    });

    const wardenUser = new User({
      name: 'Demo Warden',
      email: 'warden@campus.com',
      password: 'admin123',
      role: 'Warden',
      room: null,
      status: 'Active'
    });

    await adminUser.save();
    await studentUser.save();
    await wardenUser.save();

    // Create demo rooms
    const rooms = [
      {
        id: 'A-101',
        block: 'A',
        floor: 1,
        capacity: 2,
        occupied: 1,
        type: 'Double',
        status: 'Partially Occupied',
        students: ['Demo Student']
      },
      {
        id: 'A-102',
        block: 'A',
        floor: 1,
        capacity: 2,
        occupied: 0,
        type: 'Double',
        status: 'Available',
        students: []
      },
      {
        id: 'B-201',
        block: 'B',
        floor: 2,
        capacity: 1,
        occupied: 1,
        type: 'Single',
        status: 'Occupied',
        students: ['John Smith']
      }
    ];

    await Room.insertMany(rooms);

    console.log('Database seeded successfully!');
    console.log('Demo users created:');
    console.log('- admin@campus.com / admin123 (Admin)');
    console.log('- student@campus.com / admin123 (Student)');
    console.log('- warden@campus.com / admin123 (Warden)');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
