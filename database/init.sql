-- Author: MD Shahed
-- Date: 2026-09-27
-- File Name: database/init.sql
-- Modified Last: 2026-09-27
-- Description: uofs student 4th year

CREATE USER IF NOT EXISTS 'mainstay_user'@'%' IDENTIFIED BY 'mainstay_password';
GRANT ALL PRIVILEGES ON mainstay_db.* TO 'mainstay_user'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS mainstay_db;
USE mainstay_db;

DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS internships;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS categories;

-- 1. Categories Table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50) DEFAULT 'Briefcase',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Companies Table
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  logo_url VARCHAR(255) DEFAULT NULL,
  website VARCHAR(255) DEFAULT NULL,
  location VARCHAR(150) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Internships / Student Positions Table
CREATE TABLE internships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  category_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT DEFAULT NULL,
  location VARCHAR(150) NOT NULL,
  work_type ENUM('remote', 'hybrid', 'on-site') DEFAULT 'remote',
  stipend VARCHAR(100) DEFAULT NULL,
  duration VARCHAR(50) DEFAULT NULL,
  deadline DATE DEFAULT NULL,
  is_student_position BOOLEAN DEFAULT TRUE,
  student_term VARCHAR(50) DEFAULT 'Summer 2027',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Applications Table (Supports 'Tell Us How You Think' Assessment)
CREATE TABLE applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  internship_id INT NOT NULL,
  applicant_name VARCHAR(150) NOT NULL,
  applicant_email VARCHAR(150) NOT NULL,
  school VARCHAR(150) DEFAULT NULL,
  program VARCHAR(150) DEFAULT NULL,
  student_year VARCHAR(50) DEFAULT NULL,
  coop_term VARCHAR(50) DEFAULT NULL,
  coop_length VARCHAR(50) DEFAULT NULL,
  problem_solving_style VARCHAR(255) DEFAULT NULL,
  areas_of_interest TEXT DEFAULT NULL,
  ideal_coop_day VARCHAR(255) DEFAULT NULL,
  curiosity_answer TEXT DEFAULT NULL,
  superpower_skill VARCHAR(255) DEFAULT NULL,
  resume_link VARCHAR(255) NOT NULL,
  cover_note TEXT DEFAULT NULL,
  status ENUM('pending', 'reviewed', 'accepted', 'rejected') DEFAULT 'pending',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data: Categories
INSERT INTO categories (id, name, slug, icon) VALUES
(1, 'Engineering & Design', 'engineering-design', 'Cpu'),
(2, 'Construction & Field Work', 'construction-field', 'HardHat'),
(3, 'Project Management', 'project-management', 'Kanban'),
(4, 'Business & Strategy', 'business-strategy', 'TrendingUp'),
(5, 'Data & Technology', 'data-tech', 'Code'),
(6, 'Business Development', 'business-dev', 'Building'),
(7, 'Marketing & Communications', 'marketing-comms', 'Megaphone');

-- Seed Data: Companies (Featured Partner: Orano)
INSERT INTO companies (id, name, logo_url, website, location, description) VALUES
(1, 'Orano Canada', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=100&h=100&fit=crop', 'https://www.orano.group/canada', 'Saskatoon, SK', 'Global leader in nuclear energy and sustainable resource transformation with major mining operations in Saskatchewan.'),
(2, 'TechCorp Labs', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop', 'https://techcorp.example.com', 'Saskatoon, SK', 'Fast-growing software engineering and AI innovation laboratory.'),
(3, 'Nova Digital Systems', 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop', 'https://novadigital.example.com', 'Toronto, ON', 'Product design, UX engineering, and digital modernization studio.'),
(4, 'CloudScale Systems', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop', 'https://cloudscale.example.com', 'Vancouver, BC', 'Scalable cloud infrastructure, DevOps, and site reliability engineering consultancy.');

-- Seed Data: Internships & Student Co-op Positions
INSERT INTO internships (company_id, category_id, title, description, requirements, location, work_type, stipend, duration, deadline, is_student_position, student_term, is_featured, is_active) VALUES
(1, 1, 'Engineering & Project Co-op (Mining & Processing)', 'Work with Orano’s engineering team on site operations, equipment reliability, and process optimization for uranium recovery facilities.', 'Enrolled in Chemical, Mechanical, or Mining Engineering. Strong analytical and problem-solving mindset.', 'Saskatoon / McClean Lake, SK', 'hybrid', '$36/hr', '4 to 8 months', '2026-11-30', TRUE, 'Summer 2027', TRUE, TRUE),
(1, 2, 'Field Operations & Environmental Student', 'Gain hands-on field and site experience monitoring environmental parameters, sampling, and supporting radiation protection programs.', 'Enrolled in Environmental Science, Geological Engineering, or related field. Valid driver’s license.', 'McClean Lake / Cigar Lake, SK', 'on-site', '$34/hr + Site Allowance', '4 months', '2026-12-15', TRUE, 'Summer 2027', TRUE, TRUE),
(1, 5, 'Data & Technology Student Intern', 'Develop internal automation dashboards, data pipelines, and reporting tools to support Orano Canada’s operational efficiency.', 'Experience in Python, SQL, PowerBI/Excel, or TypeScript/React. Passion for optimizing workflows.', 'Saskatoon, SK', 'hybrid', '$33/hr', '4 months', '2026-12-01', TRUE, 'Fall 2026 / Summer 2027', TRUE, TRUE),
(2, 5, 'Full-Stack Developer Intern', 'Build modern web applications using React, TypeScript, Node.js, and MySQL for student and enterprise platforms.', 'JavaScript/TypeScript, React basics, understanding of REST APIs and relational databases.', 'Saskatoon, SK', 'remote', '$32/hr', '4 months', '2026-11-15', TRUE, 'Summer 2027', TRUE, TRUE),
(3, 1, 'UI/UX Product Design Student', 'Collaborate on design systems, Figma wireframes, and interactive student application workflows.', 'Figma proficiency, portfolio of student or personal projects, user empathy.', 'Toronto, ON', 'remote', '$29/hr', '4 months', '2026-12-10', TRUE, 'Summer 2027', FALSE, TRUE),
(4, 3, 'Project Coordination & Tech Co-op', 'Assist agile project managers in sprint tracking, stakeholder updates, and technical documentation delivery.', 'Strong organizational skills, ability to coordinate cross-functional teams, basic technical knowledge.', 'Vancouver, BC', 'hybrid', '$31/hr', '8 months', '2026-11-20', TRUE, 'Winter 2027', FALSE, TRUE);
