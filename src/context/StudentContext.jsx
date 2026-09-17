import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { storage } from '../utils/storage';
import { StudentContext } from './studentContextDef';

const INITIAL_STUDENTS = [
  {
    id: 'std_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@stackly.edu',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Springfield, OR',
    qualification: 'Bachelor of Technology (CS)',
    enrollmentDate: '2026-01-15',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'std_02',
    name: 'Samantha Vance',
    email: 'samantha.v@stackly.edu',
    phone: '+1 (555) 876-5432',
    address: '1048 Elm Street, Dallas, TX',
    qualification: 'Master of Science (Data Analytics)',
    enrollmentDate: '2026-02-01',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'std_03',
    name: 'Liam Chen',
    email: 'liam.chen@stackly.edu',
    phone: '+1 (555) 345-6789',
    address: '88 King Street, Seattle, WA',
    qualification: 'Bachelor of Design (UI/UX)',
    enrollmentDate: '2026-02-18',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'std_04',
    name: 'Priya Sharma',
    email: 'priya.sharma@stackly.edu',
    phone: '+1 (555) 456-7890',
    address: '42 Lotus Parkway, Fremont, CA',
    qualification: 'Bachelor of Engineering (IT)',
    enrollmentDate: '2026-03-05',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'std_05',
    name: 'Noah Bennett',
    email: 'noah.b@stackly.edu',
    phone: '+1 (555) 567-8901',
    address: '320 Beacon St, Boston, MA',
    qualification: 'High School Diploma',
    enrollmentDate: '2026-03-12',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  },
  {
    id: 'std_06',
    name: 'Emily Watson',
    email: 'emily.w@stackly.edu',
    phone: '+1 (555) 678-9012',
    address: '512 Oak Ridge Rd, Boulder, CO',
    qualification: 'Master of Business (MBA)',
    enrollmentDate: '2026-04-02',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    status: 'Active'
  }
];


export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const cached = storage.get('lms_students');
    return cached && Array.isArray(cached) && cached.length > 0 ? cached : INITIAL_STUDENTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('All Qualifications');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    storage.set('lms_students', students);
  }, [students]);

  const addStudent = (studentData) => {
    const normalizedEmail = studentData.email.trim().toLowerCase();
    const emailExists = students.some((s) => s.email.toLowerCase() === normalizedEmail);

    if (emailExists) {
      toast.error('A student with this email address is already registered.');
      return { success: false, message: 'Email already exists' };
    }

    const newStudent = {
      ...studentData,
      id: `std_${Date.now()}`,
      avatar: studentData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(studentData.name)}`,
      status: 'Active'
    };

    const updated = [newStudent, ...students];
    setStudents(updated);
    storage.set('lms_students', updated);
    toast.success(`Student "${newStudent.name}" enrolled successfully!`);
    return { success: true, student: newStudent };
  };

  const updateStudent = (id, updatedData) => {
    const normalizedEmail = updatedData.email.trim().toLowerCase();
    const emailConflict = students.some((s) => s.id !== id && s.email.toLowerCase() === normalizedEmail);

    if (emailConflict) {
      toast.error('Another student already uses this email address.');
      return { success: false, message: 'Email already exists' };
    }

    const updated = students.map((s) => (s.id === id ? { ...s, ...updatedData } : s));
    setStudents(updated);
    storage.set('lms_students', updated);
    toast.success(`Student "${updatedData.name}" updated successfully!`);
    return { success: true };
  };

  const deleteStudent = (id) => {
    const studentToDelete = students.find((s) => s.id === id);
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    storage.set('lms_students', updated);
    toast.success(`Student "${studentToDelete?.name || id}" removed successfully.`);
    return { success: true };
  };

  const getStudentById = (id) => {
    return students.find((s) => s.id === id);
  };

  const resetToDefaultStudents = () => {
    setStudents(INITIAL_STUDENTS);
    storage.set('lms_students', INITIAL_STUDENTS);
    toast.info('Reset student registry to initial seed data.');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedQualification('All Qualifications');
    setCurrentPage(1);
  };

  // Filtered students
  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q) ||
          s.qualification.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      );
    }

    if (selectedQualification && selectedQualification !== 'All Qualifications') {
      result = result.filter(
        (s) => s.qualification.toLowerCase() === selectedQualification.toLowerCase()
      );
    }

    return result;
  }, [students, searchQuery, selectedQualification]);

  // Paginated slice
  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / itemsPerPage));

  return (
    <StudentContext.Provider
      value={{
        students,
        filteredStudents,
        paginatedStudents,
        totalPages,
        currentPage,
        itemsPerPage,
        searchQuery,
        selectedQualification,
        setSearchQuery: (val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        },
        setSelectedQualification: (val) => {
          setSelectedQualification(val);
          setCurrentPage(1);
        },
        setCurrentPage,
        setItemsPerPage,
        resetFilters,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudentById,
        resetToDefaultStudents
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
