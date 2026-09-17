import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { CourseListPage } from '../pages/courses/CourseListPage';
import { CourseDetailPage } from '../pages/courses/CourseDetailPage';
import { StudentListPage } from '../pages/students/StudentListPage';
import { EnrollmentListPage } from '../pages/enrollments/EnrollmentListPage';
import { InstructorListPage } from '../pages/instructors/InstructorListPage';
import { InstructorProfilePage } from '../pages/instructors/InstructorProfilePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/courses" element={<CourseListPage />} />
          <Route path="/courses/:id" element={<CourseDetailPage />} />
          <Route path="/students" element={<StudentListPage />} />
          <Route path="/enrollments" element={<EnrollmentListPage />} />
          <Route path="/instructors" element={<InstructorListPage />} />
          <Route path="/instructors/:id" element={<InstructorProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
