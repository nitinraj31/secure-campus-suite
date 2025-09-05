import { Request, Response } from 'express';
import Room from '../models/Room';

// Get available rooms
export const getAvailableRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find({
      $or: [
        { status: 'Available' },
        { $and: [{ status: 'Partially Occupied' }, { $expr: { $lt: ['$occupied', '$capacity'] } }] }
      ]
    });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Allot room to student (Warden only)
export const allotRoom = async (req: Request, res: Response) => {
  try {
    const { roomId, studentId, studentName } = req.body;

    if (!roomId || !studentId || !studentName) {
      return res.status(400).json({ message: 'Room ID, Student ID, and Student Name are required' });
    }

    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.occupied >= room.capacity) {
      return res.status(400).json({ message: 'Room is at full capacity' });
    }

    if (room.students.includes(studentName)) {
      return res.status(400).json({ message: 'Student is already assigned to this room' });
    }

    // Check if student is already in another room
    const existingRoom = await Room.findOne({ students: studentName });
    if (existingRoom) {
      return res.status(400).json({ message: 'Student is already assigned to another room' });
    }

    room.students.push(studentName);
    room.occupied += 1;

    if (room.occupied === room.capacity) {
      room.status = 'Occupied';
    } else if (room.occupied > 0) {
      room.status = 'Partially Occupied';
    }

    await room.save();
    res.json({ message: 'Room allotted successfully', room });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all rooms (existing functionality, moved here for consistency)
export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get room by ID (existing functionality)
export const getRoomById = async (req: Request, res: Response) => {
  try {
    const room = await Room.findOne({ id: req.params.id });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
