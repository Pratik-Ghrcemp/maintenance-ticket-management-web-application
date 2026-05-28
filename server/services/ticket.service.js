import { prisma } from '../database/prismaClient.js';
import { AppError } from '../utils/AppError.js';
import { buildPaginationMeta, contains, getPagination } from '../utils/query.js';
import {
  toPrismaPriority,
  toPrismaStatus,
  toPublicPriority,
  toPublicStatus
} from '../utils/ticket.constants.js';

const ticketInclude = {
  facility: true,
  area: true,
  category: true,
  department: true,
  createdBy: { select: { id: true, name: true, email: true, role: true } },
  assignedTo: { select: { id: true, name: true, email: true, role: true } }
};

const detailInclude = {
  ...ticketInclude,
  comments: {
    include: { user: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: 'desc' }
  },
  auditLogs: {
    include: { user: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: 'desc' }
  }
};

const isAdmin = (user) => user.role === 'ADMIN';
const isTechnician = (user) => user.role === 'TECHNICIAN';

const roleWhere = (user) => {
  if (isAdmin(user)) return {};
  if (isTechnician(user)) return { assignedToId: user.id };
  return { createdById: user.id };
};

const buildWhere = (query, user) => {
  const where = { ...roleWhere(user) };

  if (query.search) {
    where.OR = [{ title: contains(query.search) }, { description: contains(query.search) }];
  }
  if (query.status) where.status = toPrismaStatus(query.status);
  if (query.priority) where.priority = toPrismaPriority(query.priority);
  if (query.technician) where.assignedToId = Number(query.technician);
  if (query.department) where.departmentId = Number(query.department);
  if (query.category) where.categoryId = Number(query.category);
  if (query.date) {
    const start = new Date(query.date);
    const end = new Date(query.date);
    end.setDate(end.getDate() + 1);
    where.createdAt = { gte: start, lt: end };
  }

  return where;
};

const formatTicket = (ticket) => ({
  ...ticket,
  status: toPublicStatus(ticket.status),
  priority: toPublicPriority(ticket.priority),
  facility_id: ticket.facilityId,
  area_id: ticket.areaId,
  category_id: ticket.categoryId,
  department_id: ticket.departmentId,
  assigned_to: ticket.assignedToId,
  image_url: ticket.imageUrl,
  created_at: ticket.createdAt,
  updated_at: ticket.updatedAt
});

const assertTicketAccess = (ticket, user) => {
  if (isAdmin(user)) return;
  if (isTechnician(user) && ticket.assignedToId === user.id) return;
  if (ticket.createdById === user.id) return;
  throw new AppError('You do not have permission to access this ticket.', 403);
};

const audit = async ({ ticketId, userId, action, oldValue = null, newValue = null }) => {
  await prisma.auditLog.create({
    data: { ticketId, userId, action, oldValue, newValue }
  });
};

const notify = async ({ userId, title, message }) => {
  if (!userId) return;
  await prisma.notification.create({ data: { userId, title, message } });
};

export const listTickets = async (query, user) => {
  const { page, limit, skip } = getPagination(query);
  const where = buildWhere(query, user);

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      include: ticketInclude,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    }),
    prisma.ticket.count({ where })
  ]);

  return {
    items: tickets.map(formatTicket),
    meta: buildPaginationMeta({ page, limit, total })
  };
};

export const getTicket = async (id, user) => {
  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
    include: detailInclude
  });

  if (!ticket) throw new AppError('Ticket not found.', 404);
  assertTicketAccess(ticket, user);
  return formatTicket(ticket);
};

export const createTicket = async (data, user, file) => {
  const departmentId = isAdmin(user) ? Number(data.department_id || user.departmentId) : Number(user.departmentId);

  if (!departmentId) {
    throw new AppError('Department is required to create a ticket.', 422);
  }

  await validateTicketRelations({
    facilityId: Number(data.facility_id),
    areaId: Number(data.area_id),
    categoryId: Number(data.category_id),
    departmentId
  });

  const ticket = await prisma.ticket.create({
    data: {
      title: data.title,
      description: data.description,
      priority: toPrismaPriority(data.priority || 'Medium'),
      facilityId: Number(data.facility_id),
      areaId: Number(data.area_id),
      categoryId: Number(data.category_id),
      departmentId,
      createdById: user.id,
      imageUrl: file ? `/uploads/${file.filename}` : data.image_url || null
    },
    include: ticketInclude
  });

  await audit({
    ticketId: ticket.id,
    userId: user.id,
    action: 'TICKET_CREATED',
    newValue: ticket.status
  });

  return formatTicket(ticket);
};

