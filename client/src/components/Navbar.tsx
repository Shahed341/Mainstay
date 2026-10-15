/**
 * Author: MD Shahed
 * Date: 2026-10-11
 * File Name: client/src/components/Navbar.tsx
 * Modified Last: 2026-10-11
 * Description: uofs student 4th year
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCareers = location.pathname.startsWith('/careers') || location.pathname.startsWith('/jobs');
  const isAbout = location.pathname.startsWith('/about');
  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Logo */}
          <Link 
            to="/"
            className="flex items-center cursor-pointer group shrink-0"
          >
            <img
              src="/MAINSTAY_Logo.jpg"
              alt="Mainstay Logo"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Center Navigation Links (Matching Mockup) */}
          <nav className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-semibold text-slate-700">
            <a
              href="/#services"
              className="hover:text-[#204f32] transition-colors"
            >
              Services
            </a>

            <a
              href="/#projects"
              className="hover:text-[#204f32] transition-colors"
            >
              Projects
            </a>

            <Link
              to="/about"
              className={`transition-colors ${
                isAbout ? 'text-[#204f32] font-bold' : 'hover:text-[#204f32]'
              }`}
            >
              About
            </Link>

            <Link
              to="/careers"
              className={`transition-colors ${
                isCareers ? 'text-[#204f32] font-bold' : 'hover:text-[#204f32]'
              }`}
            >
              Careers
            </Link>
          </nav>

          {/* Right: Search Icon + Contact Us Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/careers"
              title="Search opportunities"
              aria-label="Search"
              className="p-2 text-slate-600 hover:text-[#204f32] hover:bg-slate-50 rounded-full transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#204f32] hover:bg-[#183b26] text-white rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer group"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/careers"
              aria-label="Search"
              className="p-2 text-slate-600 hover:text-[#204f32]"
            >
              <Search className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#204f32] hover:bg-[#f2f7f4] border border-transparent hover:border-slate-200 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2">
          <a
            href="/#services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4]"
          >
            Services
          </a>
          <a
            href="/#projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4]"
          >
            Projects
          </a>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
              isAbout ? 'bg-[#204f32] text-white' : 'text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4]'
            }`}
          >
            About
          </Link>
          <Link
            to="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
              isCareers ? 'bg-[#204f32] text-white' : 'text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4]'
            }`}
          >
            Careers
          </Link>
          <div className="pt-2">
            <a
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-[#204f32] text-white rounded-lg text-sm font-bold shadow-xs"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
