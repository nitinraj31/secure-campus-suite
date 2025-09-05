import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later.'
    });
  }
});

// Stricter rate limiter for authentication routes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'Too many login attempts, please try again later.'
    });
  }
});

// Rate limiter for user creation
export const createUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 user creations per hour
  message: {
    success: false,
    message: 'Too many user creation attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for room operations
export const roomLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 room operations per windowMs
  message: {
    success: false,
    message: 'Too many room operations, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for admin operations
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 admin operations per windowMs
  message: {
    success: false,
    message: 'Too many admin operations, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
