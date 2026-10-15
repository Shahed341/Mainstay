/**
 * Author: MD Shahed
 * Date: 2026-10-15
 * File Name: client/src/pages/NewsPage.tsx
 * Description: News and announcements page
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';

interface NewsItem {
  date: string;
  title: string;
  content: string[];
  highlight?: boolean;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    date: "September 1, 2026",
    title: "Mainstay Engineers Acquires RCH Consulting Ltd.",
    highlight: true,
    content: [
      "Mainstay Engineers is pleased to announce the acquisition of RCH Consulting Ltd., a Saskatchewan-based engineering consultancy with a strong reputation for practical solutions, technical expertise, and trusted client relationships.",
      "The addition of RCH strengthens Mainstay's engineering capabilities and expands the depth of experience we bring to clients across Canada's mining and industrial sectors.",
      "The two organizations share a common approach to engineering: understand the client, solve the right problem, and deliver practical solutions that work in the real world.",
      "This acquisition marks another important step in Mainstay's growth. As a Saskatchewan-based, Indigenous-owned engineering company, we are continuing to build the expertise, capacity, and local presence needed to support clients through every stage of project delivery.",
      "We are proud to welcome the RCH team to Mainstay and excited about what we'll build together."
    ]
  },
  {
    date: "March 15, 2025",
    title: "Mainstay Merges with Owner Reps Division",
    content: [
      "Mainstay Engineers has completed a strategic merger to expand our owner representation services.",
      "This merger enhances our ability to provide comprehensive project oversight and owner-focused support for major mining and industrial projects across Canada.",
      "The combined team brings decades of experience in project management, construction oversight, and engineering excellence."
    ]
  },
  {
    date: "January 10, 2025",
    title: "Expanding Our Team in Northern Saskatchewan",
    content: [
      "Mainstay is proud to announce the expansion of our team to better serve clients in Northern Saskatchewan's mining sector.",
      "Our growing presence in the region reflects our commitment to supporting resource development while fostering opportunities for Indigenous communities."
    ]
  }
];

export const NewsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-[#0b1a11] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-[#99c5b0]">
              Stay Informed
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              News & Updates
            </h1>
            <p className="text-slate-300 leading-relaxed">
              The latest announcements and updates from Mainstay.
            </p>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {NEWS_ITEMS.map((item, index) => (
              <article
                key={index}
                className={`bg-white rounded-xl p-8 shadow-sm border ${
                  item.highlight ? 'border-[#204f32] ring-1 ring-[#204f32]/20' : 'border-slate-200'
                }`}
              >
                {item.highlight && (
                  <div className="inline-block px-3 py-1 bg-[#204f32] text-white text-xs font-bold rounded-full mb-4">
                    Latest
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <time>{item.date}</time>
                </div>

                <h2 className="text-2xl font-bold text-[#0b1a11] mb-4">{item.title}</h2>

                <div className="space-y-4 text-slate-600 leading-relaxed">
                  {item.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#183b26]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
            Want to learn more about Mainstay?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/about')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#204f32] hover:bg-[#f2f7f4] rounded-lg text-sm font-bold shadow-md transition-all group cursor-pointer"
            >
              <span>About Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => navigate('/careers')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-lg text-sm font-bold transition-all cursor-pointer"
            >
              <span>View Careers</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
