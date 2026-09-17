import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary: 'bg-[#6355ec] hover:bg-[#5244dc] text-white shadow-sm hover:shadow-md hover:shadow-indigo-500/20 active:bg-[#4839cc] focus-visible:ring-indigo-500',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:bg-slate-300 focus-visible:ring-slate-400',
  outline: 'border border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700 hover:text-indigo-600 active:bg-slate-100 focus-visible:ring-indigo-500',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm hover:shadow active:bg-rose-800 focus-visible:ring-rose-500',
  ghost: 'hover:bg-indigo-50/60 text-slate-600 hover:text-[#6355ec] active:bg-indigo-100 focus-visible:ring-indigo-400',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow active:bg-emerald-800 focus-visible:ring-emerald-500',
  cyan: 'bg-[#00d2d3] hover:bg-[#00b8b9] text-slate-950 font-bold shadow-sm hover:shadow active:bg-[#009e9f] focus-visible:ring-cyan-400'
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-2.5 text-base rounded-xl gap-2.5',
  pill: 'px-7 py-2.5 text-sm rounded-full gap-2'
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};
