import { useState } from 'react';
import { ATTENDANCE_RECORDS } from '../data/mockData';
import { CheckCircle, XCircle, Clock, Wifi, Fingerprint, Edit } from 'lucide-react';

const STATUS_CONFIG = {
  present: { icon: CheckCircle, class: 'text-brand-teal bg-brand-teal/20', label: 'Present' },
  absent: { icon: XCircle, class: 'text-brand-coral bg-brand-coral/10', label: 'Absent' },
  late: { icon: Clock, class: 'text-brand-yellow bg-brand-yellow/20', label: 'Late' },
};

const METHOD_CONFIG = {
  rfid: { icon: Wifi, label: 'RFID' },
  biometric: { icon: Fingerprint, label: 'Biometric' },
  manual: { icon: Edit, label: 'Manual' },
};

export default function AttendancePage() {
  const [date, setDate] = useState('2026-09-12');

  const records = ATTENDANCE_RECORDS.filter(r => r.date === date);
  const present = records.filter(r => r.status === 'present').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const late = records.filter(r => r.status === 'late').length;

  return (
    <div className="space-y-5">
      {/* Date Picker + Summary */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3">
          <label className="text-slate-500 text-sm">Date:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-3 py-2 bg-white border border-brand-pink/50 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Present', value: present, cls: 'text-brand-teal bg-brand-teal/20 border-brand-teal/40' },
            { label: 'Absent', value: absent, cls: 'text-brand-coral bg-brand-coral/10 border-brand-coral/30' },
            { label: 'Late', value: late, cls: 'text-brand-yellow bg-brand-yellow/20 border-brand-yellow/40' },
          ].map(s => (
            <div key={s.label} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium ${s.cls}`}>
              <span className="font-bold">{s.value}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {records.length === 0 ? (
        <div className="bg-white border border-brand-pink/30 rounded-2xl p-12 text-center">
          <p className="text-slate-500">No attendance records for {date}</p>
        </div>
      ) : (
        <div className="bg-white border border-brand-pink/30 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-pink/30">
                <th className="text-left text-slate-500 font-medium px-5 py-4">Student</th>
                <th className="text-left text-slate-500 font-medium px-4 py-4">Course</th>
                <th className="text-center text-slate-500 font-medium px-4 py-4">Status</th>
                <th className="text-center text-slate-500 font-medium px-4 py-4">Method</th>
                <th className="text-center text-slate-500 font-medium px-4 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {records.map(r => {
                const sc = STATUS_CONFIG[r.status];
                const mc = METHOD_CONFIG[r.method];
                return (
                  <tr key={r.id} className="hover:bg-brand-cream/40 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-teal rounded-lg flex items-center justify-center text-slate-800 text-xs font-bold">
                          {r.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-slate-800 font-medium">{r.studentName}</p>
                          <p className="text-slate-500 text-xs">{r.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-slate-800">{r.courseName}</p>
                      <p className="text-slate-500 text-xs font-mono">{r.courseId}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${sc.class}`}>
                        <sc.icon className="w-3.5 h-3.5" />
                        {sc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 px-2.5 py-1 bg-brand-cream rounded-lg">
                        <mc.icon className="w-3.5 h-3.5" />
                        {mc.label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center text-slate-500 text-xs">{r.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
