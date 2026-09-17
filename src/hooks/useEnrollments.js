import { useContext } from 'react';
import { EnrollmentContext } from '../context/enrollmentContextDef';

export function useEnrollments() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollments must be used within EnrollmentProvider');
  return ctx;
}
