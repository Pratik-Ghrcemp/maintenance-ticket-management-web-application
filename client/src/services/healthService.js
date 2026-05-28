import axiosInstance from '../api/axiosInstance.js';
import { handleApiError, handleApiSuccess } from '../api/apiResponseHandler.js';

export const getApiHealth = async () => {
  try {
    const response = await axiosInstance.get('/health');
    return handleApiSuccess(response);
  } catch (error) {
    return handleApiError(error);
  }
};
