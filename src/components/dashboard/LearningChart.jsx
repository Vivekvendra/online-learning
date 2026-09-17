import { TrendingUp, Clock, Flame, BarChart3 } from 'lucide-react';

export const LearningChart = () => {

  const WEEK_DAYS = [
    { day: 'Mon', hours: 4.5, percent: 75 },
    { day: 'Tue', hours: 6.0, percent: 100 },
    { day: 'Wed', hours: 3.2, percent: 53 },
    { day: 'Thu', hours: 5.5, percent: 91 },
    { day: 'Fri', hours: 4.0, percent: 66 },
    { day: 'Sat', hours: 2.8, percent: 46 },
    { day: 'Sun', hours: 2.0, percent: 33 }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#6355ec] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Learning Analytics</h3>
              <p className="text-xs text-slate-400">Weekly study momentum and engagement</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.8% pace</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100/60 flex items-center gap-3">
            <div className="p-2 bg-[#6355ec] text-white rounded-xl shadow-xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Hours</span>
              <p className="text-lg font-black text-slate-900">28.0 hrs</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100/60 flex items-center gap-3">
            <div className="p-2 bg-[#00d2d3] text-slate-900 rounded-xl shadow-xs">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Study Streak</span>
              <p className="text-lg font-black text-slate-900">18 Days 🔥</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-end justify-between gap-2.5 h-40 pt-4 px-2">
          {WEEK_DAYS.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-[#6355ec] bg-purple-50 px-1.5 py-0.5 rounded transition-all opacity-0 group-hover:opacity-100">
                {d.hours}h
              </span>
              <div className="w-full bg-slate-100 rounded-xl h-full flex items-end p-1">
                <div
                  style={{ height: `${d.percent}%` }}
                  className="w-full bg-gradient-to-t from-[#6355ec] to-[#00d2d3] rounded-lg group-hover:brightness-110 transition-all duration-300 shadow-xs"
                />
              </div>
              <span className="text-xs font-bold text-slate-500 group-hover:text-[#6355ec] transition-colors">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
