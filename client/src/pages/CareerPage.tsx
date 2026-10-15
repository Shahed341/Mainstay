/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/pages/CareerPage.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Category, Internship, InternshipFilters } from '../types';
import { PageContainer, PageHero } from '../components/PageTemplate';
import { FilterBar } from '../components/FilterBar';
import { InternshipCard } from '../components/InternshipCard';
import { Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobListSkeleton } from '../components/SkeletonLoader';

interface CareerPageProps {
  categories: Category[];
  internships: Internship[];
  filters: InternshipFilters;
  isLoading: boolean;
  pagination: { total: number; page: number; limit: number; totalPages: number };
  onFilterChange: (newFilters: Partial<InternshipFilters>) => void;
  onResetFilters: () => void;
  onSelectInternship?: (internship: Internship) => void;
  onApplyInternship: (internship: Internship) => void;
}

export const CareerPage: React.FC<CareerPageProps> = ({
  categories,
  internships,
  filters,
  isLoading,
  pagination,
  onFilterChange,
  onResetFilters,
  onSelectInternship,
  onApplyInternship
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sync initial query params from URL (e.g. ?company=Orano or ?search=...)
  useEffect(() => {
    const companyParam = searchParams.get('company');
    const searchParam = searchParams.get('search');
    const updates: Partial<InternshipFilters> = {};
    if (companyParam && companyParam !== filters.company) {
      updates.company = companyParam;
    }
    if (searchParam && searchParam !== filters.search) {
      updates.search = searchParam;
    }
    if (Object.keys(updates).length > 0) {
      onFilterChange(updates);
    }
  }, [searchParams]);

  const handleSelectJob = (internship: Internship) => {
    if (onSelectInternship) {
      onSelectInternship(internship);
    } else {
      navigate(`/careers/${internship.id}`);
    }
  };

  return (
    <PageContainer maxWidth="6xl" className="py-8 space-y-8">
      {/* 1. Full Image Hero Banner Reusing PageHero Template */}
      <PageHero
        variant="spotlight"
        title="Looking For Your"
        highlightedTitle="Next Opportunity?"
        subtitle={
          <span>
            Browse our current openings and find the perfect role. We're hiring across engineering, project management, and field operations.
          </span>
        }
        backgroundImage="/Recruitment_Spotlight.jpg"
        primaryAction={{
          label: 'Browse All Positions',
          onClick: () => {
            onResetFilters();
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }
        }}
      />

      {/* 2. Filter Bar & Results Header */}
      <FilterBar
        categories={categories}
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        totalResults={pagination.total}
      />

      {/* 3. Main List Content (Vertical Stack of Horizontal Boxes) */}
      {isLoading ? (
        <JobListSkeleton count={6} />
      ) : internships.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-slate-200 p-8 shadow-xs">
          <div className="w-12 h-12 bg-[#f2f7f4] text-[#204f32] rounded-xl flex items-center justify-center mx-auto mb-3 border border-[#c4ded0]">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">No positions match your current filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Try adjusting your search keyword, toggling off the student filter, or clearing the company selection.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-[#204f32] text-white rounded-lg text-xs font-bold hover:bg-[#183b26] transition-colors shadow-sm cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* Vertical Stack of Job Boxes matching the user's screenshot */}
          <div className="space-y-3">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onSelect={handleSelectJob}
                onApply={onApplyInternship}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                disabled={pagination.page <= 1}
                onClick={() => onFilterChange({ page: pagination.page - 1 })}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-semibold text-slate-600 px-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => onFilterChange({ page: pagination.page + 1 })}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </PageContainer>
  );
};

