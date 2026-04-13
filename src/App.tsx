import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Analytics } from './pages/Analytics';

// Protected Route wrappers
const RequireAuth: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <Router>
      <div className="min-h-screen app-container font-sans text-slate-100 flex flex-col">
        {currentUser && <Navigation />}
        <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
          <Routes>
            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={isAdminFallback(currentUser.email) ? "/admin" : "/dashboard"} replace />} />
            
            <Route 
              path="/dashboard" 
              element={
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <RequireAuth adminOnly>
                  <AdminDashboard />
                </RequireAuth>
              } 
            />
            
            <Route 
              path="/admin/analytics" 
              element={
                <RequireAuth adminOnly>
                  <Analytics />
                </RequireAuth>
              } 
            />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Quick helper for fallback redirect in AppContent
const isAdminFallback = (email?: string | null) => email?.includes('admin') || false;

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
