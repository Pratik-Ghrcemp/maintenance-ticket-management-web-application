import { body } from 'express-validator';

import { PUBLIC_REGISTRATION_ROLES } from '../utils/auth.constants.js';

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 120 })
    .withMessage('Name must be between 2 and 120 characters.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email address is required.')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Za-z]/)
    .withMessage('Password must include at least one letter.')
    .matches(/\d/)
    .withMessage('Password must include at least one number.'),
  body('role')
    .optional()
    .isIn(PUBLIC_REGISTRATION_ROLES)
    .withMessage(`Role must be one of: ${PUBLIC_REGISTRATION_ROLES.join(', ')}.`),
  body('department_id')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('Department must be a valid positive integer.')
    .toInt()
];

export const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('A valid email address is required.')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required.')
];
