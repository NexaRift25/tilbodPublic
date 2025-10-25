import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './contexts/ThemeContext';
import PersistGate from './components/PersistGate';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Approvals from './pages/admin/Approvals';
import Companies from './pages/admin/Companies';
import Offers from './pages/admin/Offers';
import Users from './pages/admin/Users';
import Reports from './pages/admin/Reports';
import Commissions from './pages/admin/Commissions';
import Categories from './pages/admin/Categories';
import Events from './pages/admin/Events';
import Settings from './pages/admin/Settings';

// Company Pages
import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyCompanies from './pages/company/Companies';
import CompanyOffers from './pages/company/Offers';
import CreateOffer from './pages/company/CreateOffer';
import GiftCards from './pages/company/GiftCards';
import Analytics from './pages/company/Analytics';
import Revenue from './pages/company/Revenue';
import Buyers from './pages/company/Buyers';
import Profile from './pages/company/Profile';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate>
          <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="approvals" element={<Approvals />} />
              <Route path="companies" element={<Companies />} />
              <Route path="offers" element={<Offers />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="commissions" element={<Commissions />} />
              <Route path="categories" element={<Categories />} />
              <Route path="events" element={<Events />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
            {/* Company Routes */}
            <Route path="/company" element={
              <ProtectedRoute allowedRoles={['company_user']}>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<CompanyDashboard />} />
              <Route path="companies" element={<CompanyCompanies />} />
              <Route path="offers" element={<CompanyOffers />} />
              <Route path="offers/create" element={<CreateOffer />} />
              <Route path="gift-cards" element={<GiftCards />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="revenue" element={<Revenue />} />
              <Route path="buyers" element={<Buyers />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Default redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Navigate to="/login" replace />} />
            
            {/* Catch all - redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          </Router>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
