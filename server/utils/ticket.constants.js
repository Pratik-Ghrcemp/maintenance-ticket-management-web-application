export const STATUS_MAP = {
  Pending: 'PENDING',
  Assigned: 'ASSIGNED',
  'In Progress': 'IN_PROGRESS',
  Resolved: 'RESOLVED',
  Closed: 'CLOSED'
};

export const PRIORITY_MAP = {
  Low: 'LOW',
  Medium: 'MEDIUM',
  High: 'HIGH',
  Urgent: 'URGENT'
};

export const toPrismaStatus = (status) => STATUS_MAP[status] || status;
export const toPrismaPriority = (priority) => PRIORITY_MAP[priority] || priority;

export const toPublicStatus = (status) =>
  ({
    PENDING: 'Pending',
    ASSIGNED: 'Assigned',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed'
  })[status] || status;

export const toPublicPriority = (priority) =>
  ({
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent'
  })[priority] || priority;
