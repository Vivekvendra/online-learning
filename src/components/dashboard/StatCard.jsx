import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType = 'up',
  color = 'purple',
  subtitle,
  to
}) => {
  const colorMap = {
    purple: {
      gradient: 'from-[#6355ec] to-[#8b7ff5]',
      bgLight: 'bg-purple-50/80',
      text: 'text-[#6355ec]',
      border: 'hover:border-[#6355ec]/30',
      glow: 'group-hover:shadow-purple-500/10'
    },
    cyan: {
      gradient: 'from-[#00d2d3] to-[#01a3a4]',
      bgLight: 'bg-cyan-50/80',
      text: 'text-[#01a3a4]',
      border: 'hover:border-[#00d2d3]/30',
      glow: 'group-hover:shadow-cyan-500/10'
    },
    emerald: {
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50/80',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-500/30',
      glow: 'group-hover:shadow-emerald-500/10'
    },
    amber: {
      gradient: 'from-amber-400 to-orange-500',
      bgLight: 'bg-amber-50/80',
      text: 'text-amber-600',
      border: 'hover:border-amber-500/30',
      glow: 'group-hover:shadow-amber-500/10'
    },
    indigo: {
      gradient: 'from-indigo-600 to-blue-600',
      bgLight: 'bg-indigo-50/80',
      text: 'text-indigo-600',
      border: 'hover:border-indigo-500/30',
      glow: 'group-hover:shadow-indigo-500/10'
    }
  };

  const scheme = colorMap[color] || colorMap.purple;

  const content = (
    <div className={`group relative overflow-hidden bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl ${scheme.glow} ${scheme.border} transition-all duration-300 flex flex-col justify-between h-full`}>
      {/* Decorative corner glow */}
      <div className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${scheme.gradient} opacity-10 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500 pointer-events-none`} />

      <div>
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${scheme.gradient} text-white flex items-center justify-center shadow-md shadow-indigo-950/5 group-hover:scale-110 transition-transform duration-300`}>
            {Icon && <Icon className="w-5 h-5" />}
          </div>
        </div>

        <h3 className="text-3xl font-black text-slate-900 tracking-tight">
          {value}
        </h3>
      </div>

      {(trend || subtitle) && (
        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
          {trend && (
            <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded-full text-[11px] ${
              trendType === 'up' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
            }`}>
              {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 font-medium text-[11px] ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};
