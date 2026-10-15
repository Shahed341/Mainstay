/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/pages/JobDetailPage.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Internship } from '../types';
import { fetchInternshipById } from '../services/api';
import { PageContainer, CardBox, BrandButton, BrandBadge } from '../components/PageTemplate';
import { ArrowLeft, Building2, MapPin, DollarSign, Calendar, Clock, Sparkles, Loader2 } from 'lucide-react';

interface JobDetailPageProps {
  internship?: Internship | null;
  onBack?: () => void;
  onApply: (internship: Internship) => void;
}

export const JobDetailPage: React.FC<JobDetailPageProps> = ({
  internship: propInternship,
  onBack,
  onApply
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<Internship | null>(propInternship || null);
  const [isLoading, setIsLoading] = useState<boolean>(!propInternship && !!id);

  useEffect(() => {
    if (propInternship) {
      setInternship(propInternship);
      setIsLoading(false);
      return;
    }

    if (id) {
      const loadJob = async () => {
        setIsLoading(true);
        const data = await fetchInternshipById(Number(id));
        setInternship(data);
        setIsLoading(false);
      };
      loadJob();
    }
  }, [id, propInternship]);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate('/careers');
  };

  const handleApply = () => {
    if (internship) {
      if (onApply) {
        onApply(internship);
      } else {
        window.open(`/apply/${internship.id}`, '_blank');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="py-28 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-[#204f32] mb-3" />
        <p className="text-sm text-[#204f32] font-medium">Loading position details...</p>
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="py-20 text-center max-w-2xl mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-800">Job position not found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested job position could not be found or may have expired.
        </p>
        <button
          onClick={handleBack}
          className="mt-6 px-6 py-2.5 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer"
        >
          Back to Career Listings
        </button>
      </div>
    );
  }

  const requisitionId = 33140 + internship.id * 5;
  const experienceLevel = internship.is_student_position ? 'Internship / Student Co-op' : 'Entry Level / Early Career';
  const isOrano = internship.company_name?.toLowerCase().includes('orano');

  return (
    <PageContainer maxWidth="6xl" className="py-6 sm:py-8 space-y-6">
      {/* Top Utility Nav Bar */}
      <div className="flex items-center justify-between text-xs pb-1">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 font-bold text-[#204f32] hover:text-[#183b26] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Jobs</span>
        </button>

        <div className="flex items-center gap-4 text-slate-500 font-medium">
          <span className="hover:text-slate-800 cursor-pointer">Sign In / Create Job Alert</span>
          <span>•</span>
          <span className="hover:text-slate-800 cursor-pointer">Employee Login</span>
        </div>
      </div>

      {/* Contained Hero Banner (Not full screen width) */}
      <div className="rounded-2xl bg-[#204f32] text-white p-6 sm:p-10 shadow-sm border border-[#183b26] space-y-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#c4ded0] uppercase tracking-wide leading-tight">
          {internship.title}
        </h1>

        <div className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
          <strong className="text-white font-bold">Location:</strong>{' '}
          <span>{internship.location}</span>
          {isOrano && <span> | McClean Lake, SK | Cigar Lake, SK | Saskatoon, SK</span>}
        </div>

        <div className="text-xs sm:text-sm text-slate-200">
          <strong className="text-white font-bold">Experience Level:</strong>{' '}
          <span className="capitalize">{experienceLevel}</span>
          <span className="mx-2">•</span>
          <strong className="text-white font-bold">Workplace Type:</strong>{' '}
          <span className="capitalize">{internship.work_type}</span>
        </div>

        <div className="pt-2">
          <button
            onClick={handleApply}
            className="bg-white hover:bg-[#f2f7f4] text-[#204f32] px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Apply Now</span>
            <Sparkles className="w-4 h-4 text-[#204f32]" />
          </button>
        </div>
      </div>

      {/* Job Details Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Job Description (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <CardBox className="p-6 sm:p-8 space-y-6">
            {/* Header Metadata */}
            <div className="space-y-1 pb-4 border-b border-slate-100">
              <div className="text-sm font-bold text-slate-900">
                Job Title: <span className="font-normal text-slate-700">{internship.title}</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                Requisition ID: <span className="font-normal text-slate-700">{requisitionId}</span>
              </div>
              {internship.company_name && (
                <div className="text-sm font-bold text-slate-900">
                  Company: <span className="font-normal text-slate-700">{internship.company_name}</span>
                </div>
              )}
            </div>

            {/* Overview / Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-[#0b1a11]">Role Overview</h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {internship.description}
              </p>
            </div>

            {/* Requirements & Qualifications */}
            {internship.requirements && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-lg font-bold text-[#0b1a11]">Key Requirements & Qualifications</h2>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {internship.requirements}
                </p>
              </div>
            )}
          </CardBox>

          {/* Why Join Us */}
          <div className="p-6 bg-[#f2f7f4] rounded-xl border border-[#c4ded0] space-y-3">
            <h3 className="text-base font-bold text-[#204f32]">
              Why Join Our Team?
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              As a student intern, you'll work directly alongside experienced engineers, specialists, and technical mentors. We value how you think, your problem-solving curiosity, and your enthusiasm for learning.
            </p>
            <BrandButton
              onClick={handleApply}
              variant="primary"
              className="mt-2"
            >
              Tell Us How You Think & Apply
            </BrandButton>
          </div>
        </div>

        {/* Right Sidebar Quick Specs (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <CardBox className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0b1a11] uppercase tracking-wider">
              Position Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#204f32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Organization</span>
                  <span className="font-bold text-slate-800">{internship.company_name}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#204f32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Location</span>
                  <span className="font-bold text-slate-800">{internship.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <DollarSign className="w-4 h-4 text-[#204f32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Compensation / Stipend</span>
                  <span className="font-bold text-[#204f32]">{internship.stipend || 'Competitive'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#204f32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Duration</span>
                  <span className="font-bold text-slate-800">{internship.duration || '4 Months'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#204f32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block font-medium">Application Deadline</span>
                  <span className="font-bold text-slate-800">
                    {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Open until filled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <BrandButton
                onClick={handleApply}
                variant="primary"
                className="w-full py-2.5 text-xs"
              >
                Apply Now
              </BrandButton>
            </div>
          </CardBox>
        </div>
      </div>
    </PageContainer>
  );
};

