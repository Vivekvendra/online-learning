import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LoginIllustration } from '../../components/auth/LoginIllustration';

export const RegisterPage = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: 'Student',
      password: '',
      confirmPassword: '',
      terms: true
    }
  });

  const onSubmit = async (data) => {
    const res = await registerUser({
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password
    });
    if (res.success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#6355ec] p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-12 w-8 h-8 text-[#00d2d3] opacity-80 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 w-28 h-28 rounded-full bg-white/10 blur-sm pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl shadow-indigo-950/30 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[640px]">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full border-2 border-[#00d2d3] flex items-center justify-center">
              <span className="text-sm font-black text-[#6355ec]">G</span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#6355ec] rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
              QLTS<span className="text-[#00d2d3]">Geek</span>
            </span>
          </Link>

          <Link
            to="/login"
            className="px-6 py-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#6355ec] border border-slate-200 hover:border-[#6355ec] rounded-full transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* 2-Col Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2">
          <div className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0">
            <h2 className="text-xl font-black text-slate-800 mb-1">Create an account</h2>
            <p className="text-xs text-slate-400 mb-6">Join thousands of students and faculty members</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-5 py-3 rounded-xl bg-[#f8f9fd] border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec]"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-3 rounded-xl bg-[#f8f9fd] border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec]"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                  })}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
              </div>

              {/* Role selector pills */}
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-[#f8f9fd] cursor-pointer hover:border-[#6355ec] text-xs font-semibold text-slate-700">
                  <input type="radio" value="Student" className="text-[#6355ec]" {...register('role')} />
                  <span>Student</span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-[#f8f9fd] cursor-pointer hover:border-[#6355ec] text-xs font-semibold text-slate-700">
                  <input type="radio" value="Instructor" className="text-[#6355ec]" {...register('role')} />
                  <span>Instructor</span>
                </label>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password (min 6 chars)"
                  className="w-full px-5 py-3 pr-11 rounded-xl bg-[#f8f9fd] border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec]"
                  {...register('password', {
                    required: 'Password required',
                    minLength: { value: 6, message: 'Minimum 6 chars' }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-5 py-3 rounded-xl bg-[#f8f9fd] border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec]"
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: (v) => v === getValues('password') || 'Passwords do not match'
                  })}
                />
                {errors.confirmPassword && <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword.message}</p>}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
                  <input type="checkbox" className="rounded text-[#6355ec]" {...register('terms', { required: true })} />
                  <span>Agree to Terms</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 rounded-full bg-[#6355ec] hover:bg-[#5244dc] text-white text-sm font-semibold shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
                >
                  {loading ? 'Creating...' : 'Register'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-6 hidden lg:flex items-center justify-center">
            <LoginIllustration />
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>© Copyright QLTSGeek 2026</div>
          <div className="flex items-center gap-6">
            <span>Term & Condition</span>
            <span>Privacy Policy</span>
            <span>Help</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2d3]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#6355ec]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#93c5fd]" />
          </div>
        </div>
      </div>
    </div>
  );
};
