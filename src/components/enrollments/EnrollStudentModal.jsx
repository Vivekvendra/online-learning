import { useState } from 'react';
import { toast } from 'react-toastify';
import { useEnrollments } from '../../hooks/useEnrollments';
import { useStudents } from '../../hooks/useStudents';
import { useCourses } from '../../hooks/useCourses';

export function EnrollStudentModal({ isOpen, onClose, prefillStudentId }) {
  const { enrollStudent } = useEnrollments();
  const { students } = useStudents();
  const { courses } = useCourses();

  const [studentId, setStudentId] = useState(() => prefillStudentId || '');
  const [courseId, setCourseId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [lastIsOpen, setLastIsOpen] = useState(isOpen);

  if (isOpen !== lastIsOpen) {
    setLastIsOpen(isOpen);
    if (isOpen) {
      setStudentId(prefillStudentId || '');
      setCourseId('');
    }
  }

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !courseId) {
      toast.error('Please select both a student and a course.');
      return;
    }
    setSubmitting(true);
    const student = students.find((s) => s.id === studentId);
    const course = courses.find((c) => String(c.id) === courseId);
    enrollStudent({
      studentId,
      studentName: student?.name || '',
      studentEmail: student?.email || '',
      courseId,
      courseName: course?.title || '',
      courseCategory: course?.category || '',
      courseThumbnail: course?.thumbnail || '',
    });
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6355ec] to-[#8b7ff5] px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Enroll Student</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-white/70 text-sm mt-1">Assign a student to a course</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Student Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6355ec]/40 focus:border-[#6355ec] text-sm"
            >
              <option value="">— Select a student —</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.email})
                </option>
              ))}
            </select>
          </div>

          {/* Course Select */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#6355ec]/40 focus:border-[#6355ec] text-sm"
            >
              <option value="">— Select a course —</option>
              {courses.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Course preview */}
          {courseId && (() => {
            const c = courses.find((x) => String(x.id) === courseId);
            if (!c) return null;
            return (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100">
                <img
                  src={c.thumbnail || `https://picsum.photos/seed/${c.id}/60/40`}
                  alt={c.title}
                  className="w-14 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{c.title}</p>
                  <p className="text-xs text-gray-500">{c.category} · {c.instructor}</p>
                </div>
              </div>
            );
          })()}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#6355ec] text-white text-sm font-semibold hover:bg-[#5244dc] disabled:opacity-50 transition-colors"
            >
              {submitting ? 'Enrolling…' : 'Enroll Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
