import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { User, Mail, Phone, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { QUALIFICATIONS } from '../../context/studentConstants';

export const StudentFormModal = ({
  isOpen,
  onClose,
  onSubmitStudent,
  initialData = null,
  isLoading = false
}) => {
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      qualification: 'Bachelor of Technology (CS)',
      enrollmentDate: new Date().toISOString().split('T')[0],
      avatar: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        qualification: initialData.qualification || 'Bachelor of Technology (CS)',
        enrollmentDate: initialData.enrollmentDate || new Date().toISOString().split('T')[0],
        avatar: initialData.avatar || ''
      });
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        address: '',
        qualification: 'Bachelor of Technology (CS)',
        enrollmentDate: new Date().toISOString().split('T')[0],
        avatar: ''
      });
    }
  }, [initialData, isOpen, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmitStudent(data);
    onClose();
  };

  const handleGenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setValue('avatar', `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`, { shouldValidate: true });
  };

  const qualificationsList = QUALIFICATIONS.filter((q) => q !== 'All Qualifications');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Student Details' : 'Add New Student'}
      subtitle={isEditing ? 'Update student registration information' : 'Enroll a new student into the academy database'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(handleFormSubmit)}
            isLoading={isLoading}
          >
            {isEditing ? 'Save Changes' : 'Register Student'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="e.g. Alex Morgan"
          icon={User}
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'Full name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="alex@domain.com"
            icon={Mail}
            required
            error={errors.email?.message}
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
              }
            })}
          />

          <Input
            label="Mobile Number"
            placeholder="+1 (555) 000-0000"
            icon={Phone}
            required
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Mobile number is required',
              minLength: { value: 7, message: 'Phone number is too short' }
            })}
          />
        </div>

        <div>
          <Input
            label="Home / Residential Address"
            placeholder="123 Academic Way, Suite 400, New York, NY"
            icon={MapPin}
            required
            error={errors.address?.message}
            {...register('address', {
              required: 'Address is required'
            })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Educational Qualification <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6355ec]"
                {...register('qualification', { required: true })}
              >
                {qualificationsList.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Enrollment Date"
            type="date"
            icon={Calendar}
            required
            error={errors.enrollmentDate?.message}
            {...register('enrollmentDate', {
              required: 'Enrollment date is required'
            })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Avatar / Photo URL"
              placeholder="https://images.unsplash.com/..."
              icon={User}
              helperText="Leave empty to use automatic generative avatar"
              {...register('avatar')}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={Sparkles}
              onClick={handleGenerateAvatar}
              className="w-full text-xs"
            >
              Generate Avatar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
