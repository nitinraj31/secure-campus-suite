import request from 'supertest';
import app from '../../src/server';
import mongoose from 'mongoose';
import User from '../../src/models/User';

describe('Auth Routes', () => {
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

  describe('POST /auth/signin', () => {
    it('should authenticate a valid user and return a token', async () => {
      const userData = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'Admin'
      };

      // Create user
      const user = new User(userData);
      await user.save();

      const response = await request(app)
        .post('/api/auth/signin')
        .send({ email: userData.email, password: userData.password });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user.email).toBe(userData.email);
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should reject missing email or password', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .send({ email: '', password: '' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
