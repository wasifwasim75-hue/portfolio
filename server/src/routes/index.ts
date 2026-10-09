import { Router } from 'express';
import projectRoutes from './projectRoutes';
import experienceRoutes from './experienceRoutes';
import educationRoutes from './educationRoutes';
import skillRoutes from './skillRoutes';
import contactRoutes from './contactRoutes';
import authRoutes from './authRoutes';
import statsRoutes from './statsRoutes';
import profileRoutes from './profileRoutes';

const router = Router();

router.use('/profile', profileRoutes);
router.use('/projects', projectRoutes);
router.use('/experiences', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/skills', skillRoutes);
router.use('/contact', contactRoutes);
router.use('/auth', authRoutes);
router.use('/stats', statsRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
