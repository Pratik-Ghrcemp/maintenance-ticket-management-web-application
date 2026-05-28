import { sendSuccess } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  getUserById,
  listRegistrationDepartments,
  loginUser,
  registerUser
} from '../services/auth.service.js';

export const register = asyncHandler(async (req, res) => {
  const data = await registerUser(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: 'Registration successful.',
    data
  });
});

export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);

  return sendSuccess(res, {
    message: 'Login successful.',
    data
  });
});

export const logout = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: 'Logout successful.'
  });
});

export const me = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user.id);

  return sendSuccess(res, {
    message: 'Authenticated user fetched successfully.',
    data: { user }
  });
});

export const departments = asyncHandler(async (req, res) => {
  const data = await listRegistrationDepartments();

  return sendSuccess(res, {
    message: 'Departments fetched successfully.',
    data
  });
});
