/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/pages/AboutPage.tsx
 * Modified Last: 2026-10-15
 * Description: uofs student 4th year
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users, Target, Lightbulb, Handshake, Building2, GraduationCap, Briefcase, Heart } from 'lucide-react';

interface AboutPageProps {
  onBackToHome?: () => void;
  onExploreCareers?: () => void;
  onContactClick?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onExploreCareers, onContactClick }) => {
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
    <div className="w-full bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#0b1a11] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: "url('/homepage/indigenous_own.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a11] via-[#0b1a11]/90 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              About Us
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Together, we <span className="text-[#99c5b0]">thrive!</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Mainstay Engineering & Owner Reps is a professional engineering company that has distinguished itself by successfully overseeing mining projects valued at over <span className="font-bold text-white">$1B dollars</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight">
                Committed to shared excellence and community prosperity
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Our majority owner — <span className="font-semibold text-[#0b1a11]">Buffalo River Development LP</span>, a wholly-owned entity of Buffalo River Dene Nation (BRDN) — anchors these values and provides strategic direction.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Together, BRDN and Mainstay are playing an important role in Saskatchewan's thriving mining and industrial sector. We are fostering meaningful opportunities for Indigenous communities through strategic partnerships, workforce development, education, business development, and community relations.
              </p>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/homepage/team_success.jpg"
                  alt="Mainstay Team"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              {/* Stats overlay */}
              <div className="absolute -bottom-6 -left-6 bg-[#204f32] text-white rounded-xl p-5 shadow-lg">
                <div className="text-3xl font-black">51%</div>
                <div className="text-xs text-[#99c5b0] uppercase tracking-wider font-semibold">Indigenous-owned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#204f32]/10 text-[#204f32] flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1a11] mb-3">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                Together, we will create meaningful opportunities and a brighter future for tomorrow's Indigenous leaders and working professionals.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#204f32]/10 text-[#204f32] flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1a11] mb-3">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                We make it easier for project owners to achieve their goals by providing practical engineering expertise, independent oversight, and owner-focused project delivery support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
              What We Do
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight">
              Our areas of focus
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#f2f7f4] border border-[#c4ded0] text-center">
              <div className="w-10 h-10 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center mx-auto mb-4">
                <Handshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0b1a11] mb-2">Strategic Partnerships</h4>
              <p className="text-xs text-slate-600">Building lasting relationships with industry leaders</p>
            </div>

            <div className="p-6 rounded-xl bg-[#f2f7f4] border border-[#c4ded0] text-center">
              <div className="w-10 h-10 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0b1a11] mb-2">Workforce Development</h4>
              <p className="text-xs text-slate-600">Training and empowering skilled professionals</p>
            </div>

            <div className="p-6 rounded-xl bg-[#f2f7f4] border border-[#c4ded0] text-center">
              <div className="w-10 h-10 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0b1a11] mb-2">Education</h4>
              <p className="text-xs text-slate-600">Investing in knowledge and skill development</p>
            </div>

            <div className="p-6 rounded-xl bg-[#f2f7f4] border border-[#c4ded0] text-center">
              <div className="w-10 h-10 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0b1a11] mb-2">Community Relations</h4>
              <p className="text-xs text-slate-600">Strengthening ties with local communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#183b26]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-white">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to join our team?
              </h2>
              <p className="text-sm text-slate-200">
                Explore career opportunities and be part of something meaningful.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExplore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#204f32] hover:bg-[#f2f7f4] rounded-lg text-sm font-bold shadow-md transition-all group cursor-pointer"
              >
                <span>View Careers</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-lg text-sm font-bold transition-all cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
