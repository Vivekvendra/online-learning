import React from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  GraduationCap,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { StatCard } from '../../components/dashboard/StatCard';
import { UpcomingClasses } from '../../components/dashboard/UpcomingClasses';
import { RecentActivities } from '../../components/dashboard/RecentActivities';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { LearningChart } from '../../components/dashboard/LearningChart';
import { Button } from '../../components/common/Button';

export const DashboardPage = () => {
  const { user } = useAuth();

  // Metrics (configured as specified in Module 2)
  const stats = [
    {
      title: 'Total Courses',
      value: '24',
      icon: BookOpen,
      color: 'indigo',
      trend: '+4 this month',
      trendType: 'up',
      subtitle: 'Across 8 disciplines'
    },
    {
      title: 'Total Students',
      value: '1,482',
      icon: Users,
      color: 'blue',
      trend: '+12.5% new',
      trendType: 'up',
      subtitle: 'Active enrollments'
    },
    {
      title: 'Total Instructors',
      value: '38',
      icon: GraduationCap,
      color: 'purple',
      trend: '+3 verified',
      trendType: 'up',
      subtitle: 'Certified mentors'
    },
    {
      title: 'Enrolled Courses',
      value: '8',
      icon: BookmarkCheck,
      color: 'amber',
      trend: '2 in-progress',
      trendType: 'up',
      subtitle: 'Active curriculum'
    },
    {
      title: 'Completed Courses',
      value: '12',
      icon: CheckCircle2,
      color: 'emerald',
      trend: '100% certified',
      trendType: 'up',
      subtitle: 'Verified credentials'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome to Stackly LMS • Academic Term 2026</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Hello, {user?.name || 'Educator'}! 👋
          </h1>
          <p className="text-sm sm:text-base text-indigo-100/90 mt-2 leading-relaxed">
            Track student engagement, manage courses, monitor live sessions, and review recent activity in real-time.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/courses">
              <Button
                variant="primary"
                size="md"
                className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold shadow-md"
                icon={ArrowRight}
                iconPosition="right"
              >
                Browse Course Catalog
              </Button>
            </Link>
            <Link to="/courses?action=new">
              <Button
                variant="outline"
                size="md"
                className="text-white border-white/30 hover:bg-white/10"
              >
                + Create New Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      </div>

      {/* Module 2: Key Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Overview & Key Metrics</h2>
            <p className="text-xs text-slate-500">Live platform totals across courses, learners, and faculties</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-slate-900">Quick Actions</h2>
          <span className="text-xs text-slate-400">Frequently used operations</span>
        </div>
        <QuickActions />
      </div>

      {/* Analytics & Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LearningChart />
        <UpcomingClasses />
      </div>

      {/* Recent Activities Feed */}
      <div>
        <RecentActivities />
      </div>
    </div>
  );
};
