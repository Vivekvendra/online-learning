import { UserCheck, Award, BookOpen, Sparkles } from 'lucide-react';
import { useEnrollments } from '../../hooks/useEnrollments';

export const RecentActivities = () => {
  const { enrollments } = useEnrollments();

  // Dynamically map enrollments to real-time events
  const dynamicEvents = (enrollments || []).slice(0, 3).map((enr, idx) => ({
    id: `dyn_${enr.id || idx}`,
    icon: UserCheck,
    iconBg: 'bg-purple-50 text-[#6355ec]',
    title: 'Student Enrolled',
    description: `${enr.studentName || 'A student'} enrolled in "${enr.courseName || 'Course'}".`,
    timestamp: enr.enrollmentDate ? `Enrolled on ${enr.enrollmentDate}` : 'Recently'
  }));

  const staticEvents = [
    {
      id: 'stat_1',
      icon: Award,
      iconBg: 'bg-emerald-50 text-emerald-600',
      title: 'Course Certified',
      description: 'Marco Chen passed the final assessment in "UI/UX Design Fundamentals".',
      timestamp: '2 hours ago'
    },
    {
      id: 'stat_2',
      icon: BookOpen,
      iconBg: 'bg-cyan-50 text-[#01a3a4]',
      title: 'Syllabus Updated',
      description: 'Dr. Sarah Johnson added new React 19 labs to the curriculum.',
      timestamp: 'Yesterday'
    }
  ];

  const allActivities = [...dynamicEvents, ...staticEvents].slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6355ec] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Platform Activities</h3>
            <p className="text-xs text-slate-400">Live feed of student achievements and course milestones</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {allActivities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50/70 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl ${act.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                  <span className="text-[11px] text-slate-400">{act.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
