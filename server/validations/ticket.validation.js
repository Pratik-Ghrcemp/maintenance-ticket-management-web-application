import { body, param } from 'express-validator';

const statuses = ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
const priorities = ['Low', 'Medium', 'High', 'Urgent'];

export const ticketIdValidation = [
  param('id').isInt({ min: 1 }).withMessage('Ticket id must be a positive integer.').toInt()
];

export const createTicketValidation = [
  body('title').trim().notEmpty().withMessage('Title is required.').isLength({ max: 180 }),
  body('description').trim().notEmpty().withMessage('Description is required.'),
  body('priority').optional().isIn(priorities).withMessage('Invalid priority.'),
  body('facility_id').isInt({ min: 1 }).withMessage('Facility is required.').toInt(),
  body('area_id').isInt({ min: 1 }).withMessage('Area is required.').toInt(),
  body('category_id').isInt({ min: 1 }).withMessage('Category is required.').toInt(),
  body('department_id')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Department must be a positive integer.')
    .toInt()
];

export const assignTicketValidation = [
  body('assigned_to').isInt({ min: 1 }).withMessage('Technician is required.').toInt()
];

export const statusValidation = [
  body('status').isIn(statuses).withMessage(`Status must be one of: ${statuses.join(', ')}.`)
];

export const commentValidation = [
  body('comment').trim().notEmpty().withMessage('Comment is required.')
];
