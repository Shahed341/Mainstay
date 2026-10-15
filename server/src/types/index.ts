/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/types/index.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

export type WorkType = 'remote' | 'hybrid' | 'on-site';

export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  created_at: string;
}

export interface Company {
  id: number;
  name: string;
  logo_url?: string;
  website?: string;
  location?: string;
  description?: string;
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
  // Joined fields
  company_name?: string;
  company_logo?: string;
  company_website?: string;
  company_description?: string;
  category_name?: string;
  category_slug?: string;
}

export interface Application {
  id?: number;
  internship_id: number;
  applicant_name: string;
  applicant_email: string;
  school?: string;
  program?: string;
  student_year?: string;
  coop_term?: string;
  coop_length?: string;
  problem_solving_style?: string;
  areas_of_interest?: string;
  ideal_coop_day?: string;
  curiosity_answer?: string;
  superpower_skill?: string;
  resume_link: string;
  cover_note?: string;
  status?: ApplicationStatus;
  applied_at?: string;
}
