import { Link } from 'react-router-dom';
import { Star, ChevronRight, GraduationCap } from 'lucide-react';
import { useInstructors } from '../../hooks/useInstructors';

export const InstructorsSpotlight = () => {
  const { instructors } = useInstructors();
  const topInstructors = (instructors || []).slice(0, 4);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6355ec] flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Featured Instructors</h3>
            <p className="text-xs text-slate-400">Top-rated academy educators</p>
          </div>
        </div>
        <Link
          to="/instructors"
          className="text-xs font-bold text-[#6355ec] hover:text-[#5244dc] flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {topInstructors.map((ins) => (
          <Link
            key={ins.id}
            to={`/instructors/${ins.id}`}
            className="p-3 rounded-xl border border-slate-100 hover:border-[#6355ec]/30 hover:bg-purple-50/30 transition-all duration-200 group flex items-center gap-3"
          >
            <img
              src={ins.profileImage || `https://i.pravatar.cc/80?u=${ins.id}`}
              alt={ins.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-100 group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#6355ec] transition-colors">
                {ins.name}
              </h4>
              <p className="text-[11px] text-slate-400 truncate">
                {ins.specialization}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[11px] font-bold text-slate-700 ml-0.5">
                    {(ins.rating || 4.8).toFixed(1)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-300">•</span>
                <span className="text-[10px] text-[#00d2d3] font-bold">
                  {ins.totalCourses || (ins.assignedCourseIds ? ins.assignedCourseIds.length : 0)} courses
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
