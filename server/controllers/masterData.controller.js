import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/apiResponse.js';
import {
  createMasterData,
  deleteMasterData,
  getMasterDataById,
  listMasterData,
  updateMasterData
} from '../services/masterData.service.js';

const getResource = (req) => req.params.resource;

export const list = asyncHandler(async (req, res) => {
  const { items, meta } = await listMasterData(getResource(req), req.query);
  return sendSuccess(res, { message: 'Records fetched successfully.', data: items, meta });
});

export const detail = asyncHandler(async (req, res) => {
  const data = await getMasterDataById(getResource(req), req.params.id);
  return sendSuccess(res, { message: 'Record fetched successfully.', data });
});

export const create = asyncHandler(async (req, res) => {
  const data = await createMasterData(getResource(req), req.body);
  return sendSuccess(res, { statusCode: 201, message: 'Record created successfully.', data });
});

export const update = asyncHandler(async (req, res) => {
  const data = await updateMasterData(getResource(req), req.params.id, req.body);
  return sendSuccess(res, { message: 'Record updated successfully.', data });
});

export const remove = asyncHandler(async (req, res) => {
  await deleteMasterData(getResource(req), req.params.id);
  return sendSuccess(res, { message: 'Record deleted successfully.' });
});
