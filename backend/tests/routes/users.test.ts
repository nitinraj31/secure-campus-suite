import request from 'supertest';
import app from '../../src/server';
import mongoose from 'mongoose';
import User from '../../src/models/User';

describe('User Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-campus-test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('GET /users', () => {
    it('should return an empty list initially', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'Student'
      };

      const response = await request(app).post('/api/users').send(userData);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe(userData.email);
    });

    it('should fail to create user with invalid email', async () => {
      const userData = {
        name: 'Test User',
        email: 'invalid-email',
        password: 'password123',
        role: 'Student'
      };

      const response = await request(app).post('/api/users').send(userData);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
