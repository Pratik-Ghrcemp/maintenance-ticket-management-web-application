import axiosInstance from '../api/axiosInstance.js';
import { handleApiError, handleApiSuccess } from '../api/apiResponseHandler.js';

export const getTickets = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/tickets', { params });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTicket = async (id) => {
  try {
    const response = await axiosInstance.get(`/tickets/${id}`);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const createTicket = async (payload) => {
  try {
    const response = await axiosInstance.post('/tickets', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const assignTechnician = async (ticketId, assignedTo) => {
  try {
    const response = await axiosInstance.patch(`/tickets/${ticketId}/assign`, {
      assigned_to: assignedTo
    });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateTicketStatus = async (ticketId, status) => {
  try {
    const response = await axiosInstance.patch(`/tickets/${ticketId}/status`, { status });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const addTicketComment = async (ticketId, comment) => {
  try {
    const response = await axiosInstance.post(`/tickets/${ticketId}/comments`, { comment });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTechnicians = async () => {
  try {
    const response = await axiosInstance.get('/tickets/technicians');
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTicketStats = async () => {
  try {
    const response = await axiosInstance.get('/tickets/stats');
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};
