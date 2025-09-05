import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['Student', 'Warden', 'Admin'])
    .withMessage('Role must be Student, Warden, or Admin')
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

export const validateUserUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('role')
    .optional()
    .isIn(['Student', 'Warden', 'Admin'])
    .withMessage('Role must be Student, Warden, or Admin')
];

// Room validation rules
export const validateRoomCreation = [
  body('id')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Room ID must be between 1 and 20 characters'),
  body('block')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Block must be between 1 and 10 characters'),
  body('floor')
    .isInt({ min: 1, max: 50 })
    .withMessage('Floor must be between 1 and 50'),
  body('capacity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Capacity must be between 1 and 10'),
  body('type')
    .isIn(['Single', 'Double', 'Triple', 'Quad'])
    .withMessage('Type must be Single, Double, Triple, or Quad')
];

export const validateRoomUpdate = [
  body('status')
    .optional()
    .isIn(['Available', 'Occupied', 'Partially Occupied', 'Maintenance'])
    .withMessage('Status must be Available, Occupied, Partially Occupied, or Maintenance'),
  body('capacity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Capacity must be between 1 and 10')
];

// Parameter validation
export const validateIdParam = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
];

export const validateRoomIdParam = [
  param('roomId')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Invalid room ID')
];

// Query validation
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
];

export const validateRoleFilter = [
  query('role')
    .optional()
    .isIn(['Student', 'Warden', 'Admin'])
    .withMessage('Role must be Student, Warden, or Admin')
];
