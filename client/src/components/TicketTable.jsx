import { Link } from 'react-router-dom';

import StatusBadge from './StatusBadge.jsx';

const TicketTable = ({ tickets, isLoading, onAssign }) => {
  if (isLoading) {
    return <div className="text-muted py-4">Loading tickets...</div>;
  }

  if (!tickets.length) {
    return <div className="text-muted py-4">No tickets found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Department</th>
            <th>Technician</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>#{ticket.id}</td>
              <td>{ticket.title}</td>
              <td><StatusBadge value={ticket.status} /></td>
              <td><StatusBadge value={ticket.priority} /></td>
              <td>{ticket.department?.name || '-'}</td>
              <td>{ticket.assignedTo?.name || '-'}</td>
              <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
              <td className="text-end">
                <div className="btn-group btn-group-sm">
                  <Link className="btn btn-outline-primary" to={`/tickets/${ticket.id}`}>View</Link>
                  {onAssign ? (
                    <button className="btn btn-outline-secondary" type="button" onClick={() => onAssign(ticket)}>
                      Assign
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
