import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  LogOut,
  PlusCircle,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';

export const Navbar = ({ onOpenSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-indigo-100/60 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      <div className="flex items-center gap-4 flex-1">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
          aria-label="Open Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative hidden md:block max-w-md w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, students, faculty..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#f8f9fd] border border-indigo-100/70 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6355ec] focus:border-[#6355ec] transition-colors"
          />
        </form>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/courses">
          <Button
            size="sm"
            variant="outline"
            icon={PlusCircle}
            className="hidden sm:inline-flex text-xs rounded-full border-indigo-200 text-[#6355ec]"
          >
            Explore Catalog
          </Button>
        </Link>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            className="relative p-2 text-slate-500 hover:text-[#6355ec] hover:bg-indigo-50/60 rounded-xl transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00d2d3] rounded-full ring-2 ring-white animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Notifications</span>
                <span className="text-[10px] font-semibold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="divide-y divide-slate-50 py-1 space-y-2">
                <div className="text-xs py-2">
                  <p className="font-semibold text-slate-800">New Student Registered</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Alex Morgan joined the academy.</p>
                  <span className="text-[10px] text-slate-400">5m ago</span>
                </div>
                <div className="text-xs py-2">
                  <p className="font-semibold text-slate-800">Course Enrollment Verified</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">React 19 Bootcamp enrollment confirmed.</p>
                  <span className="text-[10px] text-slate-400">20m ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-indigo-50/50 transition-colors cursor-pointer"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'User'}
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-[#6355ec]/30"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                {user?.name || 'User'}
              </p>
              <p className="text-[10px] text-[#6355ec] uppercase font-semibold">
                {user?.role || 'Member'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer font-semibold"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
