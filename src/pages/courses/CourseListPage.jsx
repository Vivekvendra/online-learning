import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BookPlus,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useCourses } from '../../hooks/useCourses';
import { CourseCard } from '../../components/courses/CourseCard';
import { CourseFilters } from '../../components/courses/CourseFilters';
import { CourseFormModal } from '../../components/courses/CourseFormModal';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { CourseCardSkeleton } from '../../components/common/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { Button } from '../../components/common/Button';

export const CourseListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    paginatedCourses,
    filteredCourses,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    sortBy,
    setSortBy,
    resetFilters,
    addCourse,
    updateCourse,
    deleteCourse,
    resetToDefaultCourses
  } = useCourses();

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Derived state from query parameters
  const isActionNew = searchParams.get('action') === 'new';
  const isFormModalOpen = isManualModalOpen || isActionNew;

  // Sync search param on first load without effect state race
  const querySearch = useMemo(() => searchParams.get('search') || '', [searchParams]);
  if (querySearch && searchQuery !== querySearch && !loading) {
    setSearchQuery(querySearch);
  }

  const handleCloseModal = () => {
    setIsManualModalOpen(false);
    if (isActionNew) {
      searchParams.delete('action');
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setIsManualModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setIsManualModalOpen(true);
  };

  const handleSaveCourse = async (formData) => {
    if (editingCourse) {
      await updateCourse(editingCourse.id, formData);
    } else {
      await addCourse(formData);
    }
    handleCloseModal();
  };

  const handleConfirmDelete = async () => {
    if (!deletingCourse) return;
    setIsDeleting(true);
    await deleteCourse(deletingCourse.id);
    setIsDeleting(false);
    setDeletingCourse(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Third-Party API Integration • DummyJSON Sync</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Course Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse, search, filter, and manage academic curricula across all disciplines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            icon={RotateCcw}
            onClick={resetToDefaultCourses}
            className="text-xs"
            title="Reset catalog back to default seed items"
          >
            Reset Catalog
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={BookPlus}
            onClick={handleOpenAdd}
            className="shadow-md shadow-indigo-600/20 text-xs font-bold"
          >
            Add New Course
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center justify-between">
          <span>{error}</span>
          <Button size="sm" variant="outline" onClick={resetToDefaultCourses}>
            Load Fallback
          </Button>
        </div>
      )}

      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={resetFilters}
        totalResults={filteredCourses.length}
      />

      {loading && paginatedCourses.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CourseCardSkeleton key={n} />
          ))}
        </div>
      ) : paginatedCourses.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No courses match your criteria"
          description="Try adjusting your keyword search, selecting another category, or resetting all filters."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={handleOpenEdit}
              onDelete={(c) => setDeletingCourse(c)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500 font-medium">
            Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              icon={ChevronLeft}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <Button
              size="sm"
              variant="outline"
              icon={ChevronRight}
              iconPosition="right"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <CourseFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModal}
        onSubmitCourse={handleSaveCourse}
        initialData={editingCourse}
      />

      <ConfirmModal
        isOpen={Boolean(deletingCourse)}
        onClose={() => setDeletingCourse(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${deletingCourse?.name}"? This action will remove it from the catalog.`}
        confirmText="Delete Course"
        isLoading={isDeleting}
      />
    </div>
  );
};
