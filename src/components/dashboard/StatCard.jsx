import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendType = 'up',
  color = 'indigo',
  subtitle
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'hover:border-indigo-200'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-200'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'hover:border-blue-200'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'hover:border-amber-200'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'hover:border-purple-200'
    }
  };

  const selectedColor = colorMap[color] || colorMap.indigo;

  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 ${selectedColor.border}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`w-12 h-12 rounded-2xl ${selectedColor.bg} ${selectedColor.text} flex items-center justify-center shrink-0 shadow-xs`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>

      {(trend || subtitle) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend && (
            <span className={`inline-flex items-center gap-1 font-semibold ${
              trendType === 'up' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {trendType === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {trend}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-400 font-medium ml-auto">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
