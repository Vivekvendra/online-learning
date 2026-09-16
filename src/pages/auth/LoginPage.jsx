import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const LoginPage = () => {
  const { login, loading, demoUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true
    }
  });

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password, data.rememberMe);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  const fillDemoCredentials = (index = 0) => {
    const demo = demoUsers[index] || demoUsers[0];
    setValue('email', demo.email, { shouldValidate: true });
    setValue('password', demo.password, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Stackly<span className="text-indigo-400">LMS</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Sign in to access your courses, stats, and dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100/10">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome Back</h2>
          <p className="text-xs text-slate-500 mb-6">Enter your email and password to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@domain.com"
              icon={Mail}
              required
              error={errors.email?.message}
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address'
                }
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              showPasswordToggle
              required
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  {...register('rememberMe')}
                />
                <span>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Dashboard
            </Button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                1-Click Demo Login
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials(0)}
                className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-[11px] font-medium text-slate-700 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Admin/Instructor</div>
                <div className="text-slate-400 truncate">admin@stackly.edu</div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials(1)}
                className="py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-[11px] font-medium text-slate-700 text-left transition-colors cursor-pointer"
              >
                <div className="font-bold text-slate-900">Student</div>
                <div className="text-slate-400 truncate">alex.rivera@stackly.edu</div>
              </button>
            </div>
          </div>

          {/* Register Prompt */}
          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
              Create an account
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Protected by Stackly LMS Security & Local Storage Sync
        </p>
      </div>
    </div>
  );
};
