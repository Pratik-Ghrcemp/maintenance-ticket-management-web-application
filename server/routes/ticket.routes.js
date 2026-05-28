import { Router } from 'express';

import {
  addComment,
  assign,
  create,
  detail,
  list,
  stats,
  technicians,
  updateStatus
} from '../controllers/ticket.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { uploadTicketImage } from '../middleware/upload.middleware.js';
import {
  assignTicketValidation,
  commentValidation,
  createTicketValidation,
  statusValidation,
  ticketIdValidation
} from '../validations/ticket.validation.js';
import { validateRequest } from '../validations/validation.middleware.js';

const router = Router();

router.use(protect);

router.get('/stats', stats);
router.get('/technicians', technicians);
router.route('/').get(list).post(uploadTicketImage, createTicketValidation, validateRequest, create);

router
  .route('/:id')
  .get(ticketIdValidation, validateRequest, detail);

router.patch(
  '/:id/assign',
  restrictTo('admin'),
  ticketIdValidation,
  assignTicketValidation,
  validateRequest,
  assign
);

router.patch(
  '/:id/status',
  ticketIdValidation,
  statusValidation,
  validateRequest,
  updateStatus
);

router.post(
  '/:id/comments',
  ticketIdValidation,
  commentValidation,
  validateRequest,
  addComment
);

export default router;
