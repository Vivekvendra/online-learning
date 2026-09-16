import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const RegisterPage = () => {
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Stackly<span className="text-indigo-400">LMS</span>
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Create your account and start your learning journey
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100/10">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Create Account</h2>
          <p className="text-xs text-slate-500 mb-6">Enter your details to get started with Stackly LMS</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Alex Morgan"
              icon={User}
              required
              error={errors.name?.message}
              {...register('name', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' }
              })}
            />

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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                Select Your Role <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-500 transition-colors">
                  <input
                    type="radio"
                    value="Student"
                    className="text-indigo-600 focus:ring-indigo-500"
                    {...register('role')}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Student</div>
                    <div className="text-[10px] text-slate-400">Enroll & study</div>
                  </div>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 cursor-pointer hover:border-indigo-500 transition-colors">
                  <input
                    type="radio"
                    value="Instructor"
                    className="text-indigo-600 focus:ring-indigo-500"
                    {...register('role')}
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Instructor</div>
                    <div className="text-[10px] text-slate-400">Teach & publish</div>
                  </div>
                </label>
              </div>
            </div>

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

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              showPasswordToggle
              required
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === getValues('password') || 'Passwords do not match'
              })}
            />

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 mt-0.5"
                  {...register('terms', {
                    required: 'You must agree to the Terms of Service'
                  })}
                />
                <span>
                  I agree to the <span className="text-indigo-600 font-semibold hover:underline">Terms of Service</span> and <span className="text-indigo-600 font-semibold hover:underline">Privacy Policy</span>.
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-rose-600 font-medium">{errors.terms.message}</p>
              )}
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
              Complete Registration
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
