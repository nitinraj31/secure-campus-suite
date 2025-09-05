import express from 'express';
import { body, validationResult } from 'express-validator';
import Room from '../models/Room';
import { authenticate, authorize } from '../middleware/auth';
import { getAllRooms, getRoomById, getAvailableRooms, allotRoom } from '../controllers/roomController';

const router = express.Router();

// Get all rooms
router.get('/', authenticate, getAllRooms);

// Get available rooms
router.get('/available', authenticate, getAvailableRooms);

// Allot room to student (Warden only)
router.post('/allot', authenticate, authorize('Warden'), allotRoom);

// Get room by ID
router.get('/:id', authenticate, getRoomById);

// Create new room (Admin only)
router.post(
  '/',
  authenticate,
  authorize('Admin'),
  [
    body('id').notEmpty().withMessage('Room ID is required'),
    body('block').notEmpty().withMessage('Block is required'),
    body('floor').isInt({ min: 0 }).withMessage('Floor must be a non-negative integer'),
    body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('type').notEmpty().withMessage('Type is required'),
    body('status').isIn(['Available', 'Occupied', 'Partially Occupied', 'Maintenance']).withMessage('Invalid status')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingRoom = await Room.findOne({ id: req.body.id });
      if (existingRoom) {
        return res.status(400).json({ message: 'Room with this ID already exists' });
      }

      const room = new Room(req.body);
      await room.save();
      res.status(201).json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update room (Admin only)
router.put(
  '/:id',
  authenticate,
  authorize('Admin'),
  [
    body('floor').optional().isInt({ min: 0 }).withMessage('Floor must be a non-negative integer'),
    body('capacity').optional().isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('status').optional().isIn(['Available', 'Occupied', 'Partially Occupied', 'Maintenance']).withMessage('Invalid status')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const room = await Room.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete room (Admin only)
router.delete('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ id: req.params.id });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
