import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { EnrollmentContext } from './enrollmentContextDef';

const LS_KEY = 'lms_enrollments';

const INITIAL_ENROLLMENTS = [
  {
    id: 'enr-001',
    studentId: 'std-001',
    studentName: 'Alex Rivera',
    studentEmail: 'alex.rivera@stackly.edu',
    courseId: '1',
    courseName: 'Introduction to React',
    courseCategory: 'Web Development',
    courseThumbnail: 'https://i.pravatar.cc/300?img=11',
    enrollmentDate: '2024-01-15',
    status: 'active',
    progress: 65,
    completedDate: null,
  },
  {
    id: 'enr-002',
    studentId: 'std-002',
    studentName: 'Priya Sharma',
    studentEmail: 'priya.sharma@stackly.edu',
    courseId: '2',
    courseName: 'Advanced JavaScript',
    courseCategory: 'Programming',
    courseThumbnail: 'https://i.pravatar.cc/300?img=22',
    enrollmentDate: '2024-02-10',
    status: 'completed',
    progress: 100,
    completedDate: '2024-04-20',
  },
  {
    id: 'enr-003',
    studentId: 'std-003',
    studentName: 'Marco Chen',
    studentEmail: 'marco.chen@stackly.edu',
    courseId: '3',
    courseName: 'UI/UX Design Fundamentals',
    courseCategory: 'Design',
    courseThumbnail: 'https://i.pravatar.cc/300?img=33',
    enrollmentDate: '2024-03-05',
    status: 'paused',
    progress: 30,
    completedDate: null,
  },
  {
    id: 'enr-004',
    studentId: 'std-001',
    studentName: 'Alex Rivera',
    studentEmail: 'alex.rivera@stackly.edu',
    courseId: '4',
    courseName: 'Node.js Essentials',
    courseCategory: 'Backend',
    courseThumbnail: 'https://i.pravatar.cc/300?img=44',
    enrollmentDate: '2024-03-20',
    status: 'active',
    progress: 20,
    completedDate: null,
  },
];

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_ENROLLMENTS;
  } catch {
    return INITIAL_ENROLLMENTS;
  }
}

function save(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState(load);

  const enrollStudent = useCallback((payload) => {
    setEnrollments((prev) => {
      const duplicate = prev.find(
        (e) => e.studentId === payload.studentId && e.courseId === payload.courseId
      );
      if (duplicate) {
        toast.warning(`${payload.studentName} is already enrolled in this course.`);
        return prev;
      }
      const newEnrollment = {
        id: `enr-${Date.now()}`,
        ...payload,
        enrollmentDate: new Date().toISOString().split('T')[0],
        status: 'active',
        progress: 0,
        completedDate: null,
      };
      const updated = [newEnrollment, ...prev];
      save(updated);
      toast.success(`${payload.studentName} enrolled successfully!`);
      return updated;
    });
  }, []);

  const removeEnrollment = useCallback((id) => {
    setEnrollments((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      save(updated);
      toast.success('Enrollment removed.');
      return updated;
    });
  }, []);

  const updateEnrollmentStatus = useCallback((id, status) => {
    setEnrollments((prev) => {
      const updated = prev.map((e) => {
        if (e.id !== id) return e;
        return {
          ...e,
          status,
          completedDate: status === 'completed' ? new Date().toISOString().split('T')[0] : e.completedDate,
          progress: status === 'completed' ? 100 : e.progress,
        };
      });
      save(updated);
      toast.success('Enrollment status updated.');
      return updated;
    });
  }, []);

  const updateProgress = useCallback((id, progress) => {
    setEnrollments((prev) => {
      const updated = prev.map((e) =>
        e.id === id ? { ...e, progress: Math.min(100, Math.max(0, progress)) } : e
      );
      save(updated);
      return updated;
    });
  }, []);

  return (
    <EnrollmentContext.Provider
      value={{ enrollments, enrollStudent, removeEnrollment, updateEnrollmentStatus, updateProgress }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}
