import Room from '../../src/models/Room';
import mongoose from 'mongoose';

describe('Room Model', () => {
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

  it('should create a room with valid data', async () => {
    const roomData = {
      id: 'A-101',
      block: 'A',
      floor: 1,
      capacity: 2,
      occupied: 1,
      type: 'Double',
      status: 'Available',
      students: ['John Doe']
    };

    const room = new Room(roomData);
    const savedRoom = await room.save();

    expect(savedRoom._id).toBeDefined();
    expect(savedRoom.id).toBe(roomData.id);
    expect(savedRoom.block).toBe(roomData.block);
    expect(savedRoom.capacity).toBe(roomData.capacity);
    expect(savedRoom.status).toBe(roomData.status);
  });

  it('should fail to create a room with missing required fields', async () => {
    const roomData = {
      block: 'A',
      floor: 1,
      capacity: 2,
      occupied: 1,
      type: 'Double',
      status: 'Available',
      students: ['John Doe']
    };

    const room = new Room(roomData);

    await expect(room.save()).rejects.toThrow();
  });
});
