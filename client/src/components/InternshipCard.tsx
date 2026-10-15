/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/InternshipCard.tsx
 * Modified Last: 2026-10-15
 * Description: uofs student 4th year
 */

import React, { useState, useEffect } from 'react';
import { Internship } from '../types';
import { ArrowRight, Heart, MapPin, Clock, Building2 } from 'lucide-react';
import { BrandButton } from './PageTemplate';

interface InternshipCardProps {
  internship: Internship;
  onSelect: (internship: Internship) => void;
  onApply: (internship: Internship) => void;
}

// Helper to manage saved jobs in localStorage
const getSavedJobs = (): number[] => {
  try {
    const saved = localStorage.getItem('mainstay_saved_jobs');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const toggleSavedJob = (jobId: number): boolean => {
  const saved = getSavedJobs();
  const index = saved.indexOf(jobId);
  if (index > -1) {
    saved.splice(index, 1);
    localStorage.setItem('mainstay_saved_jobs', JSON.stringify(saved));
    return false;
  } else {
    saved.push(jobId);
    localStorage.setItem('mainstay_saved_jobs', JSON.stringify(saved));
    return true;
  }
};

export const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onSelect,
  onApply
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const workplaceType = internship.work_type === 'remote' ? 'Remote' : internship.work_type === 'hybrid' ? 'Hybrid' : 'On-Site';
  const jobType = internship.is_student_position ? 'Student / Co-op' : 'Full Time';

  useEffect(() => {
    setIsSaved(getSavedJobs().includes(internship.id));
  }, [internship.id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSavedState = toggleSavedJob(internship.id);
    setIsSaved(newSavedState);
  };

  return (
    <div
      onClick={() => onSelect(internship)}
      className="bg-white rounded-lg border border-slate-200 hover:border-[#204f32] hover:shadow-sm p-4 sm:p-5 transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn"
    >
      <div className="space-y-2 flex-1">
        {/* Line 1: Job Title with Save Button */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg font-bold text-[#0b1a11] group-hover:text-[#204f32] transition-colors leading-snug">
            {internship.title}
          </h3>
          <button
            onClick={handleSaveClick}
            className={`p-1.5 rounded-full transition-all shrink-0 ${
              isSaved
                ? 'text-red-500 bg-red-50 hover:bg-red-100'
                : 'text-slate-400 hover:text-red-500 hover:bg-slate-50'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Line 2: Company with icon */}
        {internship.company_name && (
          <div className="flex items-center gap-1.5 text-sm text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">{internship.company_name}</span>
          </div>
        )}

        {/* Line 3: Location & Metadata Tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600">
            <MapPin className="w-3 h-3" />
            {internship.location}
          </span>

          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-slate-600">
            {workplaceType}
          </span>

          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md ${
            internship.is_student_position
              ? 'bg-[#c4ded0]/50 text-[#204f32]'
              : 'bg-blue-50 text-blue-700'
          }`}>
            {jobType}
          </span>

          {internship.stipend && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium">
              {internship.stipend}
            </span>
          )}

          {internship.student_term && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber-50 text-amber-700">
              <Clock className="w-3 h-3" />
              {internship.student_term}
            </span>
          )}
        </div>
      </div>

      {/* Right Side Action Button */}
      <div className="flex items-center gap-2 sm:self-center shrink-0">
        <BrandButton
          type="button"
          onClick={(e) => {
            e?.stopPropagation();
            onApply(internship);
          }}
          variant="primary"
          className="text-xs font-bold"
        >
          <span>Apply</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </BrandButton>
      </div>
    </div>
  );
};
