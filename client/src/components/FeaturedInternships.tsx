/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/FeaturedInternships.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import { Internship } from '../types';
import { InternshipCard } from './InternshipCard';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedInternshipsProps {
  internships: Internship[];
  onSelect: (internship: Internship) => void;
  onApply: (internship: Internship) => void;
  onViewAll: () => void;
}

export const FeaturedInternships: React.FC<FeaturedInternshipsProps> = ({
  internships,
  onSelect,
  onApply,
  onViewAll
}) => {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked For You</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Featured Opportunities
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Top rated internship positions actively hiring university talent.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors self-start sm:self-auto"
          >
            <span>View All Internships</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Listings Grid */}
        {internships.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No featured internships available at this moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onSelect={onSelect}
                onApply={onApply}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
