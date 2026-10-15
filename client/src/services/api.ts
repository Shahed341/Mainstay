/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/services/api.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { ApplicationPayload, Category, Internship, InternshipFilters, SystemHealth } from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:5001/api';

export const fetchHealth = async (): Promise<SystemHealth> => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error('Health check endpoint degraded');
    return await res.json();
  } catch (err: any) {
    return {
      status: 'error',
      service: 'mainstay-api',
      database: 'disconnected',
      timestamp: new Date().toISOString()
    };
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (err) {
    console.error('API Error in fetchCategories:', err);
    return [];
  }
};

export const fetchFeaturedInternships = async (): Promise<Internship[]> => {
  try {
    const res = await fetch(`${API_BASE_URL}/internships/featured`);
    if (!res.ok) throw new Error('Failed to fetch featured internships');
    return await res.json();
  } catch (err) {
    console.error('API Error in fetchFeaturedInternships:', err);
    return [];
  }
};

export const fetchInternships = async (filters: Partial<InternshipFilters>): Promise<{
  data: Internship[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
}> => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.work_type && filters.work_type !== 'all') params.append('work_type', filters.work_type);
    if (filters.location) params.append('location', filters.location);
    if (filters.student_only) params.append('student_only', 'true');
    if (filters.student_term && filters.student_term !== 'all') params.append('student_term', filters.student_term);
    if (filters.company && filters.company !== 'all') params.append('company', filters.company);
    if (filters.page) params.append('page', String(filters.page));

    const res = await fetch(`${API_BASE_URL}/internships?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch internships');
    return await res.json();
  } catch (err) {
    console.error('API Error in fetchInternships:', err);
    return { data: [], pagination: { total: 0, page: 1, limit: 20, totalPages: 0 } };
  }
};

export const fetchInternshipById = async (id: number): Promise<Internship | null> => {
  try {
    const res = await fetch(`${API_BASE_URL}/internships/${id}`);
    if (!res.ok) throw new Error('Failed to fetch internship');
    return await res.json();
  } catch (err) {
    console.error('API Error in fetchInternshipById:', err);
    return null;
  }
};

export const submitApplication = async (payload: ApplicationPayload): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${API_BASE_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to submit application');
  }
  return res.json();
};
