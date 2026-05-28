import { Navigate, Route, Routes } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import CreateTicketPage from '../pages/CreateTicketPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import MasterDataPage from '../pages/MasterDataPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import TicketDetailsPage from '../pages/TicketDetailsPage.jsx';
import TicketsPage from '../pages/TicketsPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tickets" element={<TicketsPage />} />
        <Route
          path="tickets/create"
          element={
            <ProtectedRoute roles={['admin', 'department_user']}>
              <CreateTicketPage />
            </ProtectedRoute>
          }
        />
        <Route path="tickets/:id" element={<TicketDetailsPage />} />
        <Route
          path="master-data"
          element={
            <ProtectedRoute roles={['admin']}>
              <MasterDataPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
