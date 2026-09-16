import { UserCheck, BookOpen, Award, CheckCircle, FileText } from 'lucide-react';

const ACTIVITIES_DATA = [
  {
    id: 1,
    icon: UserCheck,
    iconBg: 'bg-indigo-100 text-indigo-600',
    title: 'New Student Enrollment',
    description: 'Alex Rivera enrolled in "Full-Stack Web Development Bootcamp".',
    timestamp: '12 minutes ago'
  },
  {
    id: 2,
    icon: Award,
    iconBg: 'bg-emerald-100 text-emerald-600',
    title: 'Course Completed',
    description: 'Marcus Vance certified in "Cloud Computing & DevOps: AWS".',
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    icon: BookOpen,
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'Syllabus Updated',
    description: 'Dr. Elena Rostova added 4 new modules to Data Science Masterclass.',
    timestamp: '3 hours ago'
  },
  {
    id: 4,
    icon: FileText,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Assignment Submitted',
    description: '18 students submitted "Figma Micro-interactions Project".',
    timestamp: '5 hours ago'
  },
  {
    id: 5,
    icon: CheckCircle,
    iconBg: 'bg-purple-100 text-purple-600',
    title: 'System Backup',
    description: 'Automated database synchronization and DummyJSON API sync completed.',
    timestamp: 'Yesterday'
  }
];

export const RecentActivities = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Activities</h3>
          <p className="text-xs text-slate-500">Real-time log of portal events and learner milestones</p>
        </div>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {ACTIVITIES_DATA.map((act, idx) => {
            const Icon = act.icon;
            const isLast = idx === ACTIVITIES_DATA.length - 1;
            return (
              <li key={act.id}>
                <div className="relative pb-8">
                  {!isLast && (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-100"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex space-x-3.5">
                    <div>
                      <span className={`h-8 w-8 rounded-xl flex items-center justify-center ring-4 ring-white ${act.iconBg}`}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-slate-800">
                          {act.title}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {act.timestamp}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
