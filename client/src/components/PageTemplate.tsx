/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/components/PageTemplate.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

/* 1. Reusable Page Container */
export const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  maxWidth?: '4xl' | '5xl' | '6xl' | '7xl' | 'full';
}> = ({ children, className = '', maxWidth = '6xl' }) => {
  const maxClass = 
    maxWidth === '4xl' ? 'max-w-4xl' : 
    maxWidth === '5xl' ? 'max-w-5xl' : 
    maxWidth === '7xl' ? 'max-w-7xl' : 
    maxWidth === 'full' ? 'max-w-full' : 'max-w-6xl';
  return (
    <div className={`${maxClass} mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 ${className}`}>
      {children}
    </div>
  );
};

/* 2. Reusable Page Hero Banner */
export interface PageHeroProps {
  title: string;
  highlightedTitle?: string;
  subtitle?: string | React.ReactNode;
  badgeText?: string;
  badgeIcon?: LucideIcon;
  primaryAction?: {
    label: string;
    onClick?: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
  };
  backgroundImage?: string;
  variant?: 'spotlight' | 'dark' | 'minimal';
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  highlightedTitle,
  subtitle,
  badgeText,
  badgeIcon: BadgeIcon,
  primaryAction,
  secondaryAction,
  backgroundImage,
  variant = 'spotlight'
}) => {
  if (variant === 'dark') {
    return (
      <div className="relative rounded-2xl bg-[#204f32] text-white p-8 sm:p-12 overflow-hidden border border-[#183b26] shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-4 text-left">
          {badgeText && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 border border-white/20 text-[#c4ded0] text-xs font-bold backdrop-blur">
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#c4ded0]" />}
              <span>{badgeText}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}{' '}
            {highlightedTitle && <span className="text-[#c4ded0]">{highlightedTitle}</span>}
          </h1>

          {subtitle && (
            <div className="text-slate-100 text-sm sm:text-base leading-relaxed max-w-lg font-medium">
              {subtitle}
            </div>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="pt-2 flex flex-wrap gap-3">
              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="bg-white hover:bg-[#f2f7f4] text-[#204f32] px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{primaryAction.label}</span>
                  {primaryAction.icon && <primaryAction.icon className="w-4 h-4 text-[#204f32]" />}
                </button>
              )}
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  {secondaryAction.label}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default Spotlight Hero
  return (
    <div className="relative rounded-2xl border border-[#c4ded0] overflow-hidden shadow-xs min-h-[340px] sm:min-h-[380px] flex items-center bg-[#f2f7f4]">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-no-repeat bg-right bg-contain sm:bg-cover opacity-90 pointer-events-none"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}

      {/* Seamless Gradient for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f2f7f4] via-[#f2f7f4]/95 sm:via-[#f2f7f4]/85 to-transparent w-full sm:w-3/5" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl p-8 sm:p-12 space-y-4 text-left">
        {badgeText && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#c4ded0]/50 border border-[#99c5b0] text-[#204f32] text-xs font-bold">
            {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 text-[#204f32]" />}
            <span>{badgeText}</span>
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#204f32] tracking-tight leading-tight">
          {title}{' '}
          {highlightedTitle && <span className="text-[#0b1a11]">{highlightedTitle}</span>}
        </h1>

        {subtitle && (
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed max-w-lg">
            {subtitle}
          </div>
        )}

        {primaryAction && (
          <div className="pt-2">
            <button
              type="button"
              onClick={primaryAction.onClick}
              className="bg-[#204f32] hover:bg-[#183b26] text-white px-8 py-3 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>{primaryAction.label}</span>
              {primaryAction.icon && <primaryAction.icon className="w-4 h-4 text-[#c4ded0]" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* 3. Reusable Content Card / Box */
export const CardBox: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200 ${
        hoverable ? 'hover:border-[#204f32] hover:shadow-xs transition-all duration-150 cursor-pointer' : ''
      } p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
};

/* 4. Reusable Brand Badge */
export const BrandBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'mint' | 'sage' | 'deep' | 'outline';
  className?: string;
}> = ({ children, variant = 'mint', className = '' }) => {
  const variantStyles = {
    mint: 'bg-[#c4ded0]/40 text-[#204f32] border border-[#c4ded0]',
    sage: 'bg-[#99c5b0]/30 text-[#204f32] border border-[#99c5b0]',
    deep: 'bg-[#204f32] text-white border border-[#204f32]',
    outline: 'bg-transparent text-slate-700 border border-slate-300'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

/* 5. Reusable Brand Button */
export const BrandButton: React.FC<{
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'mint' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}> = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
  const variantStyles = {
    primary: 'bg-[#204f32] hover:bg-[#183b26] text-white shadow-xs',
    secondary: 'bg-white hover:bg-[#f2f7f4] text-[#204f32] border border-slate-200',
    mint: 'bg-[#c4ded0] hover:bg-[#b0d2c0] text-[#204f32] font-bold shadow-xs',
    outline: 'bg-transparent hover:bg-slate-50 text-slate-700 border border-slate-300'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

