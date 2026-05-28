import { sendSuccess } from '../utils/apiResponse.js';

export const getHealth = (req, res) => {
  return sendSuccess(res, {
    message: 'Maintenance Ticket Management API is healthy.',
    data: {
      service: 'maintenance-ticket-management-api',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
};
