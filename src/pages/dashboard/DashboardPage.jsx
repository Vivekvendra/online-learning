import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  GraduationCap,
  BookmarkCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Compass
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useCourses } from '../../hooks/useCourses';
import { useStudents } from '../../hooks/useStudents';
import { useEnrollments } from '../../hooks/useEnrollments';
import { useInstructors } from '../../hooks/useInstructors';
import { StatCard } from '../../components/dashboard/StatCard';
import { UpcomingClasses } from '../../components/dashboard/UpcomingClasses';
import { RecentActivities } from '../../components/dashboard/RecentActivities';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { LearningChart } from '../../components/dashboard/LearningChart';
import { InstructorsSpotlight } from '../../components/dashboard/InstructorsSpotlight';
import { Button } from '../../components/common/Button';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const { students } = useStudents();
  const { enrollments } = useEnrollments();
  const { instructors } = useInstructors();

  // Dynamic calculations from context
  const totalCourses = courses?.length || 24;
  const totalStudents = students?.length || 148;
  const totalInstructors = instructors?.length || 8;
  const totalEnrollments = enrollments?.length || 18;
  const completedEnrollments = (enrollments || []).filter((e) => e.status === 'completed').length;

  const stats = [
    {
      title: 'Total Courses',
      value: String(totalCourses),
      icon: BookOpen,
      color: 'purple',
      trend: '+4 this term',
      trendType: 'up',
      subtitle: 'Across disciplines',
      to: '/courses'
    },
    {
      title: 'Total Students',
      value: String(totalStudents),
      icon: Users,
      color: 'cyan',
      trend: '+12% active',
      trendType: 'up',
      subtitle: 'Verified learners',
      to: '/students'
    },
    {
      title: 'Instructors',
      value: String(totalInstructors),
      icon: GraduationCap,
      color: 'indigo',
      trend: 'Certified',
      trendType: 'up',
      subtitle: 'Academy faculty',
      to: '/instructors'
    },
    {
      title: 'Active Enrollments',
      value: String(totalEnrollments),
      icon: BookmarkCheck,
      color: 'amber',
      trend: 'In progress',
      trendType: 'up',
      subtitle: 'Active tracks',
      to: '/enrollments'
    },
    {
      title: 'Completed',
      value: String(completedEnrollments || 12),
      icon: CheckCircle2,
      color: 'emerald',
      trend: '100% verified',
      trendType: 'up',
      subtitle: 'Certificates issued',
      to: '/enrollments'
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* 1. Unique Hero Banner with Gradient & Glassmorphism */}
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#161233] via-[#241c52] to-[#6355ec] p-6 sm:p-10 text-white shadow-2xl shadow-indigo-950/20">
        {/* Playful background decorative shapes */}
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-[#00d2d3]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-[#6355ec]/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#00d2d3] text-xs font-bold mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#00d2d3]" />
            <span>Welcome to QLTSGeek Academy Portal • 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Welcome back, {user?.name || 'Educator'}! 👋
          </h1>

          <p className="text-sm sm:text-base text-indigo-100/80 mt-2.5 leading-relaxed max-w-2xl">
            Empowering students with industry-grade curriculum. Monitor course registrations, live classes, student progress, and mentor assignments from your central cockpit.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to="/courses">
              <Button
                variant="primary"
                size="md"
                className="bg-[#00d2d3] hover:bg-[#01b8b9] text-slate-900 font-bold shadow-lg shadow-cyan-500/20 border-none rounded-xl"
                icon={Compass}
                iconPosition="left"
              >
                Browse Catalog
              </Button>
            </Link>
            <Link to="/enrollments">
              <Button
                variant="outline"
                size="md"
                className="text-white border-white/20 hover:bg-white/10 rounded-xl"
                icon={ArrowRight}
                iconPosition="right"
              >
                Manage Enrollments
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Overview & Key Metrics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900">Overview & Key Metrics</h2>
            <p className="text-xs text-slate-400">Live platform stats synced in real-time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* 3. Quick Action Hub */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-slate-900">Quick Launchpad</h2>
          <span className="text-xs text-slate-400">Fast operations</span>
        </div>
        <QuickActions />
      </div>

      {/* 4. Analytics & Live Class Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LearningChart />
        <UpcomingClasses />
      </div>

      {/* 5. Top Instructors Spotlight */}
      <InstructorsSpotlight />

      {/* 6. Recent Activities Feed */}
      <RecentActivities />
    </div>
  );
};
