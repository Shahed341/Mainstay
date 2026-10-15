/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/controllers/categoryController.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Request, Response } from 'express';
import pool from '../config/db.js';
import { Category } from '../types/index.js';
import { RowDataPacket } from 'mysql2';

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows as Category[]);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error while fetching categories' });
  }
};
