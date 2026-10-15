/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/server.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';

import healthRoutes from './routes/healthRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || '*';

// Middleware
app.use(cors({
  origin: CLIENT_ORIGIN === '*' ? '*' : [CLIENT_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);

// Root route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Mainstay Full-Stack API Server is running',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

// 404 Handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start Server & Test Database Connection
app.listen(PORT, '0.0.0.0', async () => {
  console.log(` Mainstay Backend Server running at http://0.0.0.0:${PORT}`);
  await testDbConnection();
});
