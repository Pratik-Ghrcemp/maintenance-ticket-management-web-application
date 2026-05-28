import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AssignmentModal from '../components/AssignmentModal.jsx';
import TicketFilters from '../components/TicketFilters.jsx';
import TicketTable from '../components/TicketTable.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { getMasterData } from '../services/masterDataService.js';
import { assignTechnician, getTechnicians, getTickets } from '../services/ticketService.js';

const initialFilters = { page: 1, limit: 10, search: '', status: '', priority: '', technician: '', department: '', category: '', date: '' };

const TicketsPage = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [tickets, setTickets] = useState([]);
  const [meta, setMeta] = useState(null);
  const [lookups, setLookups] = useState({ technicians: [], departments: [], categories: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { user } = useAuth();
  const { showToast } = useToast();
  const canAssign = user?.role === 'admin';
  const canCreateTicket = ['admin', 'department_user'].includes(user?.role);
  const pageDescription =
    user?.role === 'technician'
      ? 'Review assigned maintenance work and update progress.'
      : 'Create, filter, assign, and track maintenance work.';

  const loadTickets = async () => {
    setIsLoading(true);
    const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== ''));
    const response = await getTickets(params);
    setIsLoading(false);
    if (response.success) {
      setTickets(response.data);
      setMeta(response.meta);
    } else {
      showToast({ title: 'Tickets', message: response.message, variant: 'danger' });
    }
  };

  useEffect(() => {
    loadTickets();
  }, [filters]);

  useEffect(() => {
    const loadLookups = async () => {
      const [technicians, departments, categories] = await Promise.all([
        getTechnicians(),
        getMasterData('departments', { limit: 100 }),
        getMasterData('categories', { limit: 100 })
      ]);
      setLookups({
        technicians: technicians.success ? technicians.data : [],
        departments: departments.success ? departments.data : [],
        categories: categories.success ? categories.data : []
      });
    };
    loadLookups();
  }, []);

  const handleAssign = async (technicianId) => {
    const response = await assignTechnician(selectedTicket.id, Number(technicianId));
    if (response.success) {
      showToast({ title: 'Ticket updated', message: 'Technician assigned.', variant: 'success' });
      setSelectedTicket(null);
      loadTickets();
    } else {
      showToast({ title: 'Assignment failed', message: response.message, variant: 'danger' });
    }
  };

  const goToPage = (page) => {
    setFilters((current) => ({ ...current, page }));
  };

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-1">Tickets</h1>
          <p className="text-muted mb-0">{pageDescription}</p>
        </div>
        {canCreateTicket ? <Link className="btn btn-primary" to="/tickets/create">Create Ticket</Link> : null}
      </div>
      <TicketFilters filters={filters} onChange={setFilters} lookups={lookups} userRole={user?.role} />
      <TicketTable tickets={tickets} isLoading={isLoading} onAssign={canAssign ? setSelectedTicket : null} />
      {meta ? (
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          <div className="text-muted small">
            Showing page {meta.page} of {meta.totalPages} ({meta.total} tickets)
          </div>
          <div className="btn-group btn-group-sm" role="group" aria-label="Ticket pagination">
            <button
              className="btn btn-outline-secondary"
              type="button"
              disabled={meta.page <= 1 || isLoading}
              onClick={() => goToPage(meta.page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              disabled={meta.page >= meta.totalPages || isLoading}
              onClick={() => goToPage(meta.page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
      <AssignmentModal
        show={Boolean(selectedTicket)}
        ticket={selectedTicket}
        technicians={lookups.technicians}
        onClose={() => setSelectedTicket(null)}
        onAssign={handleAssign}
      />
    </section>
  );
};

export default TicketsPage;
