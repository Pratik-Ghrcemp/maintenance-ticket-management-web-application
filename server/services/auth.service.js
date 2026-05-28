import bcrypt from 'bcryptjs';

import { prisma } from '../database/prismaClient.js';
import { AppError } from '../utils/AppError.js';
import { generateToken } from '../utils/jwt.js';
import { toPrismaRole, toPublicUser } from '../utils/auth.constants.js';

const buildAuthPayload = (user) => ({
  user: toPublicUser(user),
  token: generateToken({
    sub: user.id,
    role: user.role,
    email: user.email
  })
});

export const registerUser = async ({ name, email, password, role, department_id }) => {
  const prismaRole = toPrismaRole(role);

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    throw new AppError('Email is already registered.', 409);
  }

  if (prismaRole === 'DEPARTMENT_USER' && !department_id) {
    throw new AppError('Department is required for department user accounts.', 422);
  }

  if (department_id) {
    const department = await prisma.department.findFirst({
      where: { id: Number(department_id), isActive: true }
    });

    if (!department) {
      throw new AppError('Selected department is not available.', 422);
    }
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: prismaRole,
      departmentId: department_id ?? null,
      technician:
        prismaRole === 'TECHNICIAN'
          ? {
              create: {}
            }
          : undefined
    }
  });

  return buildAuthPayload(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user || !user.isActive) {
    throw new AppError('Invalid email or password.', 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    throw new AppError('Invalid email or password.', 401);
  }

  return buildAuthPayload(user);
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  if (!user || !user.isActive) {
    throw new AppError('User account is not available.', 401);
  }

  return toPublicUser(user);
};

export const listRegistrationDepartments = async () => {
  return prisma.department.findMany({
    where: { isActive: true },
    select: { id: true, name: true, code: true },
    orderBy: { name: 'asc' }
  });
};
