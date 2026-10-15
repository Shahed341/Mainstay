/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/HeroSection.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React, { useState } from 'react';
import { Search, MapPin, Sparkles, TrendingUp, Building2, Users } from 'lucide-react';
import { Category } from '../types';

interface HeroSectionProps {
  categories: Category[];
  onSearchSubmit: (searchTerm: string, category: string) => void;
  onExploreAll: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  categories,
  onSearchSubmit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchTerm, selectedCategory);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-mainstay-50/70 via-white to-slate-50 py-16 sm:py-24 border-b border-slate-200">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-mainstay-100 text-mainstay-800 text-xs font-bold mb-6 shadow-xs border border-mainstay-200">
          <Sparkles className="w-3.5 h-3.5 text-mainstay-700" />
          <span>Launch Your Tech & Engineering Career</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-mainstay-950 tracking-tight max-w-4xl mx-auto leading-tight">
          Find The Best Internship <br className="hidden sm:block" />
          <span className="text-mainstay-700">
            Opportunities In Canada
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Connect directly with top companies like Orano, tech labs, and industry leaders hiring interns across Engineering, Data, and Field Operations.
        </p>

        {/* Search Box */}
        <div className="mt-8 max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col sm:flex-row gap-2"
          >
            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-3 py-2 bg-slate-50 rounded-xl">
              <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Job title, skills, or Orano..."
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Category Select */}
            <div className="flex items-center px-3 py-2 bg-slate-50 rounded-xl sm:w-56">
              <MapPin className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All Disciplines</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-mainstay-700 hover:bg-mainstay-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>

          {/* Quick Category Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Popular:</span>
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  onSearchSubmit(searchTerm, cat.slug);
                }}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-mainstay-500 hover:text-mainstay-800 transition-colors shadow-xs font-medium"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Highlights Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-slate-200 text-left">
          <div className="flex items-center gap-3.5 bg-white/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-mainstay-50 text-mainstay-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-mainstay-950">500+</div>
              <div className="text-xs text-slate-500">Verified Internships</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-mainstay-950">Orano Partner</div>
              <div className="text-xs text-slate-500">Featured Industry Leader</div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center gap-3.5 bg-white/80 p-3.5 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-mainstay-50 text-mainstay-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-mainstay-950">4th Year UofS</div>
              <div className="text-xs text-slate-500">Student Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
