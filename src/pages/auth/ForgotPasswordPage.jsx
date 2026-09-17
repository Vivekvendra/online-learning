import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginIllustration } from '../../components/auth/LoginIllustration';

export const ForgotPasswordPage = () => {
  const { forgotPassword, loading } = useAuth();
  const [submittedEmail, setSubmittedEmail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { email: '' }
  });

  const onSubmit = async (data) => {
    await forgotPassword(data.email);
    setSubmittedEmail(data.email);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#6355ec] p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      <div className="absolute top-10 left-12 w-8 h-8 text-[#00d2d3] opacity-80 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <polygon points="12,2 22,22 2,22" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl shadow-indigo-950/30 p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[580px]">
        <div className="flex items-center justify-between pb-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full border-2 border-[#00d2d3] flex items-center justify-center">
              <span className="text-sm font-black text-[#6355ec]">G</span>
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-800">
              QLTS<span className="text-[#00d2d3]">Geek</span>
            </span>
          </Link>

          <Link
            to="/login"
            className="px-6 py-1.5 text-xs sm:text-sm font-semibold text-slate-500 hover:text-[#6355ec] border border-slate-200 hover:border-[#6355ec] rounded-full transition-colors"
          >
            Back to Login
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4">
          <div className="lg:col-span-6 max-w-md w-full mx-auto lg:mx-0">
            {submittedEmail ? (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <h2 className="text-xl font-black text-slate-800">Instructions Dispatched</h2>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We sent password reset guidance to <strong className="text-slate-800">{submittedEmail}</strong>. Check your inbox and follow the steps provided.
                </p>
                <div className="pt-2">
                  <Link
                    to="/login"
                    className="inline-block px-8 py-2.5 rounded-full bg-[#6355ec] hover:bg-[#5244dc] text-white text-sm font-semibold shadow-md transition-colors"
                  >
                    Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-black text-slate-800 mb-1">Reset Password</h2>
                <p className="text-xs text-slate-400 mb-6">Enter your registered email to receive reset instructions</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-5 py-3.5 rounded-xl bg-[#f8f9fd] border border-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6355ec]"
                      {...register('email', {
                        required: 'Please enter your email',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email required' }
                      })}
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link to="/login" className="text-xs text-slate-400 hover:text-[#6355ec]">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-2.5 rounded-full bg-[#6355ec] hover:bg-[#5244dc] text-white text-sm font-semibold shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 hidden lg:flex items-center justify-center">
            <LoginIllustration />
          </div>
        </div>

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
