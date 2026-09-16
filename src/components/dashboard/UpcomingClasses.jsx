import { Clock, Video, ExternalLink } from 'lucide-react';
import { toast } from 'react-toastify';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

const UPCOMING_CLASSES_DATA = [
  {
    id: 'cls_1',
    title: 'React 19 Server Components & Actions Deep Dive',
    instructor: 'David Miller',
    time: 'Today, 4:00 PM - 5:30 PM',
    platform: 'Live Zoom',
    status: 'Live',
    tagVariant: 'emerald',
    participants: 48
  },
  {
    id: 'cls_2',
    title: 'Data Wrangling & Statistical Inference with Pandas',
    instructor: 'Dr. Elena Rostova',
    time: 'Tomorrow, 10:00 AM - 11:30 AM',
    platform: 'Google Meet',
    status: 'Upcoming',
    tagVariant: 'blue',
    participants: 36
  },
  {
    id: 'cls_3',
    title: 'Design System Tokens & Responsive Auto-Layout',
    instructor: 'Jessica Chen',
    time: 'Friday, 2:00 PM - 3:15 PM',
    platform: 'Live Zoom',
    status: 'Upcoming',
    tagVariant: 'amber',
    participants: 52
  }
];

export const UpcomingClasses = () => {
  const handleJoin = (title) => {
    toast.success(`Launching virtual classroom for "${title}"...`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Upcoming Live Classes</h3>
          <p className="text-xs text-slate-500">Interactive live lectures and Q&A sessions</p>
        </div>
        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
          3 Scheduled
        </span>
      </div>

      <div className="space-y-3">
        {UPCOMING_CLASSES_DATA.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={item.tagVariant}>{item.status}</Badge>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-slate-400" />
                  {item.platform}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {item.title}
              </h4>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.time}
                </span>
                <span className="hidden sm:inline-block text-slate-300">•</span>
                <span>By {item.instructor}</span>
              </div>
            </div>

            <Button
              size="sm"
              variant={item.status === 'Live' ? 'primary' : 'outline'}
              icon={ExternalLink}
              iconPosition="right"
              onClick={() => handleJoin(item.title)}
              className="shrink-0 text-xs py-1.5"
            >
              {item.status === 'Live' ? 'Join Now' : 'Remind Me'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
