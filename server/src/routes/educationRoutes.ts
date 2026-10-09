import { Router } from 'express';
import { EducationController } from '../controllers/educationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', EducationController.getAll);
router.get('/:id', EducationController.getById);

// Admin Protected Routes
router.post('/', authenticate, EducationController.create);
router.put('/:id', authenticate, EducationController.update);
router.delete('/:id', authenticate, EducationController.delete);

export default router;
