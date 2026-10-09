import { Router } from 'express';
import { SkillController } from '../controllers/skillController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', SkillController.getAll);
router.get('/grouped', SkillController.getGrouped);
router.get('/:id', SkillController.getById);

// Admin Protected Routes
router.post('/', authenticate, SkillController.create);
router.put('/:id', authenticate, SkillController.update);
router.delete('/:id', authenticate, SkillController.delete);

export default router;
