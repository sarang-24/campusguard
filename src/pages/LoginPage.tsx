import { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DEMO_ACCOUNTS = [
  { label: 'Student', email: 'student@campusguard.edu', color: 'bg-brand-teal text-white' },
  { label: 'Faculty', email: 'faculty@campusguard.edu', color: 'bg-brand-pink text-slate-800' },
  { label: 'Management', email: 'management@campusguard.edu', color: 'bg-brand-yellow text-slate-800' },
  { label: 'Admin', email: 'admin@campusguard.edu', color: 'bg-brand-teal text-white' },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent, overrideEmail?: string) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const success = login(overrideEmail ?? email, password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Use a demo account below.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-pink/40 via-brand-cream to-brand-teal/40 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-md">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 bg-brand-teal rounded-2xl flex items-center justify-center shadow-lg shadow-brand-teal/30">
              <Shield className="w-8 h-8 text-slate-800" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-slate-800 tracking-tight">CampusGuard</h1>
              <p className="text-brand-teal text-sm font-medium">Smart Attendance System</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Intelligent Attendance Management</h2>
          <p className="text-slate-500 text-base leading-relaxed mb-10">
            Comprehensive early warning system that monitors student attendance, detects risks, and keeps everyone informed before issues escalate.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Students', value: '2,400+' },
              { label: 'Accuracy', value: '99.2%' },
              { label: 'Departments', value: '12' },
            ].map(s => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-slate-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-brand-teal rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-slate-800" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">CampusGuard</h1>
              <p className="text-brand-teal text-xs">Smart Attendance System</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
          <p className="text-slate-500 mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@campusguard.edu"
                className="w-full px-4 py-3 bg-white border border-brand-teal/30 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-white border border-brand-teal/30 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-blue-500 rounded"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-brand-teal hover:text-brand-teal transition">
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="bg-brand-coral/10 border border-brand-coral/30 rounded-xl px-4 py-3 text-brand-coral text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-teal/20"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-brand-pink/60" />
              <span className="text-slate-500 text-xs flex items-center gap-1.5">
                Quick Demo Access
              </span>
              <div className="flex-1 h-px bg-brand-pink/60" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {DEMO_ACCOUNTS.map(acc => (
                <button
                  key={acc.email}
                  onClick={e => { setEmail(acc.email); handleLogin(e, acc.email); }}
                  className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-brand-teal/20 hover:border-brand-teal/50 rounded-xl text-left transition shadow-sm"
                >
                  <p className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${acc.color}`}>{acc.label}</p>
                  <p className="text-slate-600 text-xs font-medium truncate mt-0.5">{acc.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
