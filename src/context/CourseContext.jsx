import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { courseService } from '../services/courseService';
import { storage } from '../utils/storage';
import { INITIAL_COURSES } from '../utils/constants';
import { CourseContext } from './courseContextDef';

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const cached = storage.get('lms_courses');
    return cached && Array.isArray(cached) && cached.length > 0 ? cached : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [enrolledIds, setEnrolledIds] = useState(() => {
    return storage.get('lms_enrolled_courses', [1, 2]);
  });

  useEffect(() => {
    if (courses.length > 0) {
      storage.set('lms_courses', courses);
    }
  }, [courses]);

  useEffect(() => {
    storage.set('lms_enrolled_courses', enrolledIds);
  }, [enrolledIds]);

  useEffect(() => {
    const loadInitialCourses = async () => {
      const cached = storage.get('lms_courses');
      if (!cached || cached.length === 0) {
        setLoading(true);
        try {
          const apiCourses = await courseService.fetchCourses();
          setCourses(apiCourses);
          storage.set('lms_courses', apiCourses);
          setError(null);
        } catch (err) {
          console.error('Failed to load courses:', err);
          setError('Failed to fetch courses from Third-Party API.');
          setCourses(INITIAL_COURSES);
        } finally {
          setLoading(false);
        }
      }
    };
    loadInitialCourses();
  }, []);

  const addCourse = async (newCourseData) => {
    setLoading(true);
    try {
      const created = await courseService.addCourse(newCourseData);
      const updated = [created, ...courses];
      setCourses(updated);
      storage.set('lms_courses', updated);
      toast.success(`Course "${created.name}" created successfully!`);
      return { success: true, course: created };
    } catch (err) {
      toast.error('Failed to add course.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id, updatedData) => {
    setLoading(true);
    try {
      const updated = await courseService.updateCourse(id, updatedData);
      const newCourses = courses.map((c) => (c.id === id ? { ...c, ...updated } : c));
      setCourses(newCourses);
      storage.set('lms_courses', newCourses);
      toast.success(`Course "${updated.name}" updated successfully!`);
      return { success: true, course: updated };
    } catch (err) {
      toast.error('Failed to update course.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    try {
      await courseService.deleteCourse(id);
      const courseToDelete = courses.find((c) => c.id === id);
      const remaining = courses.filter((c) => c.id !== id);
      setCourses(remaining);
      storage.set('lms_courses', remaining);
      toast.success(`Course "${courseToDelete?.name || id}" removed successfully.`);
      return { success: true };
    } catch (err) {
      toast.error('Failed to delete course.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = (id) => {
    const numId = Number(id);
    return courses.find((c) => c.id === numId || c.id === id);
  };

  const toggleEnroll = (id) => {
    const numId = Number(id);
    if (enrolledIds.includes(numId)) {
      const remaining = enrolledIds.filter((item) => item !== numId);
      setEnrolledIds(remaining);
      toast.info('You have unenrolled from this course.');
    } else {
      setEnrolledIds([...enrolledIds, numId]);
      toast.success('Congratulations! You have enrolled in this course.');
    }
  };

  const isEnrolled = (id) => {
    return enrolledIds.includes(Number(id));
  };

  const resetToDefaultCourses = () => {
    setCourses(INITIAL_COURSES);
    storage.set('lms_courses', INITIAL_COURSES);
    toast.info('Reset course catalog to standard seed data.');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(
        (c) => c.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedLevel && selectedLevel !== 'All') {
      result = result.filter(
        (c) => c.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCourses, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));

  return (
    <CourseContext.Provider
      value={{
        courses,
        filteredCourses,
        paginatedCourses,
        totalPages,
        currentPage,
        itemsPerPage,
        loading,
        error,
        searchQuery,
        selectedCategory,
        selectedLevel,
        sortBy,
        enrolledIds,
        setSearchQuery: (val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        },
        setSelectedCategory: (val) => {
          setSelectedCategory(val);
          setCurrentPage(1);
        },
        setSelectedLevel: (val) => {
          setSelectedLevel(val);
          setCurrentPage(1);
        },
        setSortBy,
        setCurrentPage,
        setItemsPerPage,
        resetFilters,
        addCourse,
        updateCourse,
        deleteCourse,
        getCourseById,
        toggleEnroll,
        isEnrolled,
        resetToDefaultCourses
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
