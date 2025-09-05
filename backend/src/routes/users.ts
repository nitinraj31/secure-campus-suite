import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Get all users (Admin and Warden only)
router.get('/', authenticate, authorize('Admin', 'Warden'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Users can only view their own profile unless they're admin/warden
    if (!req.user || (req.user.role !== 'Admin' && req.user.role !== 'Warden' && req.user._id.toString() !== req.params.id)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put(
  '/:id',
  authenticate,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('role').optional().isIn(['Student', 'Warden', 'Admin']).withMessage('Invalid role'),
    body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Users can only update their own profile unless they're admin
      if (!req.user || (req.user.role !== 'Admin' && req.user._id.toString() !== req.params.id)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Delete user (Admin only)
router.delete('/:id', authenticate, authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
