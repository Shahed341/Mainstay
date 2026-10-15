/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/routes/internshipRoutes.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Router } from 'express';
import {
  getInternships,
  getFeaturedInternships,
  getInternshipById,
  createInternship
} from '../controllers/internshipController.js';

const router = Router();

router.get('/', getInternships);
router.get('/featured', getFeaturedInternships);
router.get('/:id', getInternshipById);
router.post('/', createInternship);

export default router;
