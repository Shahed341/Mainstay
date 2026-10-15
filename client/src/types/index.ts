/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: client/src/types/index.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

export type WorkType = 'remote' | 'hybrid' | 'on-site';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  created_at: string;
}

export interface Internship {
  id: number;
  company_id: number;
  category_id: number;
  title: string;
  description: string;
  requirements?: string;
  location: string;
  work_type: WorkType;
  stipend?: string;
  duration?: string;
  deadline?: string;
  is_student_position: boolean;
  student_term?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  company_name?: string;
  company_logo?: string;
  company_website?: string;
  company_description?: string;
  category_name?: string;
  category_slug?: string;
}

export interface ApplicationPayload {
  internship_id: number;
  applicant_name: string;
  applicant_email: string;
  school?: string;
  program?: string;
  student_year?: string;
  coop_term?: string;
  coop_length?: string;
  problem_solving_style?: string;
  areas_of_interest?: string[];
  ideal_coop_day?: string;
  curiosity_answer?: string;
  superpower_skill?: string;
  resume_link: string;
  cover_note?: string;
}

export interface InternshipFilters {
  search: string;
  category: string;
  work_type: string;
  location: string;
  student_only: boolean;
  student_term: string;
  company: string;
  sort_by: string;
  page: number;
}

export interface SystemHealth {
  status: string;
  service: string;
  database: 'connected' | 'disconnected' | 'unknown';
  timestamp: string;
}
