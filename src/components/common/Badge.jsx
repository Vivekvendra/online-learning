import React from 'react';

const VARIANTS = {
  indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200'
};

export const Badge = ({ children, variant = 'indigo', className = '' }) => {
  // auto-assign variants based on common level or status terms
  let resolvedVariant = variant;
  if (typeof children === 'string') {
    const text = children.toLowerCase();
    if (text === 'beginner') resolvedVariant = 'emerald';
    else if (text === 'intermediate') resolvedVariant = 'blue';
    else if (text === 'advanced') resolvedVariant = 'purple';
    else if (text === 'live' || text === 'completed') resolvedVariant = 'emerald';
    else if (text === 'pending' || text === 'upcoming') resolvedVariant = 'amber';
  }

  const variantClass = VARIANTS[resolvedVariant] || VARIANTS.indigo;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClass} ${className}`}>
      {children}
    </span>
  );
};
