/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/routes/healthRoutes.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Router, Request, Response } from 'express';
import pool from '../config/db.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({
      status: 'ok',
      service: 'mainstay-api',
      database: 'connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'degraded',
      service: 'mainstay-api',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Database error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
