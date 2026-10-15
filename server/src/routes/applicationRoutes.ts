/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/routes/applicationRoutes.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import { Router } from 'express';
import { submitApplication } from '../controllers/applicationController.js';

const router = Router();

router.post('/', submitApplication);

export default router;
