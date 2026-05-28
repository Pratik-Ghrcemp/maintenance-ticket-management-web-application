import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <Navbar />
        <main className="container-fluid py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
