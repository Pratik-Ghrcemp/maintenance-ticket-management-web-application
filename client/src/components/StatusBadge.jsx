const variants = {
  Pending: 'secondary',
  Assigned: 'info',
  'In Progress': 'primary',
  Resolved: 'success',
  Closed: 'dark',
  Low: 'secondary',
  Medium: 'info',
  High: 'warning',
  Urgent: 'danger'
};

const StatusBadge = ({ value }) => {
  return <span className={`badge text-bg-${variants[value] || 'secondary'}`}>{value}</span>;
};

export default StatusBadge;
