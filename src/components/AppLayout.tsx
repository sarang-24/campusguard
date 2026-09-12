import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLocation } from 'react-router-dom';

const PAGE_META: Record<string, { title: string; subtitle?: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of attendance and alerts' },
  '/students': { title: 'Students', subtitle: 'Manage and monitor all students' },
  '/faculty': { title: 'Faculty', subtitle: 'Manage faculty and course assignments' },
  '/courses': { title: 'Courses', subtitle: 'Course management and attendance tracking' },
  '/attendance': { title: 'Attendance', subtitle: 'Capture and manage attendance records' },
  '/warnings': { title: 'Early Warnings', subtitle: 'Students at risk of failing attendance criteria' },
  '/notifications': { title: 'Notifications', subtitle: 'System alerts and messages' },
  '/exceptions': { title: 'Exceptions', subtitle: 'Attendance exception requests and approvals' },
  '/reports': { title: 'Reports', subtitle: 'Analytics and downloadable reports' },
  '/audit': { title: 'Audit Logs', subtitle: 'System activity and change history' },
  '/settings': { title: 'Settings', subtitle: 'Configure system parameters' },
};

export default function AppLayout() {
  const location = useLocation();
  const meta = PAGE_META[location.pathname] ?? { title: 'CampusGuard' };

  return (
    <div className="flex h-screen bg-brand-cream overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
