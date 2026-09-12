import { COURSES } from '../data/mockData';
import { Users } from 'lucide-react';

const AttBadge = ({ pct }: { pct: number }) => {
  const cls = pct >= 75 ? 'text-brand-teal bg-brand-teal/20 border-brand-teal/40' : pct >= 65 ? 'text-brand-yellow bg-brand-yellow/20 border-brand-yellow/40' : 'text-brand-coral bg-brand-coral/10 border-brand-coral/30';
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>{pct}%</span>;
};

export default function CoursesPage() {
  return (
    <div className="space-y-5">
      <div className="bg-white border border-brand-pink/30 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-pink/30">
              <th className="text-left text-slate-500 font-medium px-5 py-4">Course</th>
              <th className="text-left text-slate-500 font-medium px-4 py-4">Department</th>
              <th className="text-left text-slate-500 font-medium px-4 py-4">Faculty</th>
              <th className="text-left text-slate-500 font-medium px-4 py-4">Semester</th>
              <th className="text-center text-slate-500 font-medium px-4 py-4">Students</th>
              <th className="text-center text-slate-500 font-medium px-4 py-4">Attendance</th>
              <th className="text-center text-slate-500 font-medium px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {COURSES.map(c => (
              <tr key={c.id} className="hover:bg-brand-cream/40 transition cursor-pointer">
                <td className="px-5 py-4">
                  <div>
                    <p className="text-slate-800 font-medium">{c.name}</p>
                    <p className="text-slate-500 text-xs font-mono">{c.code}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{c.department}</td>
                <td className="px-4 py-4 text-slate-600">{c.faculty}</td>
                <td className="px-4 py-4 text-slate-500 text-xs">{c.semester}</td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-800">{c.totalStudents}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center"><AttBadge pct={c.attendancePercentage} /></td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.status === 'active' ? 'bg-brand-teal/20 text-brand-teal' : 'bg-brand-pink text-slate-500'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
