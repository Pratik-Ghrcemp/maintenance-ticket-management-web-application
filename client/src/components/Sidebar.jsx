import { NavLink } from 'react-router-dom';
import { Database, LayoutDashboard, PlusCircle, Ticket } from 'lucide-react';

import { useAuth } from '../hooks/useAuth.js';

const Sidebar = () => {
  const { user } = useAuth();
  const canCreateTicket = ['admin', 'department_user'].includes(user?.role);

  return (
    <aside className="app-sidebar border-end bg-dark text-white">
      <div className="px-3 py-3 border-bottom border-secondary">
        <div className="fw-semibold">MTMS</div>
        <div className="small text-white-50">Operations Console</div>
      </div>
      <nav className="nav flex-column p-2">
        <NavLink className="nav-link app-sidebar-link" to="/dashboard">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink className="nav-link app-sidebar-link" to="/tickets">
          <Ticket size={18} />
          <span>Tickets</span>
        </NavLink>
        {canCreateTicket ? (
          <NavLink className="nav-link app-sidebar-link" to="/tickets/create">
            <PlusCircle size={18} />
            <span>Create Ticket</span>
          </NavLink>
        ) : null}
        {user?.role === 'admin' ? (
          <NavLink className="nav-link app-sidebar-link" to="/master-data">
            <Database size={18} />
            <span>Master Data</span>
          </NavLink>
        ) : null}
      </nav>
    </aside>
  );
};

export default Sidebar;
