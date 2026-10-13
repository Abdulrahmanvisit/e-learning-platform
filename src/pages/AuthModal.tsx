/**
 * LearnPath Learner Authentication & Profile Selector Modal
 * Purely student/learner-centric. Allows signing in, creating a student account,
 * or switching between student demo accounts to test progressive learning milestones.
 */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { X, CheckCircle2, GraduationCap, Lock, Mail, User, BookOpen } from 'lucide-react';

export const AuthModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { user, availableAccounts, switchAccount, login, register } = useAuth();
  const [tab, setTab] = useState<'profiles' | 'login' | 'register' | 'recover'>('profiles');

  // Form states
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter to learners only
  const learnerAccounts = availableAccounts.filter((acc) => acc.role === 'learner');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      await login(email);
      onClose();
    } catch (err: any) {
      setMessage(err.message || 'Sign in failed. Check email or use a demo profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(null);
      await register(email, fullName, 'learner');
      onClose();
    } catch (err: any) {
      setMessage(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Password recovery instructions simulated for ${email}. Check inbox.`);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#17365D] flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
              LP
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Student Access & Credentials</h3>
              <p className="text-[11px] text-slate-500">Progressive Learning Management</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => { setTab('profiles'); setMessage(null); }}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              tab === 'profiles' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Demo Profiles
          </button>
          <button
            onClick={() => { setTab('login'); setMessage(null); }}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              tab === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setTab('register'); setMessage(null); }}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              tab === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register
          </button>
        </div>

        {message && (
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
            {message}
          </div>
        )}

        {/* Tab 1: Instant Student Profile Switcher */}
        {tab === 'profiles' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600">
              Select a student profile to test different course enrollments, milestone achievements, and prerequisite unlocking states:
            </p>

            <div className="space-y-2">
              {learnerAccounts.map((account) => {
                const isActive = account.id === user?.id;
                return (
                  <button
                    key={account.id}
                    onClick={async () => {
                      await switchAccount(account.id);
                      onClose();
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                        <GraduationCap className="w-4 h-4 text-blue-700" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{account.fullName}</span>
                          {isActive && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-600 text-white rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[220px]">
                          {account.bio || account.email}
                        </div>
                      </div>
                    </div>
                    {isActive ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <span className="text-[11px] text-blue-600 font-semibold hover:underline">Select</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Email Sign In */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Student Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. abdurrahman.learner@learnpath.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setTab('recover')}
                  className="text-[11px] text-blue-600 hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  defaultValue="studentpassword123"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#17365D] hover:bg-blue-900 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              {loading ? 'Authenticating...' : 'Sign In to Workspace'}
            </button>
          </form>
        )}

        {/* Tab 3: Register */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Abdurrahman Bello"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Student Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              {loading ? 'Creating Student Account...' : 'Create Learner Account'}
            </button>
          </form>
        )}

        {/* Tab 4: Recover */}
        {tab === 'recover' && (
          <form onSubmit={handleRecoverSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Account Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Dispatch Recovery Instructions
            </button>
            <button
              type="button"
              onClick={() => setTab('login')}
              className="w-full text-center text-xs text-slate-600 hover:underline"
            >
              Back to Sign In
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
