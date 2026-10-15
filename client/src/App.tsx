/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/App.tsx
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Category, Internship, InternshipFilters, SystemHealth } from './types';
import { fetchCategories, fetchFeaturedInternships, fetchInternships, fetchHealth } from './services/api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CareerPage } from './pages/CareerPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ApplyPage } from './pages/ApplyPage';
import { ApplicationModal } from './components/ApplicationModal';

export const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setFeaturedInternships] = useState<Internship[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);

  // Careers state
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoadingInternships, setIsLoadingInternships] = useState<boolean>(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12, totalPages: 1 });

  // Filters State
  const [filters, setFilters] = useState<InternshipFilters>({
    search: '',
    category: 'all',
    work_type: 'all',
    location: '',
    student_only: true,
    student_term: 'all',
    company: 'all',
    sort_by: 'relevant',
    page: 1
  });

  // Applying Internship state for modal
  const [applyingInternship, setApplyingInternship] = useState<Internship | null>(null);

  // Initial load
  useEffect(() => {
    const loadSystem = async () => {
      const [cats, featured, health] = await Promise.all([
        fetchCategories(),
        fetchFeaturedInternships(),
        fetchHealth()
      ]);
      setCategories(cats);
      setFeaturedInternships(featured);
      setSystemHealth(health);
    };
    loadSystem();
  }, []);

  // Fetch internships when filters change
  useEffect(() => {
    const loadInternships = async () => {
      setIsLoadingInternships(true);
      const res = await fetchInternships({ ...filters, page: filters.page });
      setInternships(res.data);
      setPagination(res.pagination);
      setIsLoadingInternships(false);
    };
    loadInternships();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<InternshipFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      work_type: 'all',
      location: '',
      student_only: false,
      student_term: 'all',
      company: 'all',
      sort_by: 'relevant',
      page: 1
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-mainstay-700 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Pages with Dedicated Routes */}
      <main className="flex-1">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={<HomePage systemHealth={systemHealth} />}
          />

          {/* About Route */}
          <Route
            path="/about"
            element={<AboutPage />}
          />

          {/* Careers & Student Jobs Route */}
          <Route
            path="/careers"
            element={
              <CareerPage
                categories={categories}
                internships={internships}
                filters={filters}
                isLoading={isLoadingInternships}
                pagination={pagination}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                onApplyInternship={(i) => {
                  window.open(`/apply/${i.id}`, '_blank');
                }}
              />
            }
          />

          {/* Dedicated Job Detail Route */}
          <Route
            path="/careers/:id"
            element={
              <JobDetailPage
                onApply={(i) => {
                  window.open(`/apply/${i.id}`, '_blank');
                }}
              />
            }
          />

          {/* Jobs alias route */}
          <Route
            path="/jobs/:id"
            element={
              <JobDetailPage
                onApply={(i) => {
                  window.open(`/apply/${i.id}`, '_blank');
                }}
              />
            }
          />

          {/* Dedicated Single-Page Application Route (Opened in New Window) */}
          <Route path="/apply/:id" element={<ApplyPage />} />
          <Route path="/careers/:id/apply" element={<ApplyPage />} />
          <Route path="/jobs/:id/apply" element={<ApplyPage />} />

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Application Modal (Fallback) */}
      <ApplicationModal
        internship={applyingInternship}
        onClose={() => setApplyingInternship(null)}
      />
    </div>
  );
};

export default App;
