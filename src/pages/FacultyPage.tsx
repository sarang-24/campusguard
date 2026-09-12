import { FACULTY } from '../data/mockData';
import { Mail, BookOpen } from 'lucide-react';

export default function FacultyPage() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FACULTY.map(f => (
          <div key={f.id} className="bg-white border border-brand-pink/30 rounded-2xl p-5 hover:border-brand-pink/50 transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand-pink rounded-xl flex items-center justify-center text-slate-800 font-bold text-lg shrink-0">
                {f.name.split(' ').filter(w => !['Dr.', 'Prof.'].includes(w)).map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-800 font-semibold truncate">{f.name}</h3>
                <p className="text-slate-500 text-sm">{f.department}</p>
                <p className="text-slate-500 text-xs mt-0.5">ID: {f.facultyId}</p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${f.status === 'active' ? 'bg-brand-teal/20 text-brand-teal' : 'bg-brand-pink text-slate-500'}`}>
                {f.status}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-brand-pink/30 space-y-2">
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{f.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>{f.courses.join(', ')}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-brand-cream/60 rounded-xl p-3 text-center">
                <p className="text-slate-800 font-bold">{f.totalSessions}</p>
                <p className="text-slate-500 text-xs">Sessions</p>
              </div>
              <div className="bg-brand-cream/60 rounded-xl p-3 text-center">
                <p className="text-slate-800 font-bold">{f.courses.length}</p>
                <p className="text-slate-500 text-xs">Courses</p>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-brand-cream group-hover:bg-brand-teal/20 group-hover:text-brand-teal text-slate-600 text-sm font-medium rounded-xl transition border border-brand-pink/50 group-hover:border-brand-teal/40">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
