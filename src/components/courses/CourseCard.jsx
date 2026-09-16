import { Link } from 'react-router-dom';
import { Clock, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { formatCurrency } from '../../utils/formatters';
import { useCourses } from '../../hooks/useCourses';

export const CourseCard = ({ course, onEdit, onDelete }) => {
  const { isEnrolled, toggleEnroll } = useCourses();
  const enrolled = isEnrolled(course.id);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="indigo">{course.category}</Badge>
          <Badge>{course.level}</Badge>
        </div>

        {enrolled && (
          <div className="absolute top-3 right-3 z-10 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Enrolled</span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-white/95 backdrop-blur-xs text-slate-900 text-sm font-black px-2.5 py-1 rounded-lg shadow-md border border-white/20">
            {formatCurrency(course.price)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} />
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {course.duration}
          </span>
        </div>

        <Link to={`/courses/${course.id}`} className="group-hover:text-indigo-600 transition-colors">
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
            {course.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2.5">
          <img
            src={course.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
            alt={course.instructor}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Instructor</span>
            <span className="text-xs font-semibold text-slate-700 truncate block">
              {course.instructor}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(course)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
              title="Edit Course"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(course)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Delete Course"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/courses/${course.id}`}>
              <Button size="sm" variant="outline" className="text-xs py-1.5 px-3">
                Details
              </Button>
            </Link>
            <Button
              size="sm"
              variant={enrolled ? 'success' : 'primary'}
              className="text-xs py-1.5 px-3"
              onClick={() => toggleEnroll(course.id)}
            >
              {enrolled ? 'Enrolled' : 'Enroll'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
