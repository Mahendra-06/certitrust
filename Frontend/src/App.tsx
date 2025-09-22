import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Benefits from './pages/Benefits';
import UserTypeSelectionLogin from './pages/UserTypeSelectionLogin';
import UserTypeSelectionRegister from './pages/UserTypeSelectionRegister';
import Login from './pages/Login';
import StudentRegister from './pages/register/StudentRegister';
import InstituteRegister from './pages/register/InstituteRegister';
import VerifierRegister from './pages/register/VerifierRegister';
import ScholarshipRegister from './pages/register/ScholarshipRegister';
import AdminRegister from './pages/register/AdminRegister';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import InstituteDashboard from './pages/dashboards/InstituteDashboard';
import RecruiterDashboard from './pages/dashboards/RecruiterDashboard';
import ScholarshipDashboard from './pages/dashboards/ScholarshipDashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// A wrapper to handle redirecting authenticated users from public routes
function PublicRoute({ children }: { children: JSX.Element }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated && user) {
    // If user is logged in, redirect to their dashboard
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/user-type" element={
              <PublicRoute>
                <UserTypeSelectionLogin />
              </PublicRoute>
            } />
            <Route path="/register-type" element={
              <PublicRoute>
                <UserTypeSelectionRegister />
              </PublicRoute>
            } />
            <Route path="/login/:userType" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register/student" element={
              <PublicRoute>
                <StudentRegister />
              </PublicRoute>
            } />
            <Route path="/register/institute" element={
              <PublicRoute>
                <InstituteRegister />
              </PublicRoute>
            } />
            <Route path="/register/verifier" element={
              <PublicRoute>
                <VerifierRegister />
              </PublicRoute>
            } />
            <Route path="/register/scholarship" element={
              <PublicRoute>
                <ScholarshipRegister />
              </PublicRoute>
            } />
            <Route path="/register/admin" element={
              <PublicRoute>
                <AdminRegister />
              </PublicRoute>
            } />
            <Route path="/dashboard/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/student" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/institute" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <InstituteDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/recruiter" element={
              <ProtectedRoute allowedRoles={['recruiter', 'verifier']}>
                <RecruiterDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/scholarship" element={
              <ProtectedRoute allowedRoles={['scholarship']}>
                <ScholarshipDashboard />
              </ProtectedRoute>
            } />
            {/* Fallback route for any other dashboard path */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Navigate to="/user-type" replace />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
