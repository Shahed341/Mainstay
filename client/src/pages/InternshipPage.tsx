/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/pages/InternshipPage.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import { Category, Internship, InternshipFilters } from '../types';
import { FilterBar } from '../components/FilterBar';
import { InternshipCard } from '../components/InternshipCard';
import { Loader2, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';

interface InternshipPageProps {
  categories: Category[];
  internships: Internship[];
  filters: InternshipFilters;
  isLoading: boolean;
  pagination: { total: number; page: number; limit: number; totalPages: number };
  onFilterChange: (newFilters: Partial<InternshipFilters>) => void;
  onResetFilters: () => void;
  onSelectInternship: (internship: Internship) => void;
  onApplyInternship: (internship: Internship) => void;
}

export const InternshipPage: React.FC<InternshipPageProps> = ({
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
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Explore Internships
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Search and filter through all verified university internship opportunities.
        </p>
      </div>

      {/* Filter Bar Component */}
      <FilterBar
        categories={categories}
        filters={filters}
        onFilterChange={onFilterChange}
        onReset={onResetFilters}
        totalResults={pagination.total}
      />

      {/* Content Area */}
      {isLoading ? (
        <div className="py-24 flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
          <p className="text-sm">Loading internship listings...</p>
        </div>
      ) : internships.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No internships matched your criteria</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Try adjusting your search terms, changing discipline filters, or clearing the location input.
          </p>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onSelect={onSelectInternship}
                onApply={onApplyInternship}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              <button
                disabled={pagination.page <= 1}
                onClick={() => onFilterChange({ page: pagination.page - 1 })}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-xs font-semibold text-slate-600 px-3">
                Page {pagination.page} of {pagination.totalPages}
              </span>

              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => onFilterChange({ page: pagination.page + 1 })}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
