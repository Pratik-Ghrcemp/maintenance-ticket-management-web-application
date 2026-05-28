import axiosInstance from '../api/axiosInstance.js';
import { handleApiError, handleApiSuccess } from '../api/apiResponseHandler.js';

export const loginRequest = async (payload) => {
  try {
    const response = await axiosInstance.post('/auth/login', payload);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const registerRequest = async (payload) => {
  try {
    const response = await axiosInstance.post('/auth/register', payload);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getRegistrationDepartmentsRequest = async () => {
  try {
    const response = await axiosInstance.get('/auth/departments');
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axiosInstance.post('/auth/logout');
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getCurrentUserRequest = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};
