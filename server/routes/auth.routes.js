import { Router } from 'express';

import { departments, login, logout, me, register } from '../controllers/auth.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { loginValidation, registerValidation } from '../validations/auth.validation.js';
import { validateRequest } from '../validations/validation.middleware.js';

const router = Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/departments', departments);
router.post('/logout', protect, logout);
router.get('/me', protect, me);

export const adminOnly = [protect, restrictTo('admin')];

export default router;
