import { useState, useMemo } from 'react';
import { useEnrollments } from '../../hooks/useEnrollments';
import { EnrollStudentModal } from '../../components/enrollments/EnrollStudentModal';

const STATUS_COLORS = {
  active: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-blue-100 text-blue-700',
  paused: 'bg-amber-100 text-amber-700',
  dropped: 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = ['all', 'active', 'completed', 'paused', 'dropped'];

export function EnrollmentListPage() {
  const { enrollments, removeEnrollment, updateEnrollmentStatus } = useEnrollments();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const filtered = useMemo(() => {
    let list = enrollments;
    if (statusFilter !== 'all') list = list.filter((e) => e.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.studentName.toLowerCase().includes(q) ||
          e.courseName.toLowerCase().includes(q) ||
          e.studentEmail.toLowerCase().includes(q)
      );
    }
    return list;
  }, [enrollments, search, statusFilter]);

  // Summary metrics
  const total = enrollments.length;
  const active = enrollments.filter((e) => e.status === 'active').length;
  const completed = enrollments.filter((e) => e.status === 'completed').length;
  const paused = enrollments.filter((e) => e.status === 'paused').length;

  const metrics = [
    { label: 'Total Enrollments', value: total, color: 'from-[#6355ec] to-[#8b7ff5]', icon: '📋' },
    { label: 'Active', value: active, color: 'from-emerald-400 to-emerald-600', icon: '✅' },
    { label: 'Completed', value: completed, color: 'from-blue-400 to-blue-600', icon: '🎓' },
    { label: 'Paused', value: paused, color: 'from-amber-400 to-amber-500', icon: '⏸️' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Enrollments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage student course enrollments</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6355ec] text-white rounded-xl font-semibold text-sm hover:bg-[#5244dc] transition-colors shadow-md shadow-[#6355ec]/30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Enroll Student
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className={`bg-gradient-to-br ${m.color} rounded-2xl p-5 text-white`}>
            <div className="text-3xl mb-2">{m.icon}</div>
            <div className="text-3xl font-bold">{m.value}</div>
            <div className="text-sm text-white/80 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search student or course…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6355ec]/30 focus:border-[#6355ec]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-[#6355ec] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Enrolled</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-3">📭</div>
                    <p className="font-medium">No enrollments found</p>
                    <p className="text-sm mt-1">Try adjusting your filters</p>
                  </td>
                </tr>
              ) : (
                filtered.map((enr) => (
                  <tr key={enr.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6355ec] to-[#00d2d3] flex items-center justify-center text-white font-bold text-sm">
                          {enr.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-800">{enr.studentName}</p>
                          <p className="text-xs text-gray-400">{enr.studentEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{enr.courseName}</p>
                      <p className="text-xs text-gray-400">{enr.courseCategory}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-600">{enr.enrollmentDate}</p>
                      {enr.completedDate && (
                        <p className="text-xs text-gray-400">Done: {enr.completedDate}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 min-w-[60px]">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-[#6355ec] to-[#00d2d3] transition-all"
                            style={{ width: `${enr.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 font-medium w-8">{enr.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={enr.status}
                        onChange={(e) => updateEnrollmentStatus(enr.id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-0 cursor-pointer ${STATUS_COLORS[enr.status] || 'bg-gray-100 text-gray-600'}`}
                      >
                        {['active', 'completed', 'paused', 'dropped'].map((s) => (
                          <option key={s} value={s} className="bg-white text-gray-800 font-normal capitalize">
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setConfirmId(enr.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Delete */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm mx-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Remove Enrollment?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { removeEnrollment(confirmId); setConfirmId(null); }}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <EnrollStudentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
