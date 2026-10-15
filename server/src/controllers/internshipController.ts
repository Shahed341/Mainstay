/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/controllers/internshipController.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Request, Response } from 'express';
import pool from '../config/db.js';
import { Internship } from '../types/index.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const BASE_QUERY = `
  SELECT 
    i.*,
    c.name AS company_name,
    c.logo_url AS company_logo,
    c.website AS company_website,
    c.description AS company_description,
    cat.name AS category_name,
    cat.slug AS category_slug
  FROM internships i
  JOIN companies c ON i.company_id = c.id
  JOIN categories cat ON i.category_id = cat.id
`;

export const getInternships = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, category, work_type, location, student_only, student_term, company, limit = 20, page = 1 } = req.query;

    const conditions: string[] = ['i.is_active = TRUE'];
    const params: any[] = [];

    if (search && typeof search === 'string' && search.trim() !== '') {
      conditions.push('(i.title LIKE ? OR i.description LIKE ? OR c.name LIKE ? OR i.requirements LIKE ?)');
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (category && typeof category === 'string' && category !== 'all') {
      conditions.push('(cat.slug = ? OR cat.id = ?)');
      params.push(category, category);
    }

    if (work_type && typeof work_type === 'string' && work_type !== 'all') {
      conditions.push('i.work_type = ?');
      params.push(work_type);
    }

    if (location && typeof location === 'string' && location.trim() !== '') {
      conditions.push('i.location LIKE ?');
      params.push(`%${location.trim()}%`);
    }

    if (student_only === 'true' || student_only === '1') {
      conditions.push('i.is_student_position = TRUE');
    }

    if (student_term && typeof student_term === 'string' && student_term !== 'all') {
      conditions.push('i.student_term LIKE ?');
      params.push(`%${student_term}%`);
    }

    if (company && typeof company === 'string' && company !== 'all') {
      conditions.push('(c.name LIKE ? OR c.id = ?)');
      params.push(`%${company}%`, company);
    }

    const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';
    const offset = (Number(page) - 1) * Number(limit);

    const countQuery = `
      SELECT COUNT(*) as total
      FROM internships i
      JOIN companies c ON i.company_id = c.id
      JOIN categories cat ON i.category_id = cat.id
      ${whereClause}
    `;
    const [countRows] = await pool.query<RowDataPacket[]>(countQuery, params);
    const total = countRows[0]?.total || 0;

    const fullQuery = `
      ${BASE_QUERY}
      ${whereClause}
      ORDER BY i.is_featured DESC, i.created_at DESC
      LIMIT ? OFFSET ?
    `;
    const queryParams = [...params, Number(limit), Number(offset)];
    const [rows] = await pool.query<RowDataPacket[]>(fullQuery, queryParams);

    res.json({
      data: rows as Internship[],
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
};

export const getFeaturedInternships = async (_req: Request, res: Response): Promise<void> => {
  try {
    const query = `
      ${BASE_QUERY}
      WHERE i.is_active = TRUE AND i.is_featured = TRUE
      ORDER BY i.created_at DESC
      LIMIT 6
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    res.json(rows as Internship[]);
  } catch (error) {
    console.error('Error fetching featured internships:', error);
    res.status(500).json({ error: 'Failed to fetch featured internships' });
  }
};

export const getInternshipById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const query = `${BASE_QUERY} WHERE i.id = ? LIMIT 1`;
    const [rows] = await pool.query<RowDataPacket[]>(query, [id]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Internship not found' });
      return;
    }

    res.json(rows[0] as Internship);
  } catch (error) {
    console.error('Error fetching internship details:', error);
    res.status(500).json({ error: 'Failed to fetch internship details' });
  }
};

export const createInternship = async (req: Request, res: Response): Promise<void> => {
  try {
    const { company_id, category_id, title, description, requirements, location, work_type, stipend, duration, deadline, is_student_position, student_term, is_featured } = req.body;

    if (!company_id || !category_id || !title || !description || !location) {
      res.status(400).json({ error: 'Missing required internship fields' });
      return;
    }

    const insertQuery = `
      INSERT INTO internships 
      (company_id, category_id, title, description, requirements, location, work_type, stipend, duration, deadline, is_student_position, student_term, is_featured, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)
    `;

    const [result] = await pool.query<ResultSetHeader>(insertQuery, [
      company_id,
      category_id,
      title,
      description,
      requirements || null,
      location,
      work_type || 'remote',
      stipend || null,
      duration || null,
      deadline || null,
      is_student_position !== undefined ? Boolean(is_student_position) : true,
      student_term || 'Summer 2027',
      Boolean(is_featured)
    ]);

    res.status(201).json({ success: true, internshipId: result.insertId });
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({ error: 'Failed to create internship' });
  }
};
