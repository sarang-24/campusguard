import { Users, GraduationCap, AlertTriangle, TrendingDown, CheckCircle, XCircle } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { STUDENTS, FACULTY, COURSES, WARNINGS, ATTENDANCE_TREND, DEPARTMENT_STATS, WEEKLY_ATTENDANCE } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const STAT_COLORS = ['#84A59D', '#F5CAC3', '#F6BD60', '#84A59D'];

function StatCard({ icon: Icon, label, value, sub, color }: { icon: any; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-white border border-brand-pink/30 rounded-2xl p-5 flex items-start gap-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-5 h-5 text-slate-800" />
      </div>
      <div>
        <p className="text-slate-500 text-sm">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

const AttBadge = ({ pct }: { pct: number }) => {
  const cls = pct >= 75 ? 'text-brand-teal bg-brand-teal/20' : pct >= 65 ? 'text-brand-yellow bg-brand-yellow/20' : 'text-brand-coral bg-brand-coral/10';
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>{pct}%</span>;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const atRisk = STUDENTS.filter(s => s.warningStatus !== 'safe');
  const criticalCount = WARNINGS.filter(w => w.severity === 'critical').length;

  // Student view
  if (user?.role === 'student') {
    const me = STUDENTS[0];
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-brand-teal/30 rounded-2xl p-6">
          <p className="text-brand-teal text-sm font-medium">Student ID: {me.studentId}</p>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">{me.name}</h2>
          <p className="text-slate-500 text-sm">{me.department} · Year {me.year}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={CheckCircle} label="Classes Attended" value={me.classesAttended} color="bg-brand-teal" />
          <StatCard icon={XCircle} label="Classes Absent" value={me.totalClasses - me.classesAttended} color="bg-brand-coral" />
          <StatCard icon={TrendingDown} label="Attendance %" value={`${me.attendancePercentage}%`} color="bg-brand-teal" />
          <StatCard icon={BookIcon} label="Enrolled Courses" value={me.courses.length} color="bg-brand-pink" />
        </div>
        {/* Attendance Chart */}
        <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Monthly Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ATTENDANCE_TREND}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84A59D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#84A59D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5CAC3" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F5CAC3', borderRadius: 8 }} />
              <Area type="monotone" dataKey="percentage" stroke="#84A59D" fill="url(#blueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Course breakdown */}
        <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
          <h3 className="text-slate-800 font-semibold mb-4">My Courses</h3>
          <div className="space-y-3">
            {me.courses.map((c, i) => {
              const pcts = [72, 81, 68];
              const pct = pcts[i] || 75;
              return (
                <div key={c} className="flex items-center gap-4">
                  <span className="text-slate-600 text-sm font-mono w-16">{c}</span>
                  <div className="flex-1 h-2 bg-brand-cream rounded-full overflow-hidden">
                    <div className="h-2 rounded-full bg-brand-teal" style={{ width: `${pct}%` }} />
                  </div>
                  <AttBadge pct={pct} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Faculty view
  if (user?.role === 'faculty') {
    const myCourses = COURSES.slice(0, 2);
    const myStudents = STUDENTS.filter(s => s.department === 'Computer Science');
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={GraduationCap} label="My Students" value={myStudents.length} color="bg-brand-teal" />
          <StatCard icon={BookIcon} label="Active Courses" value={myCourses.length} color="bg-brand-pink" />
          <StatCard icon={AlertTriangle} label="At Risk" value={myStudents.filter(s => s.warningStatus !== 'safe').length} color="bg-brand-yellow" />
          <StatCard icon={CheckCircle} label="Avg. Attendance" value="78%" color="bg-brand-teal" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
            <h3 className="text-slate-800 font-semibold mb-4">Today's Attendance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={WEEKLY_ATTENDANCE}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5CAC3" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F5CAC3', borderRadius: 8 }} />
                <Bar dataKey="present" fill="#84A59D" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#F28482" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
            <h3 className="text-slate-800 font-semibold mb-4">Students At Risk</h3>
            <div className="space-y-3">
              {myStudents.filter(s => s.warningStatus !== 'safe').map(s => (
                <div key={s.id} className="flex items-center gap-3 p-3 bg-brand-cream/50 rounded-xl">
                  <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-slate-800 text-xs font-bold">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-800 text-sm font-medium">{s.name}</p>
                    <p className="text-slate-500 text-xs">{s.studentId}</p>
                  </div>
                  <AttBadge pct={s.attendancePercentage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Management / Admin view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={GraduationCap} label="Total Students" value={STUDENTS.length} sub="Across all departments" color="bg-brand-teal" />
        <StatCard icon={Users} label="Faculty Members" value={FACULTY.length} sub="Active instructors" color="bg-brand-pink" />
        <StatCard icon={AlertTriangle} label="At Risk Students" value={atRisk.length} sub={`${criticalCount} critical`} color="bg-brand-yellow" />
        <StatCard icon={BookIcon} label="Active Courses" value={COURSES.length} sub="This semester" color="bg-brand-teal" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend */}
        <div className="lg:col-span-2 bg-white border border-brand-pink/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 font-semibold">Attendance Trend</h3>
            <span className="text-xs text-slate-500 bg-brand-cream px-3 py-1 rounded-full">Jun – Sep 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ATTENDANCE_TREND}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84A59D" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#84A59D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5CAC3" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis domain={[60, 100]} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F5CAC3', borderRadius: 8 }} />
              <Area type="monotone" dataKey="percentage" stroke="#84A59D" fill="url(#grad1)" strokeWidth={2} dot={{ fill: '#84A59D', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Pie */}
        <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Dept. Attendance</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={DEPARTMENT_STATS} dataKey="attendance" cx="50%" cy="50%" outerRadius={65} innerRadius={40}>
                {DEPARTMENT_STATS.map((_, i) => (
                  <Cell key={i} fill={STAT_COLORS[i % STAT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F5CAC3', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {DEPARTMENT_STATS.map((d, i) => (
              <div key={d.department} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: STAT_COLORS[i] }} />
                <span className="text-slate-500 text-xs flex-1">{d.department}</span>
                <span className="text-slate-800 text-xs font-medium">{d.attendance}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Attendance Bar */}
      <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
        <h3 className="text-slate-800 font-semibold mb-4">Weekly Attendance Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={WEEKLY_ATTENDANCE} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F5CAC3" />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F5CAC3', borderRadius: 8 }} />
            <Bar dataKey="present" name="Present" fill="#84A59D" radius={[4, 4, 0, 0]} />
            <Bar dataKey="late" name="Late" fill="#F6BD60" radius={[4, 4, 0, 0]} />
            <Bar dataKey="absent" name="Absent" fill="#F28482" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Warnings */}
        <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Active Warnings</h3>
          <div className="space-y-3">
            {WARNINGS.filter(w => w.status === 'active').map(w => (
              <div key={w.id} className="flex items-center gap-3 p-3 bg-brand-cream/50 rounded-xl border border-brand-pink/50/50">
                <div className={`p-2 rounded-lg ${w.severity === 'critical' ? 'bg-brand-coral/20' : 'bg-brand-yellow/20'}`}>
                  <AlertTriangle className={`w-4 h-4 ${w.severity === 'critical' ? 'text-brand-coral' : 'text-brand-yellow'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 text-sm font-medium">{w.studentName}</p>
                  <p className="text-slate-500 text-xs">{w.department}</p>
                </div>
                <div className="text-right">
                  <AttBadge pct={w.attendancePercentage} />
                  <p className="text-xs text-slate-500 mt-1">{w.severity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dept Stats Table */}
        <div className="bg-white border border-brand-pink/30 rounded-2xl p-5">
          <h3 className="text-slate-800 font-semibold mb-4">Department Summary</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-pink/30">
                <th className="text-left text-slate-500 font-medium pb-3">Department</th>
                <th className="text-center text-slate-500 font-medium pb-3">Students</th>
                <th className="text-center text-slate-500 font-medium pb-3">Attendance</th>
                <th className="text-center text-slate-500 font-medium pb-3">At Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {DEPARTMENT_STATS.map(d => (
                <tr key={d.department}>
                  <td className="py-3 text-slate-800">{d.department}</td>
                  <td className="py-3 text-center text-slate-500">{d.students}</td>
                  <td className="py-3 text-center"><AttBadge pct={d.attendance} /></td>
                  <td className="py-3 text-center text-brand-coral font-medium">{d.atRisk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Icon placeholder (lucide's BookOpen)
function BookIcon({ className }: { className?: string }) {
  return <BookOpen className={className} />;
}

import { BookOpen } from 'lucide-react';
