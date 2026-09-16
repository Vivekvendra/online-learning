import api from './api';
import { INITIAL_COURSES, COURSE_CATEGORIES } from '../utils/constants';

// Helper to map DummyJSON product items to LMS Course structure
const mapProductToCourse = (product, index) => {
  const categories = COURSE_CATEGORIES.filter((c) => c !== 'All');
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const instructors = [
    'Dr. Elena Rostova',
    'David Miller',
    'Jessica Chen',
    'Marcus Vance',
    'Sophia Williams',
    'Vikram Singh',
    'Lucas Martin',
    'Rachel Adams'
  ];

  const category = categories[index % categories.length];
  const level = levels[index % levels.length];
  const instructor = instructors[index % instructors.length];
  const duration = `${20 + (index * 6) % 40} hours`;

  return {
    id: Number(product.id),
    name: product.title,
    instructor: instructor,
    instructorAvatar: `https://images.unsplash.com/photo-${1500000000000 + (index * 887654) % 100000000}?w=150&auto=format&fit=crop&q=80`,
    category: category,
    duration: duration,
    level: level,
    price: Number(product.price) || 49.99,
    rating: Number(product.rating) || 4.5,
    reviewsCount: Math.floor(product.stock * 15 + 120),
    thumbnail: product.thumbnail || product.images?.[0] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    description: product.description || 'Comprehensive online training course designed by industry practitioners to help you build production-ready skills.',
    enrolledStudents: Math.floor(product.stock * 12 + 85),
    lessonsCount: Math.floor(product.stock / 2) + 24,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
};

export const courseService = {
  // Fetch courses from DummyJSON API with fallback to initial courses
  fetchCourses: async () => {
    try {
      const response = await api.get('/products?limit=12&skip=0');
      if (response.data && Array.isArray(response.data.products)) {
        const apiCourses = response.data.products.map(mapProductToCourse);
        // Combine our custom enriched curated courses with API courses
        const combined = [...INITIAL_COURSES];
        apiCourses.forEach((ac) => {
          if (!combined.some((c) => c.id === ac.id)) {
            combined.push(ac);
          }
        });
        return combined;
      }
      return INITIAL_COURSES;
    } catch (error) {
      console.warn('DummyJSON API unreachable, using local courses fallback:', error.message);
      return INITIAL_COURSES;
    }
  },

  // Search courses via DummyJSON search endpoint
  searchCourses: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
      if (response.data && Array.isArray(response.data.products)) {
        return response.data.products.map(mapProductToCourse);
      }
      return [];
    } catch (error) {
      console.error('API search failed:', error.message);
      return [];
    }
  },

  // Add course via DummyJSON API (POST /products/add)
  addCourse: async (courseData) => {
    try {
      const response = await api.post('/products/add', {
        title: courseData.name,
        description: courseData.description,
        price: courseData.price,
        rating: courseData.rating,
        category: courseData.category
      });
      return {
        ...courseData,
        id: response.data?.id ? Number(response.data.id) + Date.now() : Date.now()
      };
    } catch (error) {
      console.warn('API post failed, using local generation:', error.message);
      return {
        ...courseData,
        id: Date.now()
      };
    }
  },

  // Update course via DummyJSON API (PUT /products/:id)
  updateCourse: async (id, courseData) => {
    try {
      await api.put(`/products/${id}`, {
        title: courseData.name,
        description: courseData.description,
        price: courseData.price
      });
      return courseData;
    } catch (error) {
      console.warn('API put failed, updating locally:', error.message);
      return courseData;
    }
  },

  // Delete course via DummyJSON API (DELETE /products/:id)
  deleteCourse: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return true;
    } catch (error) {
      console.warn('API delete failed, proceeding locally:', error.message);
      return true;
    }
  }
};
