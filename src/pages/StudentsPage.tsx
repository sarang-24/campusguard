import { useState } from 'react';
import { Search, Filter, ChevronDown, Eye } from 'lucide-react';
import { STUDENTS } from '../data/mockData';

const STATUS_CONFIG = {
  safe: { label: 'Safe', class: 'text-brand-teal bg-brand-teal/20 border-brand-teal/40' },
  warning: { label: 'Warning', class: 'text-brand-yellow bg-brand-yellow/20 border-brand-yellow/40' },
  critical: { label: 'Critical', class: 'text-brand-coral bg-brand-coral/10 border-brand-coral/30' },
};

export default function StudentsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDept, setFilterDept] = useState<string>('all');
  const [selected, setSelected] = useState<string | null>(null);

  const departments = Array.from(new Set(STUDENTS.map(s => s.department)));

  const filtered = STUDENTS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.studentId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.warningStatus === filterStatus;
    const matchDept = filterDept === 'all' || s.department === filterDept;
    return matchSearch && matchStatus && matchDept;
  });

  const selectedStudent = STUDENTS.find(s => s.id === selected);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-brand-pink/50 rounded-xl text-sm text-slate-800 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="pl-9 pr-8 py-2.5 bg-white border border-brand-pink/50 rounded-xl text-sm text-slate-800 appearance-none focus:outline-none focus:border-blue-500 transition cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="safe">Safe</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="pl-4 pr-8 py-2.5 bg-white border border-brand-pink/50 rounded-xl text-sm text-slate-800 appearance-none focus:outline-none focus:border-blue-500 transition cursor-pointer"
          >
            <option value="all">All Departments</option>
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        </div>

        <div className="text-slate-500 text-sm flex items-center px-3 py-2 bg-white border border-brand-pink/30 rounded-xl">
          {filtered.length} of {STUDENTS.length} students
        </div>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className={`flex-1 min-w-0 bg-white border border-brand-pink/30 rounded-2xl overflow-hidden ${selected ? '' : ''}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-pink/30 bg-white/50">
                <th className="text-left text-slate-500 font-medium px-5 py-3.5">Student</th>
                <th className="text-left text-slate-500 font-medium px-4 py-3.5">Department</th>
                <th className="text-center text-slate-500 font-medium px-4 py-3.5">Year</th>
                <th className="text-center text-slate-500 font-medium px-4 py-3.5">Attendance</th>
                <th className="text-center text-slate-500 font-medium px-4 py-3.5">Status</th>
                <th className="text-center text-slate-500 font-medium px-4 py-3.5">Last Seen</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(s => {
                const cfg = STATUS_CONFIG[s.warningStatus];
                const isSelected = selected === s.id;
                return (
                  <tr
                    key={s.id}
                    onClick={() => setSelected(isSelected ? null : s.id)}
                    className={`cursor-pointer transition ${isSelected ? 'bg-brand-teal/10 border-l-2 border-l-blue-500' : 'hover:bg-brand-cream/40'}`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-slate-800 text-xs font-bold shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-slate-800 font-medium">{s.name}</p>
                          <p className="text-slate-500 text-xs">{s.studentId} · {s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{s.department}</td>
                    <td className="px-4 py-4 text-center text-slate-600">Y{s.year}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 h-1.5 bg-brand-pink rounded-full overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${s.attendancePercentage >= 75 ? 'bg-brand-teal' : s.attendancePercentage >= 65 ? 'bg-brand-yellow' : 'bg-brand-coral'}`}
                            style={{ width: `${s.attendancePercentage}%` }}
                          />
                        </div>
                        <span className="text-slate-800 text-xs font-medium w-10">{s.attendancePercentage}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.class}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-slate-500 text-xs">{s.lastAttendance}</td>
                    <td className="px-4 py-4 text-center">
                      <button className="p-1.5 rounded-lg hover:bg-brand-pink text-slate-500 hover:text-slate-800 transition">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selectedStudent && (
          <div className="w-72 shrink-0 bg-white border border-brand-pink/30 rounded-2xl p-5 space-y-5">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-teal rounded-2xl flex items-center justify-center text-slate-800 text-xl font-bold mx-auto">
                {selectedStudent.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-slate-800 font-semibold mt-3">{selectedStudent.name}</h3>
              <p className="text-slate-500 text-sm">{selectedStudent.studentId}</p>
              <p className="text-slate-500 text-xs mt-0.5">{selectedStudent.department}</p>
              <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_CONFIG[selectedStudent.warningStatus].class}`}>
                {STATUS_CONFIG[selectedStudent.warningStatus].label}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-brand-pink/30">
                <span className="text-slate-500 text-sm">Year</span>
                <span className="text-slate-800 text-sm">Year {selectedStudent.year}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-pink/30">
                <span className="text-slate-500 text-sm">Email</span>
                <span className="text-slate-800 text-xs">{selectedStudent.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-pink/30">
                <span className="text-slate-500 text-sm">Classes</span>
                <span className="text-slate-800 text-sm">{selectedStudent.classesAttended}/{selectedStudent.totalClasses}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-pink/30">
                <span className="text-slate-500 text-sm">Last Seen</span>
                <span className="text-slate-800 text-sm">{selectedStudent.lastAttendance}</span>
              </div>
            </div>

            <div>
              <p className="text-slate-500 text-xs mb-2 font-medium">Enrolled Courses</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedStudent.courses.map(c => (
                  <span key={c} className="text-xs px-2 py-0.5 bg-brand-teal/20 text-brand-teal rounded-md font-mono">{c}</span>
                ))}
              </div>
            </div>

            {/* Attendance bar */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-500 text-sm">Attendance</span>
                <span className="text-slate-800 text-sm font-semibold">{selectedStudent.attendancePercentage}%</span>
              </div>
              <div className="h-2 bg-brand-cream rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all ${selectedStudent.attendancePercentage >= 75 ? 'bg-brand-teal' : selectedStudent.attendancePercentage >= 65 ? 'bg-brand-yellow' : 'bg-brand-coral'}`}
                  style={{ width: `${selectedStudent.attendancePercentage}%` }}
                />
              </div>
              <p className="text-slate-500 text-xs mt-1">Minimum required: 75%</p>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-brand-teal hover:bg-brand-teal text-slate-800 text-sm font-medium rounded-xl transition">
                View Profile
              </button>
              <button className="flex-1 py-2 bg-brand-cream hover:bg-brand-pink text-slate-600 text-sm font-medium rounded-xl transition">
                Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
