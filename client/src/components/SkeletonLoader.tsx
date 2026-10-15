import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div
    className={`bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
  />
);

export const JobCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-pulse">
    <div className="space-y-3 flex-1">
      {/* Title */}
      <Skeleton className="h-5 w-3/4 sm:w-1/2" />

      {/* Location & Company */}
      <Skeleton className="h-4 w-1/2 sm:w-1/3" />

      {/* Meta info */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>

    {/* Button */}
    <div className="shrink-0">
      <Skeleton className="h-9 w-20 rounded-lg" />
    </div>
  </div>
);

export const JobListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <JobCardSkeleton key={i} />
    ))}
  </div>
);

export const FilterBarSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    {/* Search bar row */}
    <div className="flex items-center gap-2 sm:gap-3">
      <Skeleton className="flex-1 h-11 rounded-lg" />
      <Skeleton className="h-11 w-28 sm:w-36 rounded-lg" />
      <Skeleton className="h-11 w-11 rounded-lg" />
    </div>

    {/* Results header */}
    <div className="bg-white rounded-lg border border-slate-200 px-4 py-3 flex items-center justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="relative rounded-2xl border border-slate-200 overflow-hidden min-h-[340px] sm:min-h-[380px] bg-slate-100 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 to-transparent w-3/5" />
    <div className="relative z-10 p-8 sm:p-12 space-y-4 max-w-xl">
      <Skeleton className="h-6 w-32 rounded-md" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-2/3" />
      <div className="pt-4">
        <Skeleton className="h-12 w-36 rounded-lg" />
      </div>
    </div>
  </div>
);
