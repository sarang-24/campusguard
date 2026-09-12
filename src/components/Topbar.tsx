import { Bell, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NOTIFICATIONS } from '../data/mockData';

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const { user } = useAuth();
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const timeOfDay = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-brand-pink/30 flex items-center px-6 gap-4 sticky top-0 z-10">
      <div className="flex-1">
        <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
        {subtitle && <p className="text-slate-500 text-xs">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative hidden md:flex items-center">
        <Search className="absolute left-3 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search..."
          className="w-64 pl-9 pr-4 py-2 bg-brand-cream/80 border border-brand-pink/50 rounded-xl text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-brand-cream transition">
        <Bell className="w-5 h-5 text-slate-500" />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-brand-coral text-slate-800 text-[9px] font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {/* User */}
      {user && (
        <div className="flex items-center gap-2 pl-2 border-l border-brand-pink/50">
          <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-slate-800 text-xs font-bold">
            {user.avatar}
          </div>
          <div className="hidden sm:block">
            <p className="text-slate-800 text-xs font-medium">{timeOfDay()}, {user.name.split(' ')[0]}</p>
            <p className="text-slate-500 text-[10px] capitalize">{user.role}</p>
          </div>
        </div>
      )}
    </header>
  );
}
