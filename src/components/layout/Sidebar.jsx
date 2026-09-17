import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  BookmarkCheck,
  FileCheck2,
  BarChart3,
  LogOut,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, active: true },
  { label: 'Courses', path: '/courses', icon: BookOpen, active: true },
  { label: 'Students', path: '/students', icon: Users, active: true },
  { label: 'Enrollments', path: '/enrollments', icon: BookmarkCheck, active: true },
  { label: 'Instructors', path: '/instructors', icon: GraduationCap, active: true },
  { label: 'Assignments', path: '/assignments', icon: FileCheck2, badge: 'Module 8', active: false },
  { label: 'Reports', path: '/reports', icon: BarChart3, badge: 'Module 9', active: false },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-[#161233] text-slate-300 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-indigo-950/60">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full border-2 border-[#00d2d3] flex items-center justify-center">
              <span className="text-sm font-black text-[#00d2d3]">G</span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#6355ec] rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">QLTS<span className="text-[#00d2d3]">Geek</span></span>
              <span className="block text-[10px] font-semibold tracking-wider text-indigo-300/60 uppercase">Academy Portal</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-indigo-400/60">
            Academy Management
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            if (!item.active) {
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-indigo-300/40 opacity-50 cursor-not-allowed select-none"
                  title="${item.label} (${item.badge})"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {item.badge}
                    </span>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#6355ec] text-white shadow-lg shadow-indigo-600/30'
                      : 'text-indigo-200/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-indigo-400/60">
            Quick Status
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-[#1e174b] border border-indigo-800/40 text-indigo-200">
            <div className="flex items-center gap-2 text-[#00d2d3] font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Modules 1 - 6 Active</span>
            </div>
            <p className="text-xs text-indigo-300/70 leading-relaxed mb-3">
              Full CRUD enabled for Courses, Students, Enrollments, and Instructors.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Local Storage Synced</span>
            </div>
          </div>
        </div>

        {/* User Session Footer */}
        <div className="p-4 border-t border-indigo-950/60 bg-[#120e2a]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-[#6355ec]/50 shrink-0"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white leading-snug">
                  {user?.name || 'Authorized User'}
                </p>
                <p className="truncate text-xs text-indigo-300/70">
                  {user?.role || 'Learner'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
