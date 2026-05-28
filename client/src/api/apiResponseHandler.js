export const handleApiSuccess = (response) => {
  return response?.data;
};

export const handleApiError = (error) => {
  const response = error?.response?.data;

  return {
    success: false,
    message: response?.message || error.message || 'Something went wrong.',
    errors: response?.errors || null,
    statusCode: error?.response?.status || 500
  };
};
