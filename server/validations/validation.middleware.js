import { validationResult } from 'express-validator';

import { AppError } from '../utils/AppError.js';

export const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg
  }));

  next(new AppError('Validation failed.', 422, errors));
};
