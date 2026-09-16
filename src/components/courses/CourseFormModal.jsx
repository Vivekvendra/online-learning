import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Sparkles, DollarSign, Clock, BookOpen, Star, Image, User } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '../../utils/constants';

const RANDOM_THUMBNAILS = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80'
];

export const CourseFormModal = ({
  isOpen,
  onClose,
  onSubmitCourse,
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
      instructor: '',
      category: 'Web Development',
      level: 'Beginner',
      duration: '32 hours',
      price: 49.99,
      rating: 4.8,
      thumbnail: RANDOM_THUMBNAILS[0],
      description: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        instructor: initialData.instructor || '',
        category: initialData.category || 'Web Development',
        level: initialData.level || 'Beginner',
        duration: initialData.duration || '32 hours',
        price: initialData.price || 49.99,
        rating: initialData.rating || 4.8,
        thumbnail: initialData.thumbnail || RANDOM_THUMBNAILS[0],
        description: initialData.description || ''
      });
    } else {
      reset({
        name: '',
        instructor: '',
        category: 'Web Development',
        level: 'Beginner',
        duration: '32 hours',
        price: 49.99,
        rating: 4.8,
        thumbnail: RANDOM_THUMBNAILS[0],
        description: ''
      });
    }
  }, [initialData, isOpen, reset]);

  const handleFormSubmit = async (data) => {
    const reviews = initialData?.reviewsCount ?? 120;
    await onSubmitCourse({
      ...data,
      price: Number(data.price),
      rating: Number(data.rating),
      reviewsCount: reviews
    });
    onClose();
  };

  const handlePickRandomImage = () => {
    const randomIdx = Math.floor(Math.random() * RANDOM_THUMBNAILS.length);
    setValue('thumbnail', RANDOM_THUMBNAILS[randomIdx], { shouldValidate: true });
  };

  const categories = COURSE_CATEGORIES.filter((c) => c !== 'All');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Course Details' : 'Add New Course'}
      subtitle={isEditing ? 'Update course curriculum information' : 'Create and publish a new course to the catalog'}
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
            {isEditing ? 'Save Changes' : 'Publish Course'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Course Title"
          placeholder="e.g. Modern React 19 Full-Stack Architecture"
          icon={BookOpen}
          required
          error={errors.name?.message}
          {...register('name', {
            required: 'Course title is required',
            minLength: { value: 4, message: 'Title must be at least 4 characters' }
          })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Instructor Name"
            placeholder="e.g. Dr. John Doe"
            icon={User}
            required
            error={errors.instructor?.message}
            {...register('instructor', {
              required: 'Instructor name is required'
            })}
          />

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('category', { required: true })}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
              Difficulty Level <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('level')}
            >
              {COURSE_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Duration"
            placeholder="e.g. 40 hours"
            icon={Clock}
            required
            error={errors.duration?.message}
            {...register('duration', {
              required: 'Duration is required'
            })}
          />

          <Input
            label="Price ($ USD)"
            type="number"
            step="0.01"
            placeholder="49.99"
            icon={DollarSign}
            required
            error={errors.price?.message}
            {...register('price', {
              required: 'Price is required',
              min: { value: 0, message: 'Price cannot be negative' }
            })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Thumbnail Image URL"
              placeholder="https://images.unsplash.com/..."
              icon={Image}
              required
              error={errors.thumbnail?.message}
              {...register('thumbnail', {
                required: 'Thumbnail image URL is required'
              })}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={Sparkles}
              onClick={handlePickRandomImage}
              className="w-full text-xs"
            >
              Random Image
            </Button>
          </div>
        </div>

        <Input
          label="Initial Rating (1 - 5)"
          type="number"
          step="0.1"
          min="1"
          max="5"
          placeholder="4.8"
          icon={Star}
          required
          error={errors.rating?.message}
          {...register('rating', {
            required: 'Rating is required',
            min: { value: 1, message: 'Minimum rating is 1.0' },
            max: { value: 5, message: 'Maximum rating is 5.0' }
          })}
        />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows="3"
            placeholder="Provide an overview of the curriculum, prerequisites, and learning outcomes..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            {...register('description', {
              required: 'Course description is required',
              minLength: { value: 15, message: 'Description must be at least 15 characters' }
            })}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-600 font-medium">
              {errors.description.message}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
};
