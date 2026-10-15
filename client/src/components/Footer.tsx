/**
 * Author: MD Shahed
 * Date: 2026-10-11
 * File Name: client/src/components/Footer.tsx
 * Modified Last: 2026-10-11
 * Description: uofs student 4th year
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="bg-[#0b1a11] text-slate-300 text-sm border-t border-[#183b26]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/MAINSTAY_Logo.jpg"
                alt="Mainstay Logo"
                className="h-10 w-auto object-contain rounded"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Engineering and project delivery support for mining, energy and industrial projects.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#99c5b0] hover:text-[#99c5b0] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:Contact@Mainstayreps.Com"
                aria-label="Email"
                className="w-8 h-8 rounded-full border border-white/20 hover:border-[#99c5b0] hover:text-[#99c5b0] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/" className="hover:text-[#99c5b0] transition-colors">Home</Link></li>
              <li><a href="/#services" className="hover:text-[#99c5b0] transition-colors">Services</a></li>
              <li><a href="/#projects" className="hover:text-[#99c5b0] transition-colors">Projects</a></li>
              <li><Link to="/about" className="hover:text-[#99c5b0] transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-[#99c5b0] transition-colors">Careers</Link></li>
              <li><button onClick={onContactClick} className="hover:text-[#99c5b0] transition-colors">Contact</button></li>
            </ul>
          </div>

          {/* Our Services (3 Cols) */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">Our Services</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200 cursor-default">Engineering</li>
              <li className="hover:text-slate-200 cursor-default">Project Delivery</li>
              <li className="hover:text-slate-200 cursor-default">Owner's Representation</li>
              <li className="hover:text-slate-200 cursor-default">Field Services</li>
              <li className="hover:text-slate-200 cursor-default">Operational Excellence</li>
            </ul>
          </div>

          {/* Location (2 Cols) */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase mb-3">Contact</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div>
                <div className="font-medium text-slate-300">602 48th Street East</div>
                <div>Saskatoon, SK S7K 6K4</div>
              </div>
              <div className="text-slate-300">(306) 500-6269</div>
              <a href="mailto:Contact@Mainstayreps.Com" className="hover:text-[#99c5b0] transition-colors">
                Contact@Mainstayreps.Com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Mainstay. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>|</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
