import { Video, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { Badge } from '../common/Badge';

const UPCOMING_CLASSES_DATA = [
  {
    id: 'cls_1',
    title: 'React 19 & Next.js Architecture Masterclass',
    instructor: 'Dr. Sarah Johnson',
    time: 'Today, 4:00 PM - 5:30 PM',
    platform: 'Live Zoom',
    status: 'Live Now',
    tagVariant: 'emerald',
    participants: 54
  },
  {
    id: 'cls_2',
    title: 'Deep Learning & Neural Networks in Python',
    instructor: 'Prof. Michael Chen',
    time: 'Tomorrow, 10:00 AM - 11:30 AM',
    platform: 'Google Meet',
    status: 'Upcoming',
    tagVariant: 'purple',
    participants: 42
  },
  {
    id: 'cls_3',
    title: 'Modern Design Systems & Micro-Interactions',
    instructor: 'Emily Rodriguez',
    time: 'Friday, 2:00 PM - 3:15 PM',
    platform: 'Live Zoom',
    status: 'Upcoming',
    tagVariant: 'cyan',
    participants: 61
  }
];

export const UpcomingClasses = () => {
  const handleJoin = (title) => {
    toast.success(`Connecting to virtual classroom for "${title}"...`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6355ec] flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Upcoming Live Classes</h3>
            <p className="text-xs text-slate-400">Interactive live sessions with educators</p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#6355ec] bg-purple-50 px-3 py-1 rounded-full">
          3 Scheduled
        </span>
      </div>

      <div className="space-y-3">
        {UPCOMING_CLASSES_DATA.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={item.tagVariant}>{item.status}</Badge>
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-slate-400" />
                  {item.platform}
                </span>
                <span className="text-[11px] text-slate-400">
                  👥 {item.participants} attending
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500">
                Mentor: <span className="font-semibold text-slate-700">{item.instructor}</span> • {item.time}
              </p>
            </div>

            <button
              onClick={() => handleJoin(item.title)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#6355ec] hover:bg-[#5244dc] text-white transition-colors cursor-pointer shrink-0 shadow-sm shadow-[#6355ec]/30"
            >
              Join Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
