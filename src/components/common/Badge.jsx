const VARIANTS = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  purple: 'bg-purple-50 text-[#6355ec] border-purple-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200'
};

export const Badge = ({ children, variant = 'purple', className = '' }) => {
  let resolvedVariant = variant;
  if (typeof children === 'string') {
    const text = children.toLowerCase();
    if (text === 'beginner') resolvedVariant = 'cyan';
    else if (text === 'intermediate') resolvedVariant = 'blue';
    else if (text === 'advanced') resolvedVariant = 'purple';
    else if (text === 'live' || text === 'completed' || text === 'active') resolvedVariant = 'emerald';
    else if (text === 'pending' || text === 'upcoming' || text === 'paused') resolvedVariant = 'amber';
  }

  const variantClass = VARIANTS[resolvedVariant] || VARIANTS.purple;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variantClass} ${className}`}>
      {children}
    </span>
  );
};
