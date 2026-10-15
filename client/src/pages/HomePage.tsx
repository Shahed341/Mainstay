/**
 * Author: MD Shahed
 * Date: 2026-10-11
 * File Name: client/src/pages/HomePage.tsx
 * Modified Last: 2026-10-11
 * Description: uofs student 4th year
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SystemHealth } from '../types';
import { 
  ArrowRight, 
  ArrowLeft,
  Settings, 
  Users, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  Factory, 
  MapPin, 
  Quote, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface HomePageProps {
  systemHealth?: SystemHealth | null;
  onNavigateToAbout?: () => void;
  onNavigateToCareers?: (companyFilter?: string) => void;
  onContactClick?: () => void;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Mainstay brought practical experience and a strong focus on the owner's interests. Their team was professional, responsive and easy to work with.",
    author: "Project Partner",
    role: "Mining Sector, Saskatchewan",
    image: "/homepage/testimonial_engineer.jpg"
  },
  {
    quote: "Their independent oversight gave our executive team confidence throughout project delivery, ensuring transparency and accountability on site.",
    author: "Operations Director",
    role: "Industrial Facility, Western Canada",
    image: "/homepage/about_feature.jpg"
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onContactClick }) => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentTestimonial = TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className="w-full bg-white text-slate-800">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-[#0b1a11]">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center sm:bg-right scale-100 transition-transform duration-700"
          style={{ backgroundImage: "url('/HeroImageBG.jpg')" }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a11]/95 via-[#0b1a11]/80 sm:via-[#0b1a11]/60 to-transparent w-full lg:w-3/4" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-white">
          <div className="max-w-2xl space-y-6">
            <div className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              Independent. Practical. Owner-Focused.
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Engineering <br />
              for what <br />
              <span className="text-[#99c5b0]">matters.</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal max-w-xl">
              Practical engineering, independent oversight and project delivery support for mining, energy and industrial projects.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-sm font-bold shadow-md transition-all group cursor-pointer"
              >
                <span>Our Services</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/40 rounded-lg text-sm font-bold backdrop-blur-xs transition-all cursor-pointer"
              >
                <span>Learn About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT MAINSTAY ("A partner in your success.") */}
      <section id="services" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                About Mainstay
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0b1a11] tracking-tight leading-tight">
                A partner <br />
                in your <span className="text-[#204f32]">success.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Mainstay provides engineering, project delivery, owner's representation, field services and operational excellence support, with a practical focus on safe execution, clear accountability and protecting the Owner's interests.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex sm:flex-col items-center sm:items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0b1a11]">Independent expertise</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex sm:flex-col items-center sm:items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0b1a11]">Owner-focused approach</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex sm:flex-col items-center sm:items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0b1a11]">Practical execution</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-sm font-bold transition-all shadow-sm group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Right Card / Graphic (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
                <img
                  src="/homepage/team_success.jpg"
                  alt="Mainstay Team Success"
                  className="w-full h-[380px] sm:h-[440px] object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Bottom Overlay Card */}
                <div className="absolute inset-x-4 bottom-4 p-5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-md">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    — Our Approach
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-xs sm:text-sm font-bold text-[#0b1a11] leading-snug">
                      From planning to execution, we support the owner's interests across the entire project lifecycle.
                    </p>
                    <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#204f32] hover:text-white text-slate-700 flex items-center justify-center shrink-0 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR OWNERSHIP ("Proudly Indigenous-owned and community connected.") */}
      <section className="relative py-16 sm:py-24 bg-[#143422] text-white overflow-hidden">
        {/* Indigenous Ownership Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none"
          style={{ backgroundImage: "url('/homepage/indigenous_own.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#143422] via-[#143422]/90 to-[#143422]/60 w-full" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              Our Ownership
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Proudly Indigenous-owned <br />
              and community connected.
            </h2>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
              Mainstay is 51% owned by Buffalo River Development LP, the economic development arm of Buffalo River Dene Nation, a Treaty 10 community in northwestern Saskatchewan.
            </p>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#204f32] hover:bg-[#f2f7f4] rounded-lg text-sm font-bold shadow-md transition-all group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 51% Stat and Buffalo River Logo */}
            <div className="pt-6 flex flex-wrap items-center gap-8 border-t border-white/20">
              <div>
                <div className="text-4xl sm:text-5xl font-black text-white leading-none">51%</div>
                <div className="text-xs text-[#99c5b0] uppercase tracking-wider font-semibold mt-1">
                  Indigenous-owned
                </div>
              </div>

              <div className="h-10 w-px bg-white/25 hidden sm:block" />

              <div className="flex items-center gap-3">
                <img
                  src="/homepage/buffalo_river_logo.png"
                  alt="Buffalo River Dene Nation"
                  className="h-10 w-auto object-contain brightness-0 invert opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RECENT PROJECTS ("Real projects. Lasting impact.") */}
      <section id="projects" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                Recent Projects
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight">
                Real projects. Lasting impact.
              </h2>
            </div>

            <Link
              to="/careers"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#204f32] hover:text-[#183b26] transition-colors group"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 3 Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all cursor-pointer">
              <div className="h-56 overflow-hidden">
                <img
                  src="/homepage/project_mining.jpg"
                  alt="Mining Infrastructure Support"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-base font-bold leading-snug">Mining Infrastructure Support</h3>
                  <p className="text-xs text-slate-300">Saskatchewan, Canada</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#204f32] transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all cursor-pointer">
              <div className="h-56 overflow-hidden">
                <img
                  src="/homepage/project_facility.jpg"
                  alt="Industrial Facility Oversight"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-base font-bold leading-snug">Industrial Facility Oversight</h3>
                  <p className="text-xs text-slate-300">Western Canada</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#204f32] transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all cursor-pointer">
              <div className="h-56 overflow-hidden">
                <img
                  src="/homepage/project_energy.jpg"
                  alt="Project Management Support"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
                <div>
                  <h3 className="text-base font-bold leading-snug">Project Management Support</h3>
                  <p className="text-xs text-slate-300">Energy Sector</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#204f32] transition-colors shrink-0">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR IMPACT (Deep Green Stats Bar) */}
      <section className="py-14 sm:py-18 bg-[#122c1d] text-white border-y border-[#183b26]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#99c5b0]">
              Our Impact
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center px-4 pt-4 lg:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-[#99c5b0]">
                <Coins className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">$25M – $1.2B</div>
              <div className="text-xs text-slate-300 mt-1">Projects supported</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center px-4 pt-4 lg:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-[#99c5b0]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
              <div className="text-xs text-slate-300 mt-1">Contractor completion rate</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center px-4 pt-4 lg:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-[#99c5b0]">
                <Factory className="w-5 h-5" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-white">Mining, Energy & Industrial</div>
              <div className="text-xs text-slate-300 mt-1">Sectors</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center px-4 pt-4 lg:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-3 text-[#99c5b0]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">Saskatoon, SK</div>
              <div className="text-xs text-slate-300 mt-1">Based in Canada</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENT FEEDBACK ("Trusted by industry partners.") */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header & Carousel Buttons */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                Client Feedback
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight">
                Trusted by industry partners.
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#204f32] hover:bg-[#f2f7f4] flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#204f32] hover:bg-[#f2f7f4] flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Testimonial Two-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Quote on Left (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="w-12 h-12 rounded-xl bg-[#204f32]/10 text-[#204f32] flex items-center justify-center">
                <Quote className="w-6 h-6" />
              </div>

              <blockquote className="text-lg sm:text-xl lg:text-2xl text-slate-800 font-medium leading-relaxed italic">
                “{currentTestimonial.quote}”
              </blockquote>

              <div className="pt-2">
                <div className="font-bold text-[#0b1a11] text-base">{currentTestimonial.author}</div>
                <div className="text-xs text-slate-500">{currentTestimonial.role}</div>
              </div>
            </div>

            {/* Photo Card on Right (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <img
                  src={currentTestimonial.image}
                  alt="Industrial Project"
                  className="w-full h-64 sm:h-72 object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LET'S WORK TOGETHER (CTA Section) */}
      <section id="contact" className="py-16 sm:py-20 bg-[#183b26]">

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-white">
              <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
                Let's Work Together
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Ready to discuss your next project?
              </h2>
              <p className="text-sm text-slate-200">
                Get in touch to learn how Mainstay can support your goals.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#204f32] hover:bg-[#f2f7f4] rounded-lg text-sm font-bold shadow-lg transition-all group cursor-pointer"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
