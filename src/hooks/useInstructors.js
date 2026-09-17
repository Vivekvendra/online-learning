import { useContext } from 'react';
import { InstructorContext } from '../context/instructorContextDef';

export function useInstructors() {
  const ctx = useContext(InstructorContext);
  if (!ctx) throw new Error('useInstructors must be used within InstructorProvider');
  return ctx;
}
