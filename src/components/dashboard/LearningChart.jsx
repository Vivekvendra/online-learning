import React from 'react';
import { TrendingUp, Clock, Flame } from 'lucide-react';

export const LearningChart = () => {
  const WEEK_DAYS = [
    { day: 'Mon', hours: 4.5, percent: 75 },
    { day: 'Tue', hours: 6.0, percent: 100 },
    { day: 'Wed', hours: 3.2, percent: 53 },
    { day: 'Thu', hours: 5.5, percent: 91 },
    { day: 'Fri', hours: 4.0, percent: 66 },
    { day: 'Sat', hours: 2.5, percent: 41 },
    { day: 'Sun', hours: 1.5, percent: 25 }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Study Hours & Activity</h3>
            <p className="text-xs text-slate-500">Weekly learning momentum breakdown</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        {/* Stats summary pills */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Hours</span>
              <p className="text-base font-bold text-slate-900">27.2 hrs</p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Current Streak</span>
              <p className="text-base font-bold text-slate-900">14 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bar graph visual */}
      <div className="pt-2">
        <div className="flex items-end justify-between gap-2 h-36 pt-4 px-2">
          {WEEK_DAYS.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                {d.hours}h
              </span>
              <div className="w-full bg-slate-100 rounded-lg h-full flex items-end p-1">
                <div
                  style={{ height: `${d.percent}%` }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-md group-hover:from-indigo-700 group-hover:to-indigo-500 transition-all duration-300"
                />
              </div>
              <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
