import { Router } from 'express';
import { ProjectController } from '../controllers/projectController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', ProjectController.getAll);
router.get('/:id', ProjectController.getById);

// Admin Protected Routes
router.post('/', authenticate, ProjectController.create);
router.put('/:id', authenticate, ProjectController.update);
router.delete('/:id', authenticate, ProjectController.delete);

export default router;
