/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/routes/categoryRoutes.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Router } from 'express';
import { getCategories } from '../controllers/categoryController.js';

const router = Router();

router.get('/', getCategories);

export default router;
