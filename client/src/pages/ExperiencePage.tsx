/**
 * Author: MD Shahed
 * Date: 2026-10-15
 * File Name: client/src/pages/ExperiencePage.tsx
 * Description: Experience page showcasing project portfolio
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase } from 'lucide-react';

interface Project {
  company: string;
  facility: string;
  value: string;
  location: string;
  services: string;
}

const PROJECTS: Project[] = [
  {
    company: "Cameco Corporation",
    facility: "Cigar Lake Project",
    value: "$1.1B",
    location: "Northern SK",
    services: "Project Management, Project Engineering"
  },
  {
    company: "Orano Canada Inc",
    facility: "Jeb Mill Upgrade",
    value: "$50M",
    location: "Northern SK",
    services: "Commissioning Manager"
  },
  {
    company: "Nutrien",
    facility: "Allan Mine",
    value: "<$5M",
    location: "Allan, SK",
    services: "Shaft Supervisor"
  },
  {
    company: "Saturated Rock Fill Water Treatment Projects",
    facility: "Teck Coal",
    value: "$200M",
    location: "Elk Valley, BC",
    services: "Engineering Manager"
  },
  {
    company: "BHP Billiton",
    facility: "Jansen Mine",
    value: ">$5B",
    location: "Saskatoon, SK",
    services: "Project Manager"
  },
  {
    company: "Manitoba Hydro",
    facility: "Keewatinohk",
    value: "$1.2B",
    location: "Northern MB",
    services: "Resident Engineer"
  },
  {
    company: "Cameco Corporation",
    facility: "Port Hope Conversion Facility",
    value: "$100M",
    location: "Port Hope, ON",
    services: "Project Management"
  },
  {
    company: "Nutrien",
    facility: "Vanscoy",
    value: "",
    location: "Vanscoy, SK",
    services: "Construction Manager"
  },
  {
    company: "Nutrien",
    facility: "Rocanville",
    value: "$2M-$31M",
    location: "Rocanville, SK",
    services: "Resident Engineer"
  },
  {
    company: "Mosaic",
    facility: "K2 & K3",
    value: "",
    location: "Esterhazy, SK",
    services: "Construction Coordination"
  },
  {
    company: "K+S",
    facility: "Bethune",
    value: "$350k-$6.5M",
    location: "Bethune, SK",
    services: "Construction Manager"
  },
  {
    company: "Gunnar Mines",
    facility: "Gunnar Mines",
    value: "$2M-$31M",
    location: "Gunnar, SK",
    services: "Site Management"
  }
];

export const ExperiencePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-[#0b1a11] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              Our Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Our Experiences
            </h1>
            <p className="text-slate-300 leading-relaxed">
              A proven track record of delivering engineering excellence across Canada's mining and industrial sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="bg-[#c4ded0] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-[#204f32] mb-4">{project.company}</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-[#0b1a11]">Project/Facility:</span>{' '}
                    <span className="text-[#204f32]">{project.facility}</span>
                  </div>

                  {project.value && (
                    <div>
                      <span className="font-semibold text-[#0b1a11]">Project Value:</span>{' '}
                      <span className="text-[#204f32]">{project.value}</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#99c5b0]/50">
                    <div className="flex items-start gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                      <span><span className="font-medium">Location:</span> {project.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-[#204f32]">
                    <Briefcase className="w-4 h-4 mt-0.5 shrink-0" />
                    <span><span className="font-medium text-slate-700">Services:</span> {project.services}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#204f32] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black">$25M – $1.2B</div>
              <div className="text-sm text-[#99c5b0] mt-1">Projects Supported</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">12+</div>
              <div className="text-sm text-[#99c5b0] mt-1">Major Projects</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">100%</div>
              <div className="text-sm text-[#99c5b0] mt-1">Completion Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black">5+</div>
              <div className="text-sm text-[#99c5b0] mt-1">Provinces Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-[#183b26]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Ready to add your project to our portfolio?
          </h2>
          <p className="text-slate-200 mb-8">
            Let's discuss how Mainstay can support your next project.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#204f32] hover:bg-[#f2f7f4] rounded-lg text-sm font-bold shadow-lg transition-all"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};