const validateTicketRelations = async ({ facilityId, areaId, categoryId, departmentId }) => {
  const [facility, area, category, department] = await Promise.all([
    prisma.facility.findFirst({ where: { id: facilityId, isActive: true } }),
    prisma.area.findFirst({ where: { id: areaId, isActive: true } }),
    prisma.category.findFirst({ where: { id: categoryId, isActive: true } }),
    prisma.department.findFirst({ where: { id: departmentId, isActive: true } })
  ]);

  if (!facility) throw new AppError('Selected facility is not available.', 422);
  if (!area) throw new AppError('Selected area is not available.', 422);
  if (area.facilityId !== facilityId) {
    throw new AppError('Selected area does not belong to the selected facility.', 422);
  }
  if (!category) throw new AppError('Selected category is not available.', 422);
  if (!department) throw new AppError('Selected department is not available.', 422);
};

export const assignTechnician = async (id, assignedToId, user) => {
  const technician = await prisma.user.findFirst({
    where: { id: Number(assignedToId), role: 'TECHNICIAN', isActive: true }
  });

  if (!technician) throw new AppError('Selected technician is not available.', 422);

  const current = await getRawTicket(id);
  assertTicketAccess(current, user);

  const ticket = await prisma.ticket.update({
    where: { id: Number(id) },
    data: {
      assignedToId: technician.id,
      status: current.status === 'PENDING' ? 'ASSIGNED' : current.status
    },
    include: ticketInclude
  });

  await audit({
    ticketId: ticket.id,
    userId: user.id,
    action: 'TECHNICIAN_ASSIGNED',
    oldValue: current.assignedToId ? String(current.assignedToId) : null,
    newValue: String(technician.id)
  });
  await notify({
    userId: technician.id,
    title: 'Ticket assigned',
    message: `Ticket #${ticket.id} has been assigned to you.`
  });

  return formatTicket(ticket);
};

export const updateTicketStatus = async (id, status, user) => {
  const current = await getRawTicket(id);
  assertTicketAccess(current, user);

  if (!isAdmin(user) && !isTechnician(user)) {
    throw new AppError('Only admins and technicians can update ticket status.', 403);
  }

  const nextStatus = toPrismaStatus(status);

  if (isTechnician(user) && ['PENDING', 'CLOSED'].includes(nextStatus)) {
    throw new AppError('Technicians can only move tickets between Assigned, In Progress, and Resolved.', 403);
  }

  const ticket = await prisma.ticket.update({
    where: { id: Number(id) },
    data: { status: nextStatus },
    include: ticketInclude
  });

  await audit({
    ticketId: ticket.id,
    userId: user.id,
    action: nextStatus === 'RESOLVED' ? 'TICKET_RESOLVED' : 'STATUS_CHANGED',
    oldValue: current.status,
    newValue: nextStatus
  });
  await notify({
    userId: ticket.createdById,
    title: 'Ticket status updated',
    message: `Ticket #${ticket.id} is now ${toPublicStatus(nextStatus)}.`
  });

  return formatTicket(ticket);
};

export const addTicketComment = async (id, comment, user) => {
  const ticket = await getRawTicket(id);
  assertTicketAccess(ticket, user);

  const created = await prisma.ticketComment.create({
    data: { ticketId: Number(id), userId: user.id, comment },
    include: { user: { select: { id: true, name: true, role: true } } }
  });

  await audit({
    ticketId: Number(id),
    userId: user.id,
    action: 'COMMENT_ADDED',
    newValue: 'comment'
  });

  return created;
};

export const listTechnicians = async () => {
  const users = await prisma.user.findMany({
    where: { role: 'TECHNICIAN', isActive: true },
    select: { id: true, name: true, email: true },
    orderBy: { name: 'asc' }
  });
  return users;
};

export const getTicketStats = async (user) => {
  const where = roleWhere(user);
  const [total, pending, assigned, inProgress, resolved, closed] = await Promise.all([
    prisma.ticket.count({ where }),
    prisma.ticket.count({ where: { ...where, status: 'PENDING' } }),
    prisma.ticket.count({ where: { ...where, status: 'ASSIGNED' } }),
    prisma.ticket.count({ where: { ...where, status: 'IN_PROGRESS' } }),
    prisma.ticket.count({ where: { ...where, status: 'RESOLVED' } }),
    prisma.ticket.count({ where: { ...where, status: 'CLOSED' } })
  ]);

  return { total, pending, assigned, in_progress: inProgress, resolved, closed };
};

const getRawTicket = async (id) => {
  const ticket = await prisma.ticket.findUnique({ where: { id: Number(id) } });
  if (!ticket) throw new AppError('Ticket not found.', 404);
  return ticket;
};
