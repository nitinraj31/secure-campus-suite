import User from '../../src/models/User';
import mongoose from 'mongoose';

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-campus-test');
  });

  afterAll(async () => {
    // Clean up and close connection
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear users collection before each test
    await User.deleteMany({});
  });

  describe('User Creation', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'Student'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.role).toBe(userData.role);
      expect(savedUser.password).not.toBe(userData.password); // Should be hashed
    });

    it('should fail to create user with invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
        role: 'Student'
      };

      const user = new User(userData);

      await expect(user.save()).rejects.toThrow();
    });

    it('should fail to create user with short password', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123',
        role: 'Student'
      };

      const user = new User(userData);

      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('Password Methods', () => {
    it('should hash password before saving', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'Student'
      };

      const user = new User(userData);
      await user.save();

      expect(user.password).not.toBe(userData.password);
      expect(user.password.length).toBeGreaterThan(10); // Hashed password should be longer
    });

    it('should compare password correctly', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'Student'
      };

      const user = new User(userData);
      await user.save();

      const isMatch = await user.comparePassword('password123');
      expect(isMatch).toBe(true);

      const isNotMatch = await user.comparePassword('wrongpassword');
      expect(isNotMatch).toBe(false);
    });
  });

  describe('User Methods', () => {
    it('should generate auth token', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'Student'
      };

      const user = new User(userData);
      await user.save();

      const token = user.generateAuthToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(10);
    });

    it('should return user without password in JSON', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'Student'
      };

      const user = new User(userData);
      await user.save();

      const userJSON = user.toJSON();
      expect(userJSON.password).toBeUndefined();
      expect(userJSON.name).toBe(userData.name);
      expect(userJSON.email).toBe(userData.email);
    });
  });
});
