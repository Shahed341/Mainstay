/**
 * Author: MD Shahed
 * Date: 2026-10-15
 * File Name: client/src/pages/ServicesPage.tsx
 * Description: Services page with engineering capabilities
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Wrench, Building, Zap, Calculator, Box, BarChart3, Users, Search, UserCheck } from 'lucide-react';

interface ServiceItem {
  title: string;
  items?: string[];
}

interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: ServiceItem[];
}

const ENGINEERING_SERVICES: ServiceCategory[] = [
  {
    title: "Mechanical Engineering & Design",
    icon: <Wrench className="w-6 h-6" />,
    services: [
      { title: "Material Handling" },
      { title: "Machine and Equipment Design" },
      { title: "Transfer Chutes" },
      { title: "Ore and Product Storage Bins" },
      { title: "Mechanical Engineering & Design" }
    ]
  },
  {
    title: "Structural Engineering & Design",
    icon: <Building className="w-6 h-6" />,
    services: [
      { title: "Small Structures & Platforms" },
      { title: "Monorails, Lifting Beams, Lifting Lugs, and Lifting Plans" },
      { title: "Structural Connection Design and Shop Drawing Review" },
      { title: "Structural Engineering & Design" }
    ]
  },
  {
    title: "Electrical/Instrumentation Engineering & Design",
    icon: <Zap className="w-6 h-6" />,
    services: [
      { title: "Control Systems Design" },
      { title: "Power Distribution" },
      { title: "Instrumentation & Automation" }
    ]
  },
  {
    title: "Project Studies & Capital Cost Estimates",
    icon: <Calculator className="w-6 h-6" />,
    services: [
      { title: "Feasibility Studies" },
      { title: "Cost Estimation" },
      { title: "Project Planning" }
    ]
  },
  {
    title: "Discrete Element Modeling (DEM)",
    icon: <Box className="w-6 h-6" />,
    services: [
      { title: "Particle Flow Simulation" },
      { title: "Equipment Optimization" },
      { title: "Process Validation" }
    ]
  },
  {
    title: "Finite Element Analysis (FEA)",
    icon: <BarChart3 className="w-6 h-6" />,
    services: [
      { title: "Structural Analysis" },
      { title: "Stress Analysis" },
      { title: "Thermal Analysis" }
    ]
  }
];

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <div className="w-full bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 bg-[#0b1a11] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              Our Services
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Engineering <span className="text-[#99c5b0]">Excellence</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Comprehensive engineering and design services for mining, energy, and industrial projects across Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering Services Grid */}
      <section className="py-16 sm:py-20 bg-[#f2f7f4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGINEERING_SERVICES.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleService(index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#204f32]/10 text-[#204f32] flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#0b1a11]">{category.title}</h3>
                  </div>
                  {expandedService === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {expandedService === index && (
                  <div className="px-6 pb-6 border-t border-slate-100">
                    <ul className="mt-4 space-y-3">
                      {category.services.map((service, sIndex) => (
                        <li
                          key={sIndex}
                          className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                        >
                          <span className="text-sm text-[#204f32] font-medium">{service.title}</span>
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staffing Section */}
      <section className="py-16 sm:py-20 bg-[#faf8f3]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight">
              Who You Need, When You Need Them.
            </h2>
            <div className="w-12 h-1 bg-[#204f32] mx-auto"></div>
            <p className="text-slate-600 leading-relaxed">
              Unlike a staffing agency that sends over resumes they've collected, Mainstay has a deeper understanding of construction project roles and the mining industry. We know that every position on your team has unique requirements, and we take time to understand exactly what those are.
            </p>
            <p className="text-sm text-[#204f32] italic">
              In addition to facilities, we've built lasting relationships in the Canadian mining industry. That network gives us an advantage when it's time to locate qualified candidates for a specific role on your next project.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1a11] tracking-tight text-center mb-12">
            Our Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#204f32] text-white flex items-center justify-center font-bold">
                  1
                </div>
                <Users className="w-6 h-6 text-[#204f32]" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1a11]">Tell Us Who You Need</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Describe the people, the experience, and the knowledge that you need. We'll work with you to build a strategic staffing plan or workforce solution that will flex as needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#204f32] text-white flex items-center justify-center font-bold">
                  2
                </div>
                <Search className="w-6 h-6 text-[#204f32]" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1a11]">We'll Search And Shortlist</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You won't be bombarded with resumes that are near-matches or selected from the pile by an algorithm. We dig much deeper into candidate profiles to ensure a perfect match.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#204f32] text-white flex items-center justify-center font-bold">
                  3
                </div>
                <UserCheck className="w-6 h-6 text-[#204f32]" />
              </div>
              <h3 className="text-xl font-bold text-[#0b1a11]">You'll Meet Them And Choose</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                By the time you meet hand-picked candidates, they will have been interviewed and vetted to ensure they have the right qualifications and relevant experience to work for you.
              </p>
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
                Ready to discuss your project?
              </h2>
              <p className="text-sm text-slate-200">
                Let's talk about how Mainstay can support your engineering needs.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#204f32] hover:bg-[#f2f7f4] rounded-lg text-sm font-bold shadow-lg transition-all group"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
