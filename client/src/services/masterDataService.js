import axiosInstance from '../api/axiosInstance.js';
import { handleApiError, handleApiSuccess } from '../api/apiResponseHandler.js';

export const getMasterData = async (resource, params = {}) => {
  try {
    const response = await axiosInstance.get(`/master-data/${resource}`, { params });
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const createMasterData = async (resource, payload) => {
  try {
    const response = await axiosInstance.post(`/master-data/${resource}`, payload);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateMasterData = async (resource, id, payload) => {
  try {
    const response = await axiosInstance.put(`/master-data/${resource}/${id}`, payload);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteMasterData = async (resource, id) => {
  try {
    const response = await axiosInstance.delete(`/master-data/${resource}/${id}`);
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};
