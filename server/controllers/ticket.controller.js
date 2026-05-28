import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import {
  addTicketComment,
  assignTechnician,
  createTicket,
  getTicket,
  getTicketStats,
  listTechnicians,
  listTickets,
  updateTicketStatus
} from '../services/ticket.service.js';

export const list = asyncHandler(async (req, res) => {
  const { items, meta } = await listTickets(req.query, req.user);
  return sendSuccess(res, { message: 'Tickets fetched successfully.', data: items, meta });
});

export const detail = asyncHandler(async (req, res) => {
  const data = await getTicket(req.params.id, req.user);
  return sendSuccess(res, { message: 'Ticket fetched successfully.', data });
});

export const create = asyncHandler(async (req, res) => {
  const data = await createTicket(req.body, req.user, req.file);
  return sendSuccess(res, { statusCode: 201, message: 'Ticket created successfully.', data });
});

export const assign = asyncHandler(async (req, res) => {
  const data = await assignTechnician(req.params.id, req.body.assigned_to, req.user);
  return sendSuccess(res, { message: 'Technician assigned successfully.', data });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const data = await updateTicketStatus(req.params.id, req.body.status, req.user);
  return sendSuccess(res, { message: 'Ticket status updated successfully.', data });
});

export const addComment = asyncHandler(async (req, res) => {
  const data = await addTicketComment(req.params.id, req.body.comment, req.user);
  return sendSuccess(res, { statusCode: 201, message: 'Comment added successfully.', data });
});

export const technicians = asyncHandler(async (req, res) => {
  const data = await listTechnicians();
  return sendSuccess(res, { message: 'Technicians fetched successfully.', data });
});

export const stats = asyncHandler(async (req, res) => {
  const data = await getTicketStats(req.user);
  return sendSuccess(res, { message: 'Ticket stats fetched successfully.', data });
});
