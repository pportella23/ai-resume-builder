import { Router } from 'express';
import authRoutes from './auth.routes';
import healthRoutes from './health.routes';
import resumeRoutes from './resumes.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/resumes', resumeRoutes);

// Placeholder routes for future implementation
// router.use('/ai', aiRoutes);
// router.use('/portfolios', portfolioRoutes);
// router.use('/subscriptions', subscriptionRoutes);

export default router;
