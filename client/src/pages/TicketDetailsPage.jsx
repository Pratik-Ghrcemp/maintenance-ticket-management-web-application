import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StatusBadge from '../components/StatusBadge.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { addTicketComment, getTicket, updateTicketStatus } from '../services/ticketService.js';

const adminStatuses = ['Pending', 'Assigned', 'In Progress', 'Resolved', 'Closed'];
const technicianStatuses = ['Assigned', 'In Progress', 'Resolved'];

const TicketDetailsPage = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();
  const canUpdateStatus = ['admin', 'technician'].includes(user?.role);
  const statusOptions = user?.role === 'technician' ? technicianStatuses : adminStatuses;

  const loadTicket = async () => {
    setIsLoading(true);
    const response = await getTicket(id);
    setIsLoading(false);
    if (response.success) {
      setTicket(response.data);
      setStatus(response.data.status);
    } else {
      showToast({ title: 'Ticket', message: response.message, variant: 'danger' });
    }
  };

  useEffect(() => {
    loadTicket();
  }, [id]);

  const saveStatus = async () => {
    const response = await updateTicketStatus(id, status);
    if (response.success) {
      showToast({ title: 'Status updated', message: 'Ticket status changed.', variant: 'success' });
      loadTicket();
    } else {
      showToast({ title: 'Status update failed', message: response.message, variant: 'danger' });
    }
  };

  const submitComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    const response = await addTicketComment(id, comment);
    if (response.success) {
      setComment('');
      showToast({ title: 'Comment added', message: 'Remark saved.', variant: 'success' });
      loadTicket();
    } else {
      showToast({ title: 'Comment failed', message: response.message, variant: 'danger' });
    }
  };

  if (isLoading) return <div className="text-muted">Loading ticket...</div>;
  if (!ticket) return <div className="alert alert-warning">Ticket not found.</div>;

  return (
    <section>
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-1">Ticket #{ticket.id}</h1>
          <p className="text-muted mb-0">{ticket.title}</p>
        </div>
        <div className="d-flex gap-2">
          <StatusBadge value={ticket.status} />
          <StatusBadge value={ticket.priority} />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card mb-3">
            <div className="card-body">
              <h2 className="h5">Details</h2>
              <p>{ticket.description}</p>
              <dl className="row mb-0">
                <dt className="col-sm-4">Facility</dt><dd className="col-sm-8">{ticket.facility?.name}</dd>
                <dt className="col-sm-4">Area</dt><dd className="col-sm-8">{ticket.area?.name}</dd>
                <dt className="col-sm-4">Category</dt><dd className="col-sm-8">{ticket.category?.name}</dd>
                <dt className="col-sm-4">Department</dt><dd className="col-sm-8">{ticket.department?.name}</dd>
                <dt className="col-sm-4">Technician</dt><dd className="col-sm-8">{ticket.assignedTo?.name || '-'}</dd>
              </dl>
              {ticket.image_url ? (
                <img className="ticket-image mt-3" src={`${import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:5000'}${ticket.image_url}`} alt="Ticket upload" />
              ) : null}
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h2 className="h5">Remarks</h2>
              <form className="d-flex gap-2 mb-3" onSubmit={submitComment}>
                <input className="form-control" value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add work progress or remark" />
                <button className="btn btn-primary" type="submit">Add</button>
              </form>
              {ticket.comments?.map((item) => (
                <div className="border-top py-2" key={item.id}>
                  <div className="small text-muted">{item.user?.name} - {new Date(item.createdAt).toLocaleString()}</div>
                  <div>{item.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {canUpdateStatus ? (
            <div className="card mb-3">
              <div className="card-body">
                <h2 className="h5">Update Status</h2>
                <select className="form-select mb-2" value={status} onChange={(event) => setStatus(event.target.value)}>
                  {statusOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
                {user?.role === 'technician' ? (
                  <div className="form-text mb-2">Technicians can mark work as assigned, in progress, or resolved. Admin closes tickets after verification.</div>
                ) : null}
                <button className="btn btn-outline-primary w-100" onClick={saveStatus}>Save Status</button>
              </div>
            </div>
          ) : null}
          <div className="card">
            <div className="card-body">
              <h2 className="h5">History</h2>
              {ticket.auditLogs?.map((item) => (
                <div className="border-top py-2" key={item.id}>
                  <div className="fw-semibold">{item.action?.replaceAll('_', ' ').toLowerCase()}</div>
                  <div className="small text-muted">{item.user?.name} - {new Date(item.createdAt).toLocaleString()}</div>
                  {item.oldValue || item.newValue ? <div className="small">{item.oldValue || '-'} to {item.newValue || '-'}</div> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketDetailsPage;
