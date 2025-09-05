import request from 'supertest';
import app from '../../src/server';
import mongoose from 'mongoose';
import Room from '../../src/models/Room';

describe('Room Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-campus-test');
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Room.deleteMany({});
  });

  describe('GET /rooms', () => {
    it('should return an empty list initially', async () => {
      const response = await request(app).get('/api/rooms');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('POST /rooms', () => {
    it('should create a new room', async () => {
      const roomData = {
        id: 'A-101',
        block: 'A',
        floor: 1,
        capacity: 2,
        occupied: 0,
        type: 'Double',
        status: 'Available',
        students: []
      };

      const response = await request(app).post('/api/rooms').send(roomData);
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(roomData.id);
    });

    it('should fail to create room with missing required fields', async () => {
      const roomData = {
        block: 'A',
        floor: 1,
        capacity: 2,
        occupied: 0,
        type: 'Double',
        status: 'Available',
        students: []
      };

      const response = await request(app).post('/api/rooms').send(roomData);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
