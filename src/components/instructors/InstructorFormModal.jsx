import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useInstructors } from '../../hooks/useInstructors';

import { SPECIALIZATIONS } from '../../context/instructorConstants';

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

const inputCls = "w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#6355ec]/40 focus:border-[#6355ec]";

export function InstructorFormModal({ isOpen, onClose, editInstructor }) {
  const { addInstructor, updateInstructor } = useInstructors();
  const isEdit = Boolean(editInstructor);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '', email: '', phone: '', experience: '', specialization: '',
      qualification: '', bio: '', profileImage: '', linkedin: '', twitter: '',
    },
  });

  useEffect(() => {
    if (isOpen) reset(isEdit ? editInstructor : {
      name: '', email: '', phone: '', experience: '', specialization: '',
      qualification: '', bio: '', profileImage: '', linkedin: '', twitter: '',
    });
  }, [isOpen, isEdit, editInstructor, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    const payload = { ...data, experience: Number(data.experience) };
    if (isEdit) updateInstructor(editInstructor.id, payload);
    else addInstructor(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#6355ec] to-[#8b7ff5] px-6 py-5 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{isEdit ? 'Edit Instructor' : 'Add New Instructor'}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name *" error={errors.name?.message}>
              <input {...register('name', { required: 'Name is required' })} className={inputCls} placeholder="Dr. John Doe" />
            </Field>
            <Field label="Email *" error={errors.email?.message}>
              <input {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} className={inputCls} placeholder="john@stackly.edu" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input {...register('phone')} className={inputCls} placeholder="+1-555-0000" />
            </Field>
            <Field label="Years of Experience *" error={errors.experience?.message}>
              <input type="number" {...register('experience', { required: 'Required', min: { value: 0, message: 'Min 0' }, max: { value: 50, message: 'Max 50' } })} className={inputCls} placeholder="5" />
            </Field>
            <Field label="Specialization *" error={errors.specialization?.message}>
              <select {...register('specialization', { required: 'Required' })} className={inputCls}>
                <option value="">— Select —</option>
                {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Qualification *" error={errors.qualification?.message}>
              <input {...register('qualification', { required: 'Required' })} className={inputCls} placeholder="MSc in Computer Science" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Profile Image URL" error={errors.profileImage?.message}>
                <input {...register('profileImage')} className={inputCls} placeholder="https://..." />
              </Field>
            </div>
            <Field label="LinkedIn URL">
              <input {...register('linkedin')} className={inputCls} placeholder="https://linkedin.com/in/..." />
            </Field>
            <Field label="Twitter URL">
              <input {...register('twitter')} className={inputCls} placeholder="https://twitter.com/..." />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Bio *" error={errors.bio?.message}>
                <textarea {...register('bio', { required: 'Bio is required', minLength: { value: 20, message: 'Min 20 chars' } })} rows={3} className={inputCls + ' resize-none'} placeholder="Brief introduction about the instructor…" />
              </Field>
            </div>
          </div>

          <div className="flex gap-3 pt-5 mt-2 border-t border-gray-100">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2.5 bg-[#6355ec] text-white rounded-xl text-sm font-semibold hover:bg-[#5244dc] disabled:opacity-50 transition-colors">
              {isSubmitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Instructor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
