export const COURSE_CATEGORIES = [
  'All',
  'Web Development',
  'Data Science',
  'Mobile Development',
  'UI/UX Design',
  'Cloud Computing',
  'Cyber Security',
  'Artificial Intelligence',
  'Business & Marketing'
];

export const COURSE_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced'
];

export const SORT_OPTIONS = [
  { label: 'Course Name (A-Z)', value: 'name-asc' },
  { label: 'Course Name (Z-A)', value: 'name-desc' },
  { label: 'Rating (High to Low)', value: 'rating-desc' },
  { label: 'Price (Low to High)', value: 'price-asc' },
  { label: 'Price (High to Low)', value: 'price-desc' },
  { label: 'Duration (Shortest)', value: 'duration-asc' }
];

export const DEMO_USERS = [
  {
    id: 'usr_admin_01',
    name: 'Dr. Sarah Jenkins',
    email: 'admin@stackly.edu',
    password: 'Password@123',
    role: 'Instructor / Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Lead Instructor & Dean of Tech'
  },
  {
    id: 'usr_student_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@stackly.edu',
    password: 'Password@123',
    role: 'Student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    title: 'Computer Science Undergraduate'
  }
];

export const INITIAL_COURSES = [
  {
    id: 1,
    name: 'Full-Stack Web Development Bootcamp (React & Node.js)',
    instructor: 'David Miller',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Web Development',
    duration: '48 hours',
    level: 'Beginner',
    price: 89.99,
    rating: 4.8,
    reviewsCount: 3420,
    thumbnail: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=600&auto=format&fit=crop&q=80',
    description: 'Master modern frontend and backend development from scratch. Build real-world portfolio projects using React 19, Node.js, Express, Tailwind CSS, and REST APIs.',
    enrolledStudents: 1240,
    lessonsCount: 64,
    lastUpdated: '2026-08-15'
  },
  {
    id: 2,
    name: 'Data Science & Machine Learning with Python Masterclass',
    instructor: 'Dr. Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    category: 'Data Science',
    duration: '56 hours',
    level: 'Intermediate',
    price: 94.99,
    rating: 4.9,
    reviewsCount: 2890,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    description: 'Deep dive into data analysis, statistical modeling, Pandas, NumPy, Scikit-Learn, and building production machine learning models with real enterprise datasets.',
    enrolledStudents: 980,
    lessonsCount: 78,
    lastUpdated: '2026-08-20'
  },
  {
    id: 3,
    name: 'Modern UI/UX Design System with Figma & Prototyping',
    instructor: 'Jessica Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    category: 'UI/UX Design',
    duration: '32 hours',
    level: 'Beginner',
    price: 69.99,
    rating: 4.7,
    reviewsCount: 1750,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    description: 'Learn wireframing, typography, color harmony, responsive design systems, micro-interactions, and high-fidelity clickable prototypes in Figma.',
    enrolledStudents: 850,
    lessonsCount: 45,
    lastUpdated: '2026-07-28'
  },
  {
    id: 4,
    name: 'Cloud Computing & DevOps: AWS, Docker & Kubernetes',
    instructor: 'Marcus Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'Cloud Computing',
    duration: '42 hours',
    level: 'Advanced',
    price: 109.99,
    rating: 4.9,
    reviewsCount: 1980,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    description: 'Architect scalable cloud solutions on AWS. Build automated CI/CD pipelines, containerize microservices with Docker, and orchestrate with Kubernetes.',
    enrolledStudents: 690,
    lessonsCount: 52,
    lastUpdated: '2026-09-01'
  },
  {
    id: 5,
    name: 'Cyber Security Essentials & Ethical Hacking',
    instructor: 'Vikram Singh',
    instructorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    category: 'Cyber Security',
    duration: '38 hours',
    level: 'Intermediate',
    price: 84.99,
    rating: 4.6,
    reviewsCount: 1420,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    description: 'Understand network security, cryptography, vulnerability scanning, penetration testing techniques, and best defense practices for modern digital infrastructures.',
    enrolledStudents: 610,
    lessonsCount: 48,
    lastUpdated: '2026-08-10'
  },
  {
    id: 6,
    name: 'Generative AI & LLM Application Engineering',
    instructor: 'Sophia Williams',
    instructorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    category: 'Artificial Intelligence',
    duration: '35 hours',
    level: 'Advanced',
    price: 119.99,
    rating: 4.95,
    reviewsCount: 3100,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    description: 'Build production AI applications using OpenAI, Gemini, LangChain, vector databases, RAG architecture, and agentic workflows.',
    enrolledStudents: 1420,
    lessonsCount: 44,
    lastUpdated: '2026-09-05'
  },
  {
    id: 7,
    name: 'Cross-Platform Mobile App Development with React Native',
    instructor: 'Lucas Martin',
    instructorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    category: 'Mobile Development',
    duration: '40 hours',
    level: 'Intermediate',
    price: 79.99,
    rating: 4.7,
    reviewsCount: 1210,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
    description: 'Ship native iOS and Android apps with a single React Native codebase. Learn Expo, native device sensors, push notifications, and App Store publishing.',
    enrolledStudents: 540,
    lessonsCount: 50,
    lastUpdated: '2026-07-15'
  },
  {
    id: 8,
    name: 'Digital Marketing & Growth Strategy for Tech Leaders',
    instructor: 'Rachel Adams',
    instructorAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    category: 'Business & Marketing',
    duration: '26 hours',
    level: 'Beginner',
    price: 59.99,
    rating: 4.5,
    reviewsCount: 880,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    description: 'Drive organic acquisition and paid conversions. Master SEO, content marketing funnels, performance analytics, and retention mechanics.',
    enrolledStudents: 430,
    lessonsCount: 36,
    lastUpdated: '2026-08-01'
  }
];
