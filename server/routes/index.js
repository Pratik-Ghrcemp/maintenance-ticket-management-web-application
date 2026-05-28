import { Router } from 'express';

import authRoutes from './auth.routes.js';
import healthRoutes from './health.routes.js';
import masterDataRoutes from './masterData.routes.js';
import ticketRoutes from './ticket.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/health', healthRoutes);
router.use('/master-data', masterDataRoutes);
router.use('/tickets', ticketRoutes);

export default router;
