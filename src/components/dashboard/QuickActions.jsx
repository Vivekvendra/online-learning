import { Link } from 'react-router-dom';
import { BookOpen, UserPlus, BookmarkPlus, GraduationCap } from 'lucide-react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Course Catalog',
      description: 'Explore, filter & create courses',
      icon: BookOpen,
      to: '/courses',
      gradient: 'from-[#6355ec] to-[#8b7ff5]',
      badge: 'Courses'
    },
    {
      title: 'Student Directory',
      description: 'Register & manage learners',
      icon: UserPlus,
      to: '/students',
      gradient: 'from-[#00d2d3] to-[#01a3a4]',
      badge: 'Students'
    },
    {
      title: 'Course Enrollments',
      description: 'Track progress & assign courses',
      icon: BookmarkPlus,
      to: '/enrollments',
      gradient: 'from-emerald-500 to-teal-600',
      badge: 'Enroll'
    },
    {
      title: 'Faculty & Mentors',
      description: 'Manage instructors & assignments',
      icon: GraduationCap,
      to: '/instructors',
      gradient: 'from-amber-400 to-orange-500',
      badge: 'Faculty'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.title}
            to={act.to}
            className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${act.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-purple-50 group-hover:text-[#6355ec] transition-colors">
                {act.badge}
              </span>
            </div>
            <h4 className="text-sm font-black text-slate-900 group-hover:text-[#6355ec] transition-colors">
              {act.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {act.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
