/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/pages/AboutPage.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, CardBox, BrandButton, BrandBadge } from '../components/PageTemplate';
import { ArrowLeft, User, GraduationCap, Building2, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onBackToHome?: () => void;
  onExploreCareers?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onExploreCareers }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackToHome) onBackToHome();
    else navigate('/');
  };

  const handleExplore = () => {
    if (onExploreCareers) onExploreCareers();
    else navigate('/careers');
  };

  return (
    <PageContainer maxWidth="5xl" className="py-12 sm:py-20">
      {/* Back button */}
      <button
        onClick={handleBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#204f32] transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Main card */}
      <CardBox className="p-8 sm:p-12 shadow-sm space-y-6">
        <BrandBadge variant="mint">
          <Sparkles className="w-3.5 h-3.5 text-[#204f32]" />
          <span>About Mainstay</span>
        </BrandBadge>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight">
          Hello from About Page!
        </h1>

        <p className="text-slate-600 text-base leading-relaxed">
          Welcome to <span className="font-semibold text-[#0b1a11]">Mainstay</span>, a streamlined career and student internship platform created to help university students discover real-world industry roles, co-op terms, and innovation positions at top companies like <span className="font-bold text-[#204f32]">Orano Canada</span>.
        </p>

        {/* Highlight Grid with Shade Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 bg-[#f2f7f4] rounded-lg border border-[#c4ded0]">
            <User className="w-5 h-5 text-[#204f32] mb-2" />
            <div className="text-xs text-slate-400 font-medium">Developer</div>
            <div className="text-sm font-bold text-[#0b1a11]">MD Shahed</div>
          </div>

          <div className="p-4 bg-[#f2f7f4] rounded-lg border border-[#c4ded0]">
            <GraduationCap className="w-5 h-5 text-[#204f32] mb-2" />
            <div className="text-xs text-slate-400 font-medium">University</div>
            <div className="text-sm font-bold text-[#0b1a11]">UofS (4th Year)</div>
          </div>

          <div className="p-4 bg-[#f2f7f4] rounded-lg border border-[#c4ded0]">
            <Building2 className="w-5 h-5 text-[#204f32] mb-2" />
            <div className="text-xs text-slate-400 font-medium">Key Partner</div>
            <div className="text-sm font-bold text-[#0b1a11]">Orano Canada</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <BrandButton
            onClick={handleExplore}
            variant="primary"
            className="px-6 py-3 text-sm"
          >
            Explore Student Positions
          </BrandButton>
          <BrandButton
            onClick={handleBack}
            variant="secondary"
            className="px-6 py-3 text-sm"
          >
            Home Overview
          </BrandButton>
        </div>
      </CardBox>
    </PageContainer>
  );
};


