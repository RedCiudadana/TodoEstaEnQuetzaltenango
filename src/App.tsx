import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import RequireAuth from './components/auth/RequireAuth';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BusinessesPage from './pages/BusinessesPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import EventsPage from './pages/EventsPage';
import RegisterBusinessPage from './pages/business/RegisterBusinessPage';
import RegisterSuccessPage from './pages/business/RegisterSuccessPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BusinessRegistrationsPage from './pages/admin/BusinessRegistrationsPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import DevDocsPage from './pages/DevDocsPage';
import DigitalDiagnosticPage from './pages/DigitalDiagnosticPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="negocios" element={<BusinessesPage />} />
          <Route path="negocios/:id" element={<BusinessDetailPage />} />
          <Route path="eventos" element={<EventsPage />} />
          <Route path="business/register" element={<RegisterBusinessPage />} />
          <Route path="business/register/success" element={<RegisterSuccessPage />} />
          <Route path="diagnostico-digital" element={<DigitalDiagnosticPage />} />
          <Route path="soporte" element={<SupportPage />} />
          <Route path="docs" element={<DevDocsPage />} />
          <Route 
            path="admin" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <AdminDashboardPage />
              </RequireAuth>
            } 
          />
          <Route 
            path="admin/registros" 
            element={
              <RequireAuth allowedRoles={['admin']}>
                <BusinessRegistrationsPage />
              </RequireAuth>
            } 
          />
          <Route path="acerca" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;