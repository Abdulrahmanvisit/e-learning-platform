/**
 * LearnPath Navigation Header
 * Highly responsive across PC (desktop wide), Tablet (iPad/medium), and Mobile devices.
 * Features: Explore Courses, Learning Paths, Cohort Network & Chat, Placement Diagnostics,
 * and live dynamic learning streak tracker.
 */
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Layers,
  Award,
  Sparkles,
  User,
  LogOut,
  Compass,
  Menu,
  X,
  Flame,
  Users,
  MessageSquare
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenAuth }) => {
  const { user, availableAccounts, switchAccount, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter accounts to learner accounts only
  const learnerAccounts = availableAccounts.filter((acc) => acc.role === 'learner');

  const navLinks = [
    { id: 'catalogue', label: 'Explore Courses', icon: BookOpen },
    { id: 'paths', label: 'Learning Paths', icon: Layers },
    { id: 'community', label: 'Cohort Network & Chat', icon: Users, badge: 'Community' },
    { id: 'pretest', label: 'Placement Diagnostic', icon: Compass },
    { id: 'verify', label: 'Verify Certificate', icon: Award },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Lockup */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#17365D] flex items-center justify-center text-white font-extrabold text-sm shadow-xs border border-blue-900/30">
            LP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-[#17365D] group-hover:text-blue-600 transition-colors">
                LearnPath
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                Academy
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Progressive E-Learning & Prerequisite Mastery
            </div>
          </div>
        </button>

        {/* Desktop & Tablet Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors hover:text-[#17365D] flex items-center gap-1.5 py-1 whitespace-nowrap ${
                  isActive
                    ? 'text-[#17365D] font-bold border-b-2 border-[#17365D]'
                    : ''
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Zone: Dynamic Streak, Workspace & Profile */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          
          {user ? (
            <>
              {/* Dynamic Learning Streak Pill */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold"
                title="Daily Learning Streak - updates dynamically as you complete lessons and coding exercises"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-current animate-bounce" />
                <span className="tabular-nums">{user.learningStreak || 1}d Streak</span>
              </div>

              {/* Primary Action: Go to Student Dashboard */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs whitespace-nowrap ${
                  currentView === 'dashboard'
                    ? 'bg-[#17365D] text-white shadow-sm'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>My Learning</span>
              </button>

              {/* Student Account Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-[10px]">
                    {user.fullName ? user.fullName.charAt(0) : 'S'}
                  </div>
                  <div className="text-left hidden md:block">
                    <span className="font-semibold text-slate-900 block leading-tight text-xs max-w-[110px] truncate">{user.fullName}</span>
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                        <Flame className="w-3.5 h-3.5 text-amber-600" />
                        <span>{user.learningStreak || 1} Day Learning Streak</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                      >
                        <GraduationCap className="w-4 h-4 text-blue-600" />
                        <span>Student Dashboard</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('community')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                      >
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>Cohort Network & Chat</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('catalogue')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                      >
                        <BookOpen className="w-4 h-4 text-slate-500" />
                        <span>Browse Courses</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('verify')}
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                      >
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>Verified Certificates</span>
                      </button>
                    </div>

                    {/* Quick Student Profile Switcher */}
                    {learnerAccounts.length > 1 && (
                      <div className="border-t border-slate-100 pt-2 px-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
                          Switch Student Demo Account
                        </p>
                        {learnerAccounts.map((acc) => (
                          <button
                            key={acc.id}
                            onClick={() => switchAccount(acc.id)}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                              acc.id === user.id
                                ? 'bg-blue-50 text-blue-900 font-semibold'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span>{acc.fullName}</span>
                            {acc.id === user.id && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-slate-100 mt-2 pt-1 px-2">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onOpenAuth();
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded font-medium flex items-center gap-2"
                      >
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account Credentials</span>
                      </button>
                      <button
                        onClick={logout}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded font-medium flex items-center gap-2 mt-0.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-bold text-white bg-[#17365D] hover:bg-blue-900 rounded-lg transition-colors shadow-xs"
            >
              Sign In
            </button>
          )}

        </div>

        {/* Mobile Hamburger Toggle (Tablet & Mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          {user && (
            <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[11px] font-bold">
              <Flame className="w-3 h-3 text-amber-500 fill-current" />
              <span>{user.learningStreak || 1}d</span>
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg animate-in fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                    currentView === link.id
                      ? 'bg-blue-50 text-blue-900 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full py-2.5 px-3 bg-[#17365D] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Open Student Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs text-slate-700 font-semibold text-center"
                >
                  Switch / Manage Student Account
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 px-3 bg-[#17365D] text-white rounded-lg text-xs font-bold text-center"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
