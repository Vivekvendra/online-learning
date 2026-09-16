import React from 'react';
import { Link } from 'react-router-dom';
import { BookPlus, Compass, BookOpenCheck, BarChart2, Sparkles } from 'lucide-react';

export const QuickActions = ({ onOpenAddCourse }) => {
  const actions = [
    {
      title: 'Explore Courses',
      description: 'Search & filter full course catalog',
      icon: Compass,
      to: '/courses',
      color: 'from-blue-600 to-indigo-600',
      badge: 'Active'
    },
    {
      title: 'Add New Course',
      description: 'Create & publish a new curriculum',
      icon: BookPlus,
      onClick: onOpenAddCourse,
      to: '/courses?action=new',
      color: 'from-indigo-600 to-purple-600',
      badge: 'Action'
    },
    {
      title: 'Enrolled Courses',
      description: 'Resume learning where you left off',
      icon: BookOpenCheck,
      to: '/courses?view=enrolled',
      color: 'from-emerald-600 to-teal-600',
      badge: 'Student'
    },
    {
      title: 'View Analytics',
      description: 'Inspect overall metrics and progress',
      icon: BarChart2,
      to: '/dashboard',
      color: 'from-amber-500 to-orange-600',
      badge: 'Metrics'
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
            className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all duration-200 text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${act.color} text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                {act.badge}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {act.title}
            </h4>
            <p className="text-xs text-slate-500 mt-1 leading-snug">
              {act.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
