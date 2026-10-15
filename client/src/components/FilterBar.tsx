/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/FilterBar.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React, { useState } from 'react';
import { Category, InternshipFilters } from '../types';
import { Search, GraduationCap, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { MOCK_COMPANIES } from '../data/mockData';

interface FilterBarProps {
  categories: Category[];
  filters: InternshipFilters;
  onFilterChange: (filters: Partial<InternshipFilters>) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  filters,
  onFilterChange,
  onReset,
  totalResults
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const startResult = totalResults > 0 ? (filters.page - 1) * 10 + 1 : 0;
  const endResult = Math.min(filters.page * 10, totalResults);

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.category !== 'all' || 
    filters.company !== 'all' || 
    filters.work_type !== 'all' || 
    !filters.student_only;

  return (
    <div className="space-y-4">
      {/* 1. Streamlined Search Bar Row (Search Bar + Action Buttons to the Right) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search Input Box */}
        <div className="relative flex-1 bg-white rounded-lg border border-slate-200 shadow-xs focus-within:border-[#204f32] focus-within:ring-2 focus-within:ring-[#204f32]/10 transition-all">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
            placeholder="Search by title, keyword, or Requisition ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border-0 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Dedicated Student Button (After Search Bar on Right Side) */}
        <button
          type="button"
          onClick={() => onFilterChange({ student_only: !filters.student_only, page: 1 })}
          className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer border ${
            filters.student_only
              ? 'bg-[#204f32] border-[#204f32] text-white shadow-sm ring-2 ring-[#204f32]/20'
              : 'bg-white border-slate-200 text-slate-700 hover:text-[#204f32] hover:border-[#204f32] hover:bg-[#f2f7f4] shadow-xs'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${filters.student_only ? 'text-[#c4ded0]' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">Student / Co-op</span>
          <span className="sm:hidden">Student</span>
        </button>

        {/* Filter Icon Only Button */}
        <button
          type="button"
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          title="Filter Options"
          aria-label="Filter Options"
          className={`p-2.5 rounded-lg border text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center justify-center ${
            isFilterPanelOpen || (filters.category !== 'all' || filters.company !== 'all' || filters.work_type !== 'all')
              ? 'bg-[#204f32] border-[#204f32] text-white shadow-sm ring-2 ring-[#204f32]/20'
              : 'bg-white border-slate-200 text-slate-700 hover:text-[#204f32] hover:border-[#204f32] hover:bg-[#f2f7f4] shadow-xs'
          }`}
        >
          <SlidersHorizontal className={`w-4 h-4 ${isFilterPanelOpen || (filters.category !== 'all' || filters.company !== 'all' || filters.work_type !== 'all') ? 'text-[#c4ded0]' : 'text-slate-600'}`} />
        </button>
      </div>

      {/* Expandable Secondary Filter Panel (When Filter Icon is Clicked) */}
      {isFilterPanelOpen && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800">Advanced Filters</span>
            <button
              onClick={() => setIsFilterPanelOpen(false)}
              className="text-slate-400 hover:text-slate-700 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Company Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Company</label>
              <select
                value={filters.company}
                onChange={(e) => onFilterChange({ company: e.target.value, page: 1 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#204f32] cursor-pointer"
              >
                <option value="all">All Companies</option>
                {MOCK_COMPANIES.map((company) => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Discipline Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Discipline / Category</label>
              <select
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value, page: 1 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#204f32] cursor-pointer"
              >
                <option value="all">All Disciplines</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Workplace Type Filter */}
            <div>
              <label className="block text-slate-500 font-semibold mb-1">Workplace Type</label>
              <select
                value={filters.work_type}
                onChange={(e) => onFilterChange({ work_type: e.target.value, page: 1 })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#204f32] cursor-pointer capitalize"
              >
                <option value="all">All Workplace Types</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="on-site">On-Site</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1 text-xs text-[#204f32] hover:text-[#183b26] font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Top Results & Sorting Header */}
      <div className="bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center justify-between text-xs sm:text-sm">
        {/* Left: 1 to 10 of 57 results */}
        <div className="font-bold text-slate-800">
          {totalResults > 0 ? (
            <span>{startResult} to {endResult} of {totalResults} results</span>
          ) : (
            <span>0 results found</span>
          )}
        </div>

        {/* Right: Sort by Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Sort by</span>
          <select
            value={filters.sort_by || 'relevant'}
            onChange={(e) => onFilterChange({ sort_by: e.target.value, page: 1 })}
            className="bg-white border border-slate-300 rounded-md px-3 py-1 text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#204f32] focus:border-[#204f32] cursor-pointer"
          >
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="deadline">Application Deadline</option>
          </select>
        </div>
      </div>
    </div>
  );
};
