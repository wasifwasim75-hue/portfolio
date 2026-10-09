import { Router } from 'express';
import { ExperienceController } from '../controllers/experienceController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', ExperienceController.getAll);
router.get('/:id', ExperienceController.getById);

// Admin Protected Routes
router.post('/', authenticate, ExperienceController.create);
router.put('/:id', authenticate, ExperienceController.update);
router.delete('/:id', authenticate, ExperienceController.delete);

export default router;
