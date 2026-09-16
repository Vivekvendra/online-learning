import { Link } from 'react-router-dom';
import { Compass, Home, BookOpen } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 text-center">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xl space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <span className="text-4xl font-black text-slate-900 block tracking-tight">404</span>
        <h2 className="text-xl font-bold text-slate-800">Page Not Found</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          The curriculum page, lecture, or resource you are looking for does not exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link to="/dashboard" className="flex-1">
            <Button variant="primary" icon={Home} className="w-full text-xs">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/courses" className="flex-1">
            <Button variant="outline" icon={BookOpen} className="w-full text-xs">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
