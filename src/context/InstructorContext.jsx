import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { InstructorContext } from './instructorContextDef';

const LS_KEY = 'lms_instructors';


const INITIAL_INSTRUCTORS = [
  {
    id: 'ins-001',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@stackly.edu',
    phone: '+1-555-0101',
    experience: 8,
    specialization: 'Web Development',
    profileImage: 'https://i.pravatar.cc/150?img=47',
    bio: 'Full-stack developer with 8+ years of industry experience. Passionate about teaching modern web technologies and best practices.',
    qualification: 'PhD in Computer Science, MIT',
    rating: 4.9,
    totalCourses: 5,
    totalStudents: 1240,
    assignedCourseIds: ['1', '3'],
    joinDate: '2022-01-15',
    status: 'active',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  {
    id: 'ins-002',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@stackly.edu',
    phone: '+1-555-0102',
    experience: 12,
    specialization: 'Data Science',
    profileImage: 'https://i.pravatar.cc/150?img=33',
    bio: 'Data scientist and researcher with expertise in machine learning and statistical analysis. Former lead scientist at Google.',
    qualification: 'MSc in Data Science, Stanford',
    rating: 4.8,
    totalCourses: 7,
    totalStudents: 2300,
    assignedCourseIds: ['2', '5'],
    joinDate: '2021-06-10',
    status: 'active',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  },
  {
    id: 'ins-003',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@stackly.edu',
    phone: '+1-555-0103',
    experience: 5,
    specialization: 'UI/UX Design',
    profileImage: 'https://i.pravatar.cc/150?img=5',
    bio: 'UX designer with a background in psychology and human-computer interaction. Loves creating intuitive and beautiful user experiences.',
    qualification: 'BFA in Graphic Design, RISD',
    rating: 4.7,
    totalCourses: 3,
    totalStudents: 860,
    assignedCourseIds: ['4'],
    joinDate: '2023-03-20',
    status: 'active',
    linkedin: 'https://linkedin.com',
    twitter: null,
  },
  {
    id: 'ins-004',
    name: 'James Wilson',
    email: 'james.wilson@stackly.edu',
    phone: '+1-555-0104',
    experience: 10,
    specialization: 'DevOps',
    profileImage: 'https://i.pravatar.cc/150?img=15',
    bio: 'Cloud architect and DevOps engineer. Expert in AWS, Docker, Kubernetes and CI/CD pipelines.',
    qualification: 'BSc in Software Engineering, CMU',
    rating: 4.6,
    totalCourses: 4,
    totalStudents: 970,
    assignedCourseIds: [],
    joinDate: '2022-09-01',
    status: 'inactive',
    linkedin: 'https://linkedin.com',
    twitter: null,
  },
];

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_INSTRUCTORS;
  } catch {
    return INITIAL_INSTRUCTORS;
  }
}

function save(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function InstructorProvider({ children }) {
  const [instructors, setInstructors] = useState(load);

  const addInstructor = useCallback((data) => {
    setInstructors((prev) => {
      const exists = prev.some((i) => i.email.toLowerCase() === data.email.toLowerCase());
      if (exists) { toast.error('An instructor with this email already exists.'); return prev; }
      const instructor = {
        id: `ins-${Date.now()}`,
        ...data,
        rating: 0,
        totalCourses: 0,
        totalStudents: 0,
        assignedCourseIds: [],
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active',
      };
      const updated = [instructor, ...prev];
      save(updated);
      toast.success(`Instructor ${data.name} added!`);
      return updated;
    });
  }, []);

  const updateInstructor = useCallback((id, data) => {
    setInstructors((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, ...data } : i));
      save(updated);
      toast.success('Instructor updated!');
      return updated;
    });
  }, []);

  const deleteInstructor = useCallback((id) => {
    setInstructors((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      save(updated);
      toast.success('Instructor removed.');
      return updated;
    });
  }, []);

  const assignCourses = useCallback((id, courseIds) => {
    setInstructors((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, assignedCourseIds: courseIds, totalCourses: courseIds.length } : i
      );
      save(updated);
      toast.success('Courses assigned!');
      return updated;
    });
  }, []);

  const toggleStatus = useCallback((id) => {
    setInstructors((prev) => {
      const updated = prev.map((i) =>
        i.id === id ? { ...i, status: i.status === 'active' ? 'inactive' : 'active' } : i
      );
      save(updated);
      toast.success('Status updated.');
      return updated;
    });
  }, []);

  return (
    <InstructorContext.Provider value={{ instructors, addInstructor, updateInstructor, deleteInstructor, assignCourses, toggleStatus }}>
      {children}
    </InstructorContext.Provider>
  );
}
