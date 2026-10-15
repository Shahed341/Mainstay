/**
 * Author: MD Shahed
 * Date: 2026-10-11
 * File Name: client/src/components/Navbar.tsx
 * Modified Last: 2026-10-15
 * Description: uofs student 4th year
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCareers = location.pathname.startsWith('/careers') || location.pathname.startsWith('/jobs');
  const isAbout = location.pathname.startsWith('/about');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Navigation Links */}
          <div className="flex items-center gap-8">
            {/* Logo */}
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

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
              <a
                href="/#services"
                className="hover:text-[#204f32] transition-colors"
              >
                Services
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

              <button
                onClick={onContactClick}
                className="hover:text-[#204f32] transition-colors cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Right: Contact Button (Desktop) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onContactClick}
              className="px-5 py-2 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile: Hamburger Menu */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-[#204f32] hover:bg-[#f2f7f4] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 animate-slideDown">
          <a
            href="/#services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4] transition-colors"
          >
            Services
          </a>

          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              isAbout ? 'bg-[#204f32] text-white' : 'text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4]'
            }`}
          >
            About
          </Link>

          <Link
            to="/careers"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              isCareers ? 'bg-[#204f32] text-white' : 'text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4]'
            }`}
          >
            Careers
          </Link>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onContactClick?.();
            }}
            className="block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#204f32] hover:bg-[#f2f7f4] transition-colors"
          >
            Contact
          </button>

          <div className="pt-3 px-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onContactClick?.();
              }}
              className="w-full py-3 bg-[#204f32] hover:bg-[#183b26] text-white rounded-lg text-sm font-bold shadow-sm transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
