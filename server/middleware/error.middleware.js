import { sendError } from '../utils/apiResponse.js';

export const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = statusCode === 500 ? 'Internal server error' : error.message;
  let errors = error.errors || null;

  if (error.code === 'P2002') {
    statusCode = 409;
    message = 'A record with this value already exists.';
    errors = error.meta?.target || null;
  }

  if (error.code === 'P2003') {
    statusCode = 422;
    message = 'Invalid related record. Please check the selected values.';
  }

  if (error.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found.';
  }

  if (error.name === 'MulterError') {
    statusCode = 422;
    message = error.message;
  }

  if (process.env.NODE_ENV !== 'test') {
    console.error(error);
  }

  return sendError(res, {
    statusCode,
    message,
    errors
  });
};
