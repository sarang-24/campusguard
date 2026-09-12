import { WARNINGS } from '../data/mockData';
import { AlertTriangle, AlertOctagon } from 'lucide-react';

const SEVERITY_CONFIG = {
  warning: { icon: AlertTriangle, class: 'text-brand-yellow bg-brand-yellow/20 border-brand-yellow/50', label: 'Warning' },
  critical: { icon: AlertOctagon, class: 'text-brand-coral bg-brand-coral/10 border-brand-coral/30', label: 'Critical' },
};

const STATUS_CONFIG = {
  active: { class: 'text-brand-coral bg-brand-coral/10', label: 'Active' },
  acknowledged: { class: 'text-brand-yellow bg-brand-yellow/20', label: 'Acknowledged' },
  resolved: { class: 'text-brand-teal bg-brand-teal/20', label: 'Resolved' },
};

export default function WarningsPage() {
  const critical = WARNINGS.filter(w => w.severity === 'critical');
  const warning = WARNINGS.filter(w => w.severity === 'warning');

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Warnings', value: WARNINGS.length, cls: 'bg-brand-pink' },
          { label: 'Critical', value: critical.length, cls: 'bg-brand-coral' },
          { label: 'Warning', value: warning.length, cls: 'bg-brand-yellow' },
          { label: 'Resolved', value: WARNINGS.filter(w => w.status === 'resolved').length, cls: 'bg-brand-teal' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-brand-pink/30 rounded-2xl p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${s.cls} rounded-xl flex items-center justify-center`}>
              <span className="text-slate-800 text-lg font-bold">{s.value}</span>
            </div>
            <p className="text-slate-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Warnings List */}
      <div className="space-y-3">
        {WARNINGS.map(w => {
          const sev = SEVERITY_CONFIG[w.severity];
          const sts = STATUS_CONFIG[w.status];
          return (
            <div key={w.id} className={`bg-white border rounded-2xl p-5 flex items-start gap-4 ${w.severity === 'critical' ? 'border-brand-coral/30' : 'border-amber-500/20'}`}>
              <div className={`p-3 rounded-xl border ${sev.class} shrink-0`}>
                <sev.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-slate-800 font-semibold">{w.studentName}</h3>
                    <p className="text-slate-500 text-sm mt-0.5">{w.department}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${sev.class}`}>{sev.label}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${sts.class}`}>{sts.label}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <div>
                    <p className="text-slate-500 text-xs">Attendance</p>
                    <p className={`text-lg font-bold ${w.attendancePercentage < 65 ? 'text-brand-coral' : 'text-brand-yellow'}`}>{w.attendancePercentage}%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Issued</p>
                    <p className="text-slate-800 text-sm">{w.issuedDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Courses Affected</p>
                    <div className="flex gap-1.5 mt-0.5">
                      {w.coursesAffected.map(c => (
                        <span key={c} className="text-xs px-1.5 py-0.5 bg-brand-cream text-slate-600 rounded font-mono">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button className="px-4 py-1.5 bg-brand-teal hover:bg-brand-teal text-slate-800 text-xs font-medium rounded-lg transition">Notify</button>
                <button className="px-4 py-1.5 bg-brand-cream hover:bg-brand-pink text-slate-600 text-xs font-medium rounded-lg transition">Resolve</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
