import { Router } from 'express';
import { StatsController } from '../controllers/statsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, StatsController.getStats);

export default router;
