import { body, param } from 'express-validator';

const validResources = ['departments', 'facilities', 'areas', 'categories'];

export const resourceValidation = [
  param('resource').isIn(validResources).withMessage('Invalid master data resource.')
];

export const idValidation = [
  param('id').isInt({ min: 1 }).withMessage('Record id must be a positive integer.').toInt()
];

export const masterDataValidation = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ max: 120 }),
  body('code').optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 40 }),
  body('address').optional({ nullable: true, checkFalsy: true }).trim().isLength({ max: 255 }),
  body('facility_id')
    .custom((value, { req }) => {
      if (req.params.resource === 'areas' && !value) {
        throw new Error('Facility is required for areas.');
      }
      return true;
    })
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage('Facility must be a positive integer.')
    .toInt(),
  body('is_active').optional().isBoolean().withMessage('Active flag must be true or false.').toBoolean()
];
