import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useInstructors } from '../../hooks/useInstructors';
import { useCourses } from '../../hooks/useCourses';
import { InstructorFormModal } from '../../components/instructors/InstructorFormModal';
import { AssignCoursesModal } from '../../components/instructors/AssignCoursesModal';

const STAR = (filled) => (
  <svg key={filled} className={`w-4 h-4 ${filled ? 'text-amber-400 fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export function InstructorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { instructors, toggleStatus } = useInstructors();
  const { courses } = useCourses();
  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);

  const instructor = instructors.find((i) => i.id === id);

  if (!instructor) {
    return (
      <div className="p-6 text-center py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Instructor not found</h2>
        <button onClick={() => navigate('/instructors')} className="mt-4 px-5 py-2.5 bg-[#6355ec] text-white rounded-xl font-semibold text-sm hover:bg-[#5244dc]">
          Back to Instructors
        </button>
      </div>
    );
  }

  const assignedCourses = courses.filter((c) => instructor.assignedCourseIds.includes(String(c.id)));
  const ratingStars = Array.from({ length: 5 }, (_, i) => STAR(i < Math.round(instructor.rating)));

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate('/instructors')}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#6355ec] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Instructors
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#6355ec] via-[#8b7ff5] to-[#00d2d3] relative">
          <div className="absolute inset-0 opacity-20 bg-white/10" />
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-4">
            <img
              src={instructor.profileImage || `https://i.pravatar.cc/120?u=${instructor.id}`}
              alt={instructor.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setEditOpen(true)} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit Profile
              </button>
              <button onClick={() => setAssignOpen(true)} className="px-4 py-2 bg-[#6355ec] text-white rounded-xl text-sm font-semibold hover:bg-[#5244dc] transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Assign Courses
              </button>
              <button
                onClick={() => toggleStatus(instructor.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${instructor.status === 'active' ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
              >
                {instructor.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>

          {/* Name & details */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{instructor.name}</h1>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${instructor.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {instructor.status}
                </span>
              </div>
              <p className="text-[#6355ec] font-semibold mt-1">{instructor.specialization}</p>
              <p className="text-gray-400 text-sm">{instructor.qualification}</p>
            </div>
            <div className="flex items-center gap-1">
              {ratingStars}
              <span className="text-sm font-bold text-gray-700 ml-1">{instructor.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed mt-4 p-4 bg-gray-50 rounded-xl">{instructor.bio}</p>

          {/* Info grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            {[
              { label: 'Experience', value: `${instructor.experience} years`, icon: '⏱️' },
              { label: 'Courses', value: instructor.totalCourses, icon: '📚' },
              { label: 'Students', value: (instructor.totalStudents || 0).toLocaleString(), icon: '🎓' },
              { label: 'Joined', value: instructor.joinDate, icon: '📅' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{item.icon}</div>
                <p className="font-bold text-gray-900 text-sm">{item.value}</p>
                <p className="text-xs text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-3 mt-4">
            <a href={`mailto:${instructor.email}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#6355ec] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {instructor.email}
            </a>
            {instructor.phone && (
              <a href={`tel:${instructor.phone}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#6355ec] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {instructor.phone}
              </a>
            )}
            {instructor.linkedin && (
              <a href={instructor.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                🔗 LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Assigned Courses */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Assigned Courses ({assignedCourses.length})</h2>
        {assignedCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
            <p className="text-4xl mb-2">📚</p>
            <p className="font-medium">No courses assigned yet</p>
            <button onClick={() => setAssignOpen(true)} className="mt-3 px-4 py-2 bg-[#6355ec] text-white rounded-xl text-sm font-semibold hover:bg-[#5244dc]">
              Assign Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={course.thumbnail || `https://picsum.photos/seed/${course.id}/320/180`}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-[#6355ec] font-semibold mt-1">{course.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <InstructorFormModal isOpen={editOpen} onClose={() => setEditOpen(false)} editInstructor={instructor} />
      <AssignCoursesModal isOpen={assignOpen} onClose={() => setAssignOpen(false)} instructor={instructor} />
    </div>
  );
}
