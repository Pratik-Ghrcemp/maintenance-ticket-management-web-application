import { AppError } from '../utils/AppError.js';
import { prisma } from '../database/prismaClient.js';
import { verifyToken } from '../utils/jwt.js';
import { toPrismaRole } from '../utils/auth.constants.js';

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new AppError('Authentication token is required.', 401);
    }

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.sub) }
    });

    if (!user || !user.isActive) {
      throw new AppError('Authentication token is invalid.', 401);
    }

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      departmentId: user.departmentId
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new AppError('Authentication token is invalid or expired.', 401));
    }

    next(error);
  }
};

export const restrictTo = (...roles) => {
  const allowedRoles = roles.map((role) => toPrismaRole(role)).filter(Boolean);

  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to access this resource.', 403));
    }

    next();
  };
};
