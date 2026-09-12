import { NavLink, useNavigate } from 'react-router-dom';
import {
  Shield, LayoutDashboard, Users, GraduationCap, BookOpen,
  ClipboardList, AlertTriangle, Bell, FileText, ScrollText,
  Settings, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/students', icon: GraduationCap, label: 'Students' },
  { path: '/faculty', icon: Users, label: 'Faculty' },
  { path: '/courses', icon: BookOpen, label: 'Courses' },
  { path: '/attendance', icon: ClipboardList, label: 'Attendance' },
  { path: '/warnings', icon: AlertTriangle, label: 'Early Warnings' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/exceptions', icon: FileText, label: 'Exceptions' },
  { path: '/reports', icon: ScrollText, label: 'Reports' },
  { path: '/audit', icon: ScrollText, label: 'Audit Logs' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const ROLE_ACCESS: Record<string, string[]> = {
  student: ['/dashboard', '/attendance', '/exceptions', '/notifications', '/settings'],
  faculty: ['/dashboard', '/students', '/courses', '/attendance', '/warnings', '/notifications', '/exceptions', '/settings'],
  management: ['/dashboard', '/students', '/faculty', '/courses', '/attendance', '/warnings', '/reports', '/notifications', '/settings'],
  admin: ['/dashboard', '/students', '/faculty', '/courses', '/attendance', '/warnings', '/notifications', '/exceptions', '/reports', '/audit', '/settings']
};

const ROLE_COLORS: Record<string, string> = {
  student: 'bg-brand-teal/20 text-brand-teal',
  faculty: 'bg-brand-pink/20 text-brand-pink',
  management: 'bg-brand-yellow/20 text-brand-yellow',
  admin: 'bg-brand-teal/20 text-brand-teal',
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-brand-pink/30 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-brand-pink/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-teal rounded-xl flex items-center justify-center shadow-md shadow-brand-teal/30">
            <Shield className="w-5 h-5 text-slate-800" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">CampusGuard</h1>
            <p className="text-brand-teal text-[10px] font-medium">Smart Attendance System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {NAV_ITEMS.filter(item => ROLE_ACCESS[user?.role || 'student']?.includes(item.path)).map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-brand-teal/20 text-brand-teal border border-blue-600/30'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-brand-cream/60'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-teal' : 'text-slate-500 group-hover:text-slate-600'}`} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3 h-3 text-brand-teal" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-3 pb-4 border-t border-brand-pink/30 pt-4 space-y-3">
        {user && (
          <div className="px-3 py-3 bg-brand-cream/60 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-teal rounded-lg flex items-center justify-center text-slate-800 text-sm font-bold shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 text-sm font-medium truncate">{user.name}</p>
                <p className="text-slate-500 text-xs truncate">{user.department}</p>
              </div>
            </div>
            <div className="mt-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${ROLE_COLORS[user.role]}`}>
                {user.role}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-brand-coral hover:bg-brand-coral/10 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
