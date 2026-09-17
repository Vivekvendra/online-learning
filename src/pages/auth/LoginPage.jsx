import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Facebook, Linkedin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LoginIllustration } from '../../components/auth/LoginIllustration';

export const LoginPage = () => {
  const { login, loading, demoUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    const res = await login(data.email, data.password);
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
    <div className="min-h-screen w-full flex items-center justify-center bg-[#6355ec] p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Playful geometric shapes in background */}
      <div className="absolute top-10 left-12 w-8 h-8 text-[#00d2d3] opacity-80 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>

      <div className="absolute bottom-20 left-10 w-28 h-28 rounded-full bg-white/10 blur-sm pointer-events-none" />
      <div className="absolute top-1/2 left-6 w-6 h-6 text-[#00d2d3] opacity-70 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>

      <div className="absolute top-16 right-1/4 w-7 h-7 rounded-full bg-white/20 pointer-events-none" />
      <div className="absolute bottom-16 right-16 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

      {/* Decorative dot matrix pattern */}
      <div className="absolute top-20 left-10 opacity-30 pointer-events-none grid grid-cols-4 gap-2.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>

      <div className="absolute bottom-12 right-12 opacity-30 pointer-events-none grid grid-cols-6 gap-2">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
        ))}
      </div>

      {/* MAIN WHITE CONTAINER CARD */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl shadow-indigo-950/30 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[620px]">
        {/* Top Header inside card */}
        <div className="flex items-center justify-between pb-6 sm:pb-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
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

          {/* Register Button in Top Right */}
          <Link
            to="/register"
            className="px-6 py-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#6355ec] border border-slate-200 hover:border-[#6355ec] rounded-full transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Middle content: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
          {/* Left Column: Form */}
          <div className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0">
            {/* Title & Social Login row */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-800">
                Login to your account
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Login with</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title="Sign in with Facebook"
                    className="w-7 h-7 rounded-full bg-slate-300 hover:bg-[#6355ec] text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
                  >
                    <Facebook className="w-3.5 h-3.5 fill-current" />
                  </button>
                  <button
                    type="button"
                    title="Sign in with Google"
                    className="w-7 h-7 rounded-full bg-slate-300 hover:bg-[#6355ec] text-white flex items-center justify-center transition-colors cursor-pointer text-xs font-bold font-serif"
                  >
                    G
                  </button>
                  <button
                    type="button"
                    title="Sign in with LinkedIn"
                    className="w-7 h-7 rounded-full bg-slate-300 hover:bg-[#6355ec] text-white flex items-center justify-center transition-colors cursor-pointer text-xs"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full px-5 py-3.5 rounded-xl bg-[#f8f9fd] border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec] focus:bg-white transition-all ${
                    errors.email ? 'border-rose-300 bg-rose-50/20' : 'border-slate-100 hover:border-slate-200'
                  }`}
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-rose-500 font-medium pl-2">{errors.email.message}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={`w-full px-5 py-3.5 pr-11 rounded-xl bg-[#f8f9fd] border text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec] focus:bg-white transition-all ${
                    errors.password ? 'border-rose-300 bg-rose-50/20' : 'border-slate-100 hover:border-slate-200'
                  }`}
                  {...register('password', {
                    required: 'Please enter your password'
                  })}
                />
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-xs text-rose-500 font-medium pl-2">{errors.password.message}</p>
                )}
              </div>

              {/* Actions row: Forgot password & Log In pill */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/forgot-password"
                  className="text-xs text-slate-400 hover:text-[#6355ec] transition-colors"
                >
                  Forgot password?
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 rounded-full bg-[#6355ec] hover:bg-[#5244dc] text-white text-sm font-semibold shadow-md shadow-indigo-500/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </button>
              </div>
            </form>

            {/* Quick Demo Credentials Autofill */}
            <div className="mt-8 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d2d3]" />
                  1-Click Demo Fill
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials(0)}
                  className="py-2 px-3 rounded-xl bg-[#f8f9fd] hover:bg-purple-50 hover:border-[#6355ec] border border-slate-100 text-[11px] font-semibold text-slate-700 text-left transition-colors cursor-pointer"
                >
                  <div className="font-bold text-slate-900">Admin/Instructor</div>
                  <div className="text-slate-400 truncate text-[10px]">admin@stackly.edu</div>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials(1)}
                  className="py-2 px-3 rounded-xl bg-[#f8f9fd] hover:bg-purple-50 hover:border-[#6355ec] border border-slate-100 text-[11px] font-semibold text-slate-700 text-left transition-colors cursor-pointer"
                >
                  <div className="font-bold text-slate-900">Student</div>
                  <div className="text-slate-400 truncate text-[10px]">alex.rivera@stackly.edu</div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Learning Desk Illustration */}
          <div className="lg:col-span-6 hidden lg:flex items-center justify-center">
            <LoginIllustration />
          </div>
        </div>

        {/* Bottom Bar inside card */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            © Copyright QLTSGeek 2026
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Term & Condition</span>
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Help</span>
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
