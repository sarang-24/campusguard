import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import FacultyPage from './pages/FacultyPage';
import CoursesPage from './pages/CoursesPage';
import AttendancePage from './pages/AttendancePage';
import WarningsPage from './pages/WarningsPage';
import AppLayout from './components/AppLayout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="warnings" element={<WarningsPage />} />
          
          {/* Placeholders for the rest of the nav items */}
          <Route path="notifications" element={<div className="p-8 text-slate-500">Notifications module coming soon...</div>} />
          <Route path="exceptions" element={<div className="p-8 text-slate-500">Exceptions module coming soon...</div>} />
          <Route path="reports" element={<div className="p-8 text-slate-500">Reports module coming soon...</div>} />
          <Route path="audit" element={<div className="p-8 text-slate-500">Audit logs module coming soon...</div>} />
          <Route path="settings" element={<div className="p-8 text-slate-500">Settings module coming soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
