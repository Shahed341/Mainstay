/**
 * Vercel Serverless Function Handler
 * Wraps the Express server for Vercel deployment
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createPool, PoolOptions } from 'mysql2/promise';

// Create Express app
const app = express();

// Database pool (lazy initialization)
let pool: ReturnType<typeof createPool> | null = null;

function getPool() {
  if (!pool) {
    const config: PoolOptions = {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mainstay',
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
    };
    pool = createPool(config);
  }
  return pool;
}

// Middleware
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? [process.env.CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    const connection = await getPool().getConnection();
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

// Categories
app.get('/api/categories', async (_req: Request, res: Response) => {
  try {
    const [rows] = await getPool().query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Featured Internships
app.get('/api/internships/featured', async (_req: Request, res: Response) => {
  try {
    const [rows] = await getPool().query(
      'SELECT * FROM internships WHERE is_featured = 1 ORDER BY created_at DESC LIMIT 6'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching featured internships:', error);
    res.status(500).json({ error: 'Failed to fetch featured internships' });
  }
});

// Get all internships with filters
app.get('/api/internships', async (req: Request, res: Response) => {
  try {
    const {
      search,
      category,
      work_type,
      location,
      student_only,
      student_term,
      company,
      page = '1',
      limit = '12'
    } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const offset = (pageNum - 1) * limitNum;

    let whereConditions: string[] = [];
    let params: any[] = [];

    if (search) {
      whereConditions.push('(title LIKE ? OR description LIKE ? OR company LIKE ?)');
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }
    if (category && category !== 'all') {
      whereConditions.push('category_id = ?');
      params.push(category);
    }
    if (work_type && work_type !== 'all') {
      whereConditions.push('work_type = ?');
      params.push(work_type);
    }
    if (location) {
      whereConditions.push('location LIKE ?');
      params.push(`%${location}%`);
    }
    if (student_only === 'true') {
      whereConditions.push('student_only = 1');
    }
    if (student_term && student_term !== 'all') {
      whereConditions.push('student_term = ?');
      params.push(student_term);
    }
    if (company && company !== 'all') {
      whereConditions.push('company = ?');
      params.push(company);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const [countResult] = await getPool().query(
      `SELECT COUNT(*) as total FROM internships ${whereClause}`,
      params
    );
    const total = (countResult as any)[0].total;

    // Get paginated results
    const [rows] = await getPool().query(
      `SELECT * FROM internships ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limitNum, offset]
    );

    res.json({
      data: rows,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// Get internship by ID
app.get('/api/internships/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows] = await getPool().query('SELECT * FROM internships WHERE id = ?', [id]);
    const internships = rows as any[];

    if (internships.length === 0) {
      return res.status(404).json({ error: 'Internship not found' });
    }
    res.json(internships[0]);
  } catch (error) {
    console.error('Error fetching internship:', error);
    res.status(500).json({ error: 'Failed to fetch internship' });
  }
});

// Create internship
app.post('/api/internships', async (req: Request, res: Response) => {
  try {
    const {
      title, company, location, work_type, description,
      requirements, category_id, student_only, student_term,
      application_url, is_featured
    } = req.body;

    const [result] = await getPool().query(
      `INSERT INTO internships
       (title, company, location, work_type, description, requirements, category_id, student_only, student_term, application_url, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, company, location, work_type, description, requirements, category_id, student_only || false, student_term, application_url, is_featured || false]
    );

    res.status(201).json({ success: true, id: (result as any).insertId });
  } catch (error) {
    console.error('Error creating internship:', error);
    res.status(500).json({ error: 'Failed to create internship' });
  }
});

// Submit application
app.post('/api/applications', async (req: Request, res: Response) => {
  try {
    const {
      internship_id, first_name, last_name, email, phone,
      resume_url, cover_letter, additional_info
    } = req.body;

    if (!internship_id || !first_name || !last_name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const [result] = await getPool().query(
      `INSERT INTO applications
       (internship_id, first_name, last_name, email, phone, resume_url, cover_letter, additional_info)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [internship_id, first_name, last_name, email, phone, resume_url, cover_letter, additional_info]
    );

    res.status(201).json({ success: true, message: 'Application submitted successfully', id: (result as any).insertId });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

// Root API route
app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Mainstay API Server',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/categories', '/api/internships', '/api/applications']
  });
});

// 404 handler for API routes
app.use('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
