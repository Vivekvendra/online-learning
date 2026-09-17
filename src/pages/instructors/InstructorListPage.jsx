import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useInstructors } from '../../hooks/useInstructors';
import { InstructorFormModal } from '../../components/instructors/InstructorFormModal';
import { AssignCoursesModal } from '../../components/instructors/AssignCoursesModal';

const STAR = (
  <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export function InstructorListPage() {
  const { instructors, deleteInstructor } = useInstructors();
  const [search, setSearch] = useState('');
  const [specFilter, setSpecFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [assignTarget, setAssignTarget] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const specializations = useMemo(() => {
    const set = new Set(instructors.map((i) => i.specialization));
    return ['all', ...set];
  }, [instructors]);

  const filtered = useMemo(() => {
    let list = instructors;
    if (statusFilter !== 'all') list = list.filter((i) => i.status === statusFilter);
    if (specFilter !== 'all') list = list.filter((i) => i.specialization === specFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) => i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || i.specialization.toLowerCase().includes(q));
    }
    return list;
  }, [instructors, search, specFilter, statusFilter]);

  const stats = [
    { label: 'Total Instructors', value: instructors.length, icon: '👨‍🏫', color: 'from-[#6355ec] to-[#8b7ff5]' },
    { label: 'Active', value: instructors.filter((i) => i.status === 'active').length, icon: '✅', color: 'from-emerald-400 to-emerald-600' },
    { label: 'Total Courses', value: instructors.reduce((s, i) => s + (i.totalCourses || 0), 0), icon: '📚', color: 'from-cyan-400 to-cyan-600' },
    { label: 'Total Students', value: instructors.reduce((s, i) => s + (i.totalStudents || 0), 0).toLocaleString(), icon: '🎓', color: 'from-amber-400 to-amber-500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructors</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your teaching staff</p>
        </div>
        <button
          onClick={() => { setEditTarget(null); setFormOpen(true); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6355ec] text-white rounded-xl font-semibold text-sm hover:bg-[#5244dc] transition-colors shadow-md shadow-[#6355ec]/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Instructor
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.color} rounded-2xl p-5 text-white`}>
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-white/80 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search instructors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6355ec]/30 focus:border-[#6355ec]"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${statusFilter === s ? 'bg-[#6355ec] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {specializations.map((s) => (
            <button key={s} onClick={() => setSpecFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${specFilter === s ? 'bg-[#6355ec]/10 text-[#6355ec] border border-[#6355ec]/30' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">👨‍🏫</div>
          <p className="font-medium text-gray-600">No instructors found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((ins) => (
            <div key={ins.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              {/* Card header */}
              <div className="h-20 bg-gradient-to-br from-[#6355ec]/20 via-[#8b7ff5]/10 to-[#00d2d3]/10 relative">
                <div className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${ins.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {ins.status}
                </div>
              </div>

              <div className="px-4 pb-4">
                {/* Avatar */}
                <div className="relative -mt-10 mb-3">
                  <img
                    src={ins.profileImage || `https://i.pravatar.cc/80?u=${ins.id}`}
                    alt={ins.name}
                    className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md"
                  />
                </div>

                <h3 className="font-bold text-gray-900 text-sm leading-tight">{ins.name}</h3>
                <p className="text-xs text-[#6355ec] font-semibold mt-0.5">{ins.specialization}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{ins.email}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {STAR}
                  <span className="text-xs font-bold text-gray-700">{ins.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-400">· {ins.experience}y exp</span>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-purple-50 rounded-xl p-2 text-center">
                    <p className="text-base font-bold text-[#6355ec]">{ins.totalCourses}</p>
                    <p className="text-[10px] text-gray-500">Courses</p>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-2 text-center">
                    <p className="text-base font-bold text-[#00d2d3]">{(ins.totalStudents || 0).toLocaleString()}</p>
                    <p className="text-[10px] text-gray-500">Students</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 mt-3">
                  <Link
                    to={`/instructors/${ins.id}`}
                    className="flex-1 text-center text-xs font-semibold px-2 py-2 bg-[#6355ec] text-white rounded-xl hover:bg-[#5244dc] transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { setEditTarget(ins); setFormOpen(true); }}
                    className="p-2 text-gray-500 hover:text-[#6355ec] hover:bg-purple-50 rounded-xl transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setAssignTarget(ins)}
                    className="p-2 text-gray-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-colors"
                    title="Assign Courses"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setConfirmId(ins.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Delete */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Instructor?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmId(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={() => { deleteInstructor(confirmId); setConfirmId(null); }} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      <InstructorFormModal isOpen={formOpen} onClose={() => { setFormOpen(false); setEditTarget(null); }} editInstructor={editTarget} />
      <AssignCoursesModal isOpen={Boolean(assignTarget)} onClose={() => setAssignTarget(null)} instructor={assignTarget} />
    </div>
  );
}
