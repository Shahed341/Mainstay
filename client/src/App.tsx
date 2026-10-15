/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/App.tsx
 * Modified Last: 2026-10-15
 * Description: uofs student 4th year
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Category, Internship, InternshipFilters, SystemHealth } from './types';
import { fetchCategories, fetchFeaturedInternships, fetchInternships, fetchHealth } from './services/api';
import { MOCK_CATEGORIES, MOCK_INTERNSHIPS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { CareerPage } from './pages/CareerPage';
import { JobDetailPage } from './pages/JobDetailPage';
import { ApplyPage } from './pages/ApplyPage';
import { ApplicationModal } from './components/ApplicationModal';

// Smooth scroll for anchor links
const ScrollToAnchor: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
};

export const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setFeaturedInternships] = useState<Internship[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);

  // Careers state
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoadingInternships, setIsLoadingInternships] = useState<boolean>(true);
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

  // Initial load - use mock data as fallback
  useEffect(() => {
    const loadSystem = async () => {
      try {
        const [cats, featured, health] = await Promise.all([
          fetchCategories(),
          fetchFeaturedInternships(),
          fetchHealth()
        ]);
        // If API returns empty, use mock data
        setCategories(cats.length > 0 ? cats : MOCK_CATEGORIES);
        setFeaturedInternships(featured.length > 0 ? featured : MOCK_INTERNSHIPS.filter(i => i.is_featured));
        setSystemHealth(health);
      } catch {
        // Fallback to mock data
        setCategories(MOCK_CATEGORIES);
        setFeaturedInternships(MOCK_INTERNSHIPS.filter(i => i.is_featured));
        setSystemHealth({ status: 'demo', service: 'mainstay-api', database: 'disconnected', timestamp: new Date().toISOString() });
      }
    };
    loadSystem();
  }, []);

  // Fetch internships when filters change - with mock data fallback
  useEffect(() => {
    const loadInternships = async () => {
      setIsLoadingInternships(true);

      try {
        const res = await fetchInternships({ ...filters, page: filters.page });

        // If API returns data, use it
        if (res.data.length > 0) {
          setInternships(res.data);
          setPagination(res.pagination);
        } else {
          // Use mock data with client-side filtering
          useMockData();
        }
      } catch {
        // Fallback to mock data
        useMockData();
      }

      setIsLoadingInternships(false);
    };

    const useMockData = () => {
      let filtered = [...MOCK_INTERNSHIPS];

      // Apply filters
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(i =>
          i.title.toLowerCase().includes(searchLower) ||
          i.company_name?.toLowerCase().includes(searchLower) ||
          i.description.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category !== 'all') {
        filtered = filtered.filter(i => i.category_slug === filters.category);
      }

      if (filters.work_type !== 'all') {
        filtered = filtered.filter(i => i.work_type === filters.work_type);
      }

      if (filters.student_only) {
        filtered = filtered.filter(i => i.is_student_position);
      }

      if (filters.company !== 'all') {
        filtered = filtered.filter(i => i.company_name === filters.company);
      }

      // Sort
      if (filters.sort_by === 'newest') {
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }

      // Paginate
      const limit = 12;
      const start = (filters.page - 1) * limit;
      const paginatedData = filtered.slice(start, start + limit);

      setInternships(paginatedData);
      setPagination({
        total: filtered.length,
        page: filters.page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      });
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
      {/* Smooth scroll handler */}
      <ScrollToAnchor />

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

          {/* Services Route */}
          <Route
            path="/services"
            element={<ServicesPage />}
          />

          {/* Experience Route */}
          <Route
            path="/experience"
            element={<ExperiencePage />}
          />

          {/* News Route */}
          <Route
            path="/news"
            element={<NewsPage />}
          />

          {/* Contact Route */}
          <Route
            path="/contact"
            element={<ContactPage />}
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
