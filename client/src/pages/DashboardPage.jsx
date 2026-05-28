import { useEffect, useState } from 'react';

import { useAuth } from '../hooks/useAuth.js';
import { getTicketStats } from '../services/ticketService.js';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const response = await getTicketStats();
      if (response.success) setStats(response.data);
    };
    loadStats();
  }, []);

  return (
    <section>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">
            Signed in as {user?.name} ({user?.role?.replace('_', ' ')}).
          </p>
        </div>
      </div>
      <div className="row g-3">
        <Stat label="Total" value={stats.total} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Assigned" value={stats.assigned} />
        <Stat label="In Progress" value={stats.in_progress} />
        <Stat label="Resolved" value={stats.resolved} />
        <Stat label="Closed" value={stats.closed} />
      </div>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div className="col-md-4 col-xl-2">
    <div className="card">
      <div className="card-body">
        <div className="text-muted small">{label}</div>
        <div className="display-6">{value}</div>
      </div>
    </div>
  </div>
);

export default DashboardPage;
