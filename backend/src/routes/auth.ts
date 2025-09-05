import express from 'express';
import { body } from 'express-validator';
import { signIn } from '../controllers/authController';
import { validateUserLogin } from '../middleware/validation';

const router = express.Router();

// POST /auth/signin - Sign in route for admin or student demo
router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateUserLogin,
  signIn
);

export default router;
