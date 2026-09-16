import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
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
  { label: 'Students', path: '/students', icon: Users, badge: 'Soon', active: false },
  { label: 'Instructors', path: '/instructors', icon: GraduationCap, badge: 'Soon', active: false },
  { label: 'Assignments', path: '/assignments', icon: FileCheck2, badge: 'Soon', active: false },
  { label: 'Reports', path: '/reports', icon: BarChart3, badge: 'Soon', active: false },
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
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-slate-300 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white">Stackly<span className="text-indigo-400">LMS</span></span>
              <span className="block text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Learning Hub</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Main Navigation
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            if (!item.active) {
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 opacity-60 cursor-not-allowed select-none"
                  title="${item.label} (Module Coming Soon)"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
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
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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

          <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Quick Shortcut
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-700/60 text-slate-300">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Third-Party API Ready</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Synced with DummyJSON API & local storage cache for live CRUD actions.
            </p>
            <NavLink
              to="/courses"
              className="inline-flex items-center justify-center w-full py-1.5 px-3 rounded-lg bg-slate-700/70 hover:bg-indigo-600 text-white text-xs font-medium transition-colors"
            >
              Explore Catalog
            </NavLink>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500/30 shrink-0"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white leading-snug">
                  {user?.name || 'Authorized User'}
                </p>
                <p className="truncate text-xs text-slate-400">
                  {user?.role || 'Learner'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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
