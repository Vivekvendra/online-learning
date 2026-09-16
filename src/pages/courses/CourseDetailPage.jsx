import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Users,
  CheckCircle2,
  Edit2,
  Trash2,
  ShieldCheck,
  Award,
  Video
} from 'lucide-react';
import { useCourses } from '../../hooks/useCourses';
import { Badge } from '../../components/common/Badge';
import { RatingStars } from '../../components/common/RatingStars';
import { Button } from '../../components/common/Button';
import { CourseFormModal } from '../../components/courses/CourseFormModal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { formatCurrency } from '../../utils/formatters';

export const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById, updateCourse, deleteCourse, isEnrolled, toggleEnroll } = useCourses();

  const course = getCourseById(id);
  const enrolled = course ? isEnrolled(course.id) : false;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!course) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Course Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The course you requested does not exist or may have been removed.
        </p>
        <Link to="/courses">
          <Button variant="primary" icon={ArrowLeft}>
            Return to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const handleSaveEdit = async (formData) => {
    await updateCourse(course.id, formData);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    await deleteCourse(course.id);
    setIsDeleting(false);
    navigate('/courses');
  };

  const syllabus = [
    { title: 'Module 1: Fundamentals & Environment Setup', lessons: 8, duration: '4.5 hrs' },
    { title: 'Module 2: Core Architecture & Data Flow', lessons: 12, duration: '6.0 hrs' },
    { title: 'Module 3: Advanced Patterns & Optimization', lessons: 14, duration: '8.5 hrs' },
    { title: 'Module 4: Real-world Capstone Deployment', lessons: 10, duration: '7.0 hrs' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link to="/courses" className="hover:text-indigo-600 transition-colors">Courses</Link>
        <span>/</span>
        <span className="text-slate-800 truncate max-w-xs">{course.name}</span>
      </div>

      <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="indigo">{course.category}</Badge>
            <Badge>{course.level}</Badge>
            {enrolled && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Enrollment
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {course.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5 text-amber-400">
              <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} />
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              <span>{course.enrolledStudents || 120} learners enrolled</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <img
              src={course.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={course.instructor}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/50"
            />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Taught by</p>
              <p className="text-sm font-bold text-white">{course.instructor}</p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none scale-105"
          style={{ backgroundImage: `url(${course.thumbnail})` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 mb-2">Curriculum & Syllabus</h2>
            <p className="text-xs text-slate-500 mb-6">
              4 comprehensive modules • 44 interactive lessons • Certificate on completion
            </p>

            <div className="space-y-3">
              {syllabus.map((mod, i) => (
                <div
                  key={mod.title}
                  className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{mod.title}</h4>
                      <span className="text-xs text-slate-400">{mod.lessons} lessons</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{mod.duration}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h2 className="text-lg font-black text-slate-900 mb-4">About the Instructor</h2>
            <div className="flex items-start gap-4">
              <img
                src={course.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={course.instructor}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
              />
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">{course.instructor}</h3>
                <p className="text-xs text-indigo-600 font-semibold">Senior Faculty & Curriculum Director</p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Passionate educator and engineer with 10+ years of software architecture experience. Specializes in scalable system design, interactive pedagogy, and empowering global students with industry-relevant skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg space-y-6">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full aspect-video rounded-2xl object-cover shadow-xs"
            />

            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Enrollment Fee</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-slate-900">
                  {formatCurrency(course.price)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatCurrency(course.price * 1.5)}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                  33% OFF
                </span>
              </div>
            </div>

            <Button
              variant={enrolled ? 'success' : 'primary'}
              size="lg"
              className="w-full font-bold shadow-md shadow-indigo-600/20"
              onClick={() => toggleEnroll(course.id)}
            >
              {enrolled ? 'Enrolled (Access Classroom)' : 'Enroll Now'}
            </Button>

            <div className="space-y-2.5 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Full lifetime access to materials</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-indigo-500" />
                <span>{course.duration} on-demand video sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Verifiable Certificate of Completion</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>30-day money back guarantee</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 text-xs"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={Trash2}
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex-1 text-xs"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CourseFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmitCourse={handleSaveEdit}
        initialData={course}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${course.name}"? This action cannot be undone.`}
        confirmText="Delete Course"
        isLoading={isDeleting}
      />
    </div>
  );
};
