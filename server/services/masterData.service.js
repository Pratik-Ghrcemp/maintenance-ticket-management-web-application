import { prisma } from '../database/prismaClient.js';
import { AppError } from '../utils/AppError.js';
import { buildPaginationMeta, contains, getPagination } from '../utils/query.js';

const models = {
  departments: {
    delegate: prisma.department,
    searchable: ['name', 'code'],
    include: undefined
  },
  facilities: {
    delegate: prisma.facility,
    searchable: ['name', 'code', 'address'],
    include: undefined
  },
  areas: {
    delegate: prisma.area,
    searchable: ['name'],
    include: { facility: true }
  },
  categories: {
    delegate: prisma.category,
    searchable: ['name'],
    include: undefined
  }
};

const getModel = (resource) => {
  const model = models[resource];

  if (!model) {
    throw new AppError('Master data resource not found.', 404);
  }

  return model;
};

const buildWhere = (resource, query) => {
  const model = getModel(resource);
  const where = {};

  if (query.search) {
    where.OR = model.searchable.map((field) => ({ [field]: contains(query.search) }));
  }

  if (query.is_active !== undefined) {
    where.isActive = query.is_active === 'true';
  }

  if (resource === 'areas' && query.facility_id) {
    where.facilityId = Number(query.facility_id);
  }

  return where;
};

export const listMasterData = async (resource, query) => {
  const model = getModel(resource);
  const { page, limit, skip } = getPagination(query);
  const where = buildWhere(resource, query);

  const [items, total] = await Promise.all([
    model.delegate.findMany({
      where,
      include: model.include,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    }),
    model.delegate.count({ where })
  ]);

  return {
    items,
    meta: buildPaginationMeta({ page, limit, total })
  };
};

export const getMasterDataById = async (resource, id) => {
  const model = getModel(resource);
  const item = await model.delegate.findUnique({
    where: { id: Number(id) },
    include: model.include
  });

  if (!item) {
    throw new AppError('Record not found.', 404);
  }

  return item;
};

export const createMasterData = async (resource, data) => {
  const model = getModel(resource);
  return model.delegate.create({ data: normalizeData(resource, data) });
};

export const updateMasterData = async (resource, id, data) => {
  await getMasterDataById(resource, id);
  const model = getModel(resource);

  return model.delegate.update({
    where: { id: Number(id) },
    data: normalizeData(resource, data)
  });
};

export const deleteMasterData = async (resource, id) => {
  await getMasterDataById(resource, id);
  const model = getModel(resource);

  return model.delegate.delete({
    where: { id: Number(id) }
  });
};

const normalizeData = (resource, data) => {
  const allowedFields = {
    departments: ['name', 'code', 'is_active'],
    facilities: ['name', 'code', 'address', 'is_active'],
    areas: ['name', 'facility_id', 'is_active'],
    categories: ['name', 'is_active']
  };
  const normalized = {};

  allowedFields[resource].forEach((field) => {
    if (data[field] !== undefined) {
      normalized[field] = data[field];
    }
  });

  if (resource === 'areas' && normalized.facility_id !== undefined) {
    normalized.facilityId = Number(normalized.facility_id);
    delete normalized.facility_id;
  }

  if (normalized.is_active !== undefined) {
    normalized.isActive = Boolean(normalized.is_active);
    delete normalized.is_active;
  }

  return normalized;
};
