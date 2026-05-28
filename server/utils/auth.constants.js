export const AUTH_ROLES = {
  admin: 'ADMIN',
  department_user: 'DEPARTMENT_USER',
  technician: 'TECHNICIAN'
};

export const PUBLIC_ROLES = Object.keys(AUTH_ROLES);
export const PUBLIC_REGISTRATION_ROLES = ['department_user', 'technician'];

export const toPrismaRole = (role = 'department_user') => AUTH_ROLES[role];

export const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role.toLowerCase(),
  department_id: user.departmentId,
  created_at: user.createdAt
});
