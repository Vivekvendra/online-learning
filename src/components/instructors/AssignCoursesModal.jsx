import { useState } from 'react';
import { useInstructors } from '../../hooks/useInstructors';
import { useCourses } from '../../hooks/useCourses';

export function AssignCoursesModal({ isOpen, onClose, instructor }) {
  const { assignCourses } = useInstructors();
  const { courses } = useCourses();
  const [selected, setSelected] = useState([]);

  const [lastInstructor, setLastInstructor] = useState(instructor);
  const [lastIsOpen, setLastIsOpen] = useState(isOpen);

  if (isOpen !== lastIsOpen || instructor !== lastInstructor) {
    setLastIsOpen(isOpen);
    setLastInstructor(instructor);
    if (isOpen && instructor) setSelected(instructor.assignedCourseIds || []);
  }

  if (!isOpen || !instructor) return null;

  const toggle = (id) => {
    const sid = String(id);
    setSelected((prev) => prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid]);
  };

  const handleSave = () => {
    assignCourses(instructor.id, selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden">
        <div className="bg-gradient-to-r from-[#6355ec] to-[#8b7ff5] px-6 py-5 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Assign Courses</h2>
              <p className="text-white/70 text-sm mt-0.5">{instructor.name}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {courses.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">📚</p>
              <p>No courses available</p>
            </div>
          ) : (
            courses.map((course) => {
              const isSelected = selected.includes(String(course.id));
              return (
                <label
                  key={course.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected ? 'border-[#6355ec] bg-purple-50' : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(course.id)}
                    className="w-4 h-4 accent-[#6355ec] rounded"
                  />
                  <img
                    src={course.thumbnail || `https://picsum.photos/seed/${course.id}/48/32`}
                    alt={course.title}
                    className="w-12 h-8 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{course.title}</p>
                    <p className="text-xs text-gray-400">{course.category}</p>
                  </div>
                  {isSelected && (
                    <span className="text-xs font-semibold text-[#6355ec] bg-purple-100 px-2 py-0.5 rounded-full">Assigned</span>
                  )}
                </label>
              );
            })
          )}
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">{selected.length} course{selected.length !== 1 ? 's' : ''} selected</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2.5 bg-[#6355ec] text-white rounded-xl text-sm font-semibold hover:bg-[#5244dc] transition-colors">
              Save Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
