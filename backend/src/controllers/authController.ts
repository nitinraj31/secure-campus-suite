import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Sign in controller for admin or student demo
export const signIn = async (req: Request, res: Response) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    console.log(`Found user: ${user.email}, password hash: ${user.password.substring(0, 20)}...`);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password comparison result: ${isMatch} for password: ${password}`);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Authentication successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
  }
};
