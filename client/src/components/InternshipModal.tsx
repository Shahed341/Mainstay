/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/InternshipModal.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import { Internship } from '../types';
import { X, Globe, ArrowRight, GraduationCap } from 'lucide-react';

interface InternshipModalProps {
  internship: Internship | null;
  onClose: () => void;
  onApply: (internship: Internship) => void;
}

export const InternshipModal: React.FC<InternshipModalProps> = ({
  internship,
  onClose,
  onApply
}) => {
  if (!internship) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-mainstay-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-4">
            {internship.company_logo ? (
              <img
                src={internship.company_logo}
                alt={internship.company_name}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-mainstay-100 text-mainstay-800 font-bold flex items-center justify-center text-xl">
                {(internship.company_name || 'M').charAt(0)}
              </div>
            )}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-mainstay-950 leading-snug">{internship.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                <span className="font-bold text-mainstay-800">{internship.company_name}</span>
                <span>•</span>
                <span className="bg-mainstay-50 text-mainstay-800 border border-mainstay-200 px-2 py-0.5 rounded-md font-semibold">
                  {internship.category_name || 'General'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-mainstay-50/50 border border-mainstay-100 p-4 rounded-2xl text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Work Mode</span>
              <span className="font-bold text-mainstay-900 capitalize">{internship.work_type}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Location</span>
              <span className="font-bold text-mainstay-900 truncate block">{internship.location}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Stipend / Comp</span>
              <span className="font-bold text-mainstay-900">{internship.stipend || 'Competitive'}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Deadline</span>
              <span className="font-bold text-mainstay-900">
                {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Open'}
              </span>
            </div>
          </div>

          {/* Student Term */}
          {internship.student_term && (
            <div className="flex items-center gap-2 p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
              <GraduationCap className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Target Student Co-op Term: <strong>{internship.student_term}</strong></span>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-mainstay-900 uppercase tracking-wider mb-2">
              Role Overview & Responsibilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {internship.description}
            </p>
          </div>

          {/* Requirements */}
          {internship.requirements && (
            <div>
              <h3 className="text-xs font-bold text-mainstay-900 uppercase tracking-wider mb-2">
                Requirements & Qualifications
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {internship.requirements}
              </p>
            </div>
          )}

          {/* Company Details */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            {internship.company_website && (
              <a
                href={internship.company_website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-mainstay-700 hover:text-mainstay-900 font-semibold"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Company Website</span>
              </a>
            )}
            <span>Posted {new Date(internship.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onApply(internship);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-mainstay-700 hover:bg-mainstay-800 text-white text-xs font-bold shadow-md shadow-mainstay-700/20 hover:shadow transition-all"
          >
            <span>Tell Us How You Think & Apply</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
