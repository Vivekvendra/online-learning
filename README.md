# Stackly LMS - Online Learning Management System

A modern, responsive Online Learning Management System built with **React 19 (Vite)**, **Tailwind CSS**, **Context API**, **React Router v7**, **Axios**, **React Hook Form**, and **React Toastify**. Integrated with the **DummyJSON Third-Party API** and browser **Local Storage** for complete offline/online persistence.

---

## 🚀 Key Modules Implemented

### Module 1: Authentication
- **User Login**: Secure authentication with client-side validation, error handling, and session storage.
- **User Registration**: Form validation with password confirmation match, role selection (Student / Instructor), and automatic session initialization.
- **Forgot Password UI**: Clean recovery view that simulates password reset dispatch via toast notifications.
- **Form Validation**: Powered by `react-hook-form` with clear, accessible validation messages.
- **Password Show/Hide**: Interactive toggle button on password fields.
- **Protected Routes**: `<ProtectedRoute>` wrapper redirecting unauthorized visits back to `/login` with target return location memory.
- **Logout**: Graceful logout with session cleanup in Local Storage and instant feedback.
- **Local Storage User Store**: Keeps registered accounts and active sessions persisted in browser storage (`lms_users`, `lms_auth_user`).
- **1-Click Demo Login**: Quick autofill buttons on the login screen for testing both Admin/Instructor and Student roles instantly.

### Module 2: Responsive Dashboard
- **Top Metric Cards**:
  - Total Courses
  - Total Students
  - Total Instructors
  - Enrolled Courses
  - Completed Courses
- **Upcoming Live Classes**: Interactive schedule cards with course name, instructor, meeting link trigger ("Join Now"), and live status badges.
- **Recent Activities Feed**: Chronological event timeline showing student enrollments, course completions, and syllabus updates.
- **Quick Action Cards**: Direct navigation to browse catalog, create a new course, inspect enrolled courses, or view analytics.
- **Learning Momentum Chart**: Visual weekly study hours breakdown with streak counters and daily activity tracking.

### Module 3: Course Management & Third-Party API
- **Third-Party API Integration**: Connects to the **DummyJSON API** (`https://dummyjson.com/products`) using **Axios** to fetch, search, add, edit, and delete courses.
- **Persistent Local Caching**: Synchronizes API responses with Local Storage (`lms_courses`), ensuring that newly created, edited, and deleted courses persist across browser reloads.
- **Course Catalog Grid**: High-resolution thumbnails, instructor avatars, duration badges, difficulty level indicators, ratings, and price formatting.
- **Course Details Page (`/courses/:id`)**: Comprehensive syllabus outline, instructor bio, course metrics, pricing card, and enrollment trigger.
- **Add Course Modal**: Validated modal form allowing instructors to define course name, instructor, category, level, duration, price, rating, and thumbnail.
- **Edit Course Modal**: Pre-populated form to update existing courses in real-time.
- **Delete Course**: Confirmation dialog modal with safety checks before deletion.
- **Search & Filters**:
  - Live search by title, instructor, category, and keywords.
  - Category pill filter (Web Dev, Data Science, UI/UX Design, Cloud Computing, Cyber Security, AI, Business).
  - Difficulty level dropdown (Beginner, Intermediate, Advanced).
  - Sorting options (Name A-Z, Name Z-A, Rating, Price Low-High, Price High-Low).
- **Pagination**: Responsive pagination with page numbers and previous/next navigation.
- **Skeleton Loaders & Empty States**: Pulse loaders while fetching data and user-friendly empty state when search criteria match no items.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router v7 (`react-router-dom`)
- **State Management**: React Context API (`AuthContext`, `CourseContext`)
- **API Client**: Axios (`https://dummyjson.com`)
- **Forms & Validation**: React Hook Form
- **Notifications**: React Toastify
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage`

---

## 📁 Project Directory Structure

```
src/
├── assets/                  # Static logos and assets
├── components/
│   ├── common/              # Reusable UI building blocks
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── RatingStars.jsx
│   │   ├── Skeleton.jsx
│   │   └── Spinner.jsx
│   ├── courses/             # Course management components
│   │   ├── CourseCard.jsx
│   │   ├── CourseFilters.jsx
│   │   └── CourseFormModal.jsx
│   ├── dashboard/           # Dashboard visual components
│   │   ├── LearningChart.jsx
│   │   ├── QuickActions.jsx
│   │   ├── RecentActivities.jsx
│   │   ├── StatCard.jsx
│   │   └── UpcomingClasses.jsx
│   └── layout/              # App chrome & layout
│       ├── DashboardLayout.jsx
│       ├── Navbar.jsx
│       └── Sidebar.jsx
├── context/                 # Context providers
│   ├── AuthContext.jsx
│   ├── CourseContext.jsx
│   ├── authContextDef.js
│   └── courseContextDef.js
├── hooks/                   # Custom application hooks
│   ├── useAuth.js
│   └── useCourses.js
├── pages/
│   ├── auth/                # Auth pages (Login, Register, Forgot Password)
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── courses/             # Course catalog & details
│   │   ├── CourseDetailPage.jsx
│   │   └── CourseListPage.jsx
│   ├── dashboard/           # Main portal dashboard
│   │   └── DashboardPage.jsx
│   └── NotFoundPage.jsx     # 404 page
├── routes/
│   ├── AppRoutes.jsx        # Routing configuration
│   └── ProtectedRoute.jsx   # Route guard
├── services/
│   ├── api.js               # Axios instance configuration
│   └── courseService.js     # Third-party API & sync services
├── utils/
│   ├── constants.js         # Categories, levels, demo users, seeds
│   ├── formatters.js        # Currency, date, and duration formatters
│   └── storage.js           # Safe LocalStorage wrapper
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

---

## 🔑 Demo Login Credentials

For quick testing, use either the 1-click login buttons on the login screen or enter:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin / Instructor** | `admin@stackly.edu` | `Password@123` |
| **Student** | `alex.rivera@stackly.edu` | `Password@123` |

You can also register a brand-new account with any email/password on the `/register` page!

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run Lint Checks
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

