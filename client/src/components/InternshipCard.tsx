/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/InternshipCard.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import { Internship } from '../types';
import { ArrowRight } from 'lucide-react';
import { BrandButton } from './PageTemplate';

interface InternshipCardProps {
  internship: Internship;
  onSelect: (internship: Internship) => void;
  onApply: (internship: Internship) => void;
}

export const InternshipCard: React.FC<InternshipCardProps> = ({
  internship,
  onSelect,
  onApply
}) => {
  // Generate consistent pseudo Requisition ID based on ID
  const requisitionId = 33140 + internship.id * 5;
  const workplaceType = internship.work_type === 'remote' ? 'Remote' : internship.work_type === 'hybrid' ? 'Hybrid' : 'On-Site';
  const jobType = internship.is_student_position ? 'Student' : 'Full Time / Co-op';

  return (
    <div 
      onClick={() => onSelect(internship)}
      className="bg-white rounded-lg border border-slate-200 hover:border-[#204f32] hover:shadow-xs p-4 sm:p-5 transition-all duration-150 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div className="space-y-1 flex-1">
        {/* Line 1: Job Title */}
        <h3 className="text-base sm:text-lg font-bold text-[#0b1a11] group-hover:text-[#204f32] transition-colors leading-snug">
          {internship.title}
        </h3>

        {/* Line 2: Locations & Company */}
        <div className="text-xs sm:text-sm font-medium text-slate-600">
          <span>{internship.location}</span>
          {internship.company_name && (
            <span className="text-slate-400"> — {internship.company_name}</span>
          )}
        </div>

        {/* Line 3: Structured Metadata with bullets */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 pt-1 font-normal">
          <span>Requisition ID: <strong className="font-semibold text-slate-700">{requisitionId}</strong></span>
          <span className="text-slate-300">•</span>
          <span>Job Type: <strong className="font-semibold text-slate-700">{jobType}</strong></span>
          <span className="text-slate-300">•</span>
          <span>Workplace Type: <strong className="font-semibold text-slate-700">{workplaceType}</strong></span>
          {internship.stipend && (
            <>
              <span className="text-slate-300">•</span>
              <span>Comp: <strong className="font-semibold text-[#204f32]">{internship.stipend}</strong></span>
            </>
          )}
          {internship.student_term && (
            <>
              <span className="text-slate-300">•</span>
              <span>Term: <strong className="font-semibold text-slate-700">{internship.student_term}</strong></span>
            </>
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

