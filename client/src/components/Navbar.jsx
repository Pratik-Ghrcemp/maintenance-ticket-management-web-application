import { Github, Linkedin, LogOut, Menu, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { AUTHOR } from '../utils/constants.js';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showToast({ title: 'Signed out', message: 'Your session has ended.', variant: 'success' });
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand bg-white border-bottom px-3">
      <button className="btn btn-outline-secondary d-lg-none me-2" type="button" aria-label="Open menu">
        <Menu size={18} />
      </button>
      <div className="d-flex flex-column">
        <span className="navbar-brand mb-0 h1">Maintenance Tickets</span>
        <span className="creator-credit d-none d-md-inline">Designed and developed by {AUTHOR.name}</span>
      </div>
      <div className="ms-auto d-flex align-items-center gap-2">
        <a
          className="btn btn-outline-secondary btn-sm icon-link-button d-none d-md-inline-flex"
          href={AUTHOR.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${AUTHOR.name} LinkedIn profile`}
          title="LinkedIn"
        >
          <Linkedin size={16} />
        </a>
        <a
          className="btn btn-outline-secondary btn-sm icon-link-button d-none d-md-inline-flex"
          href={AUTHOR.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${AUTHOR.name} GitHub profile`}
          title="GitHub"
        >
          <Github size={16} />
        </a>
        <span className="text-muted small d-none d-sm-inline">{user?.name}</span>
        <UserCircle size={24} className="text-secondary" />
        <button className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1" type="button" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
