import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { authenticate } from '../middleware/auth';
import { validateContactInput } from '../middleware/validator';

const router = Router();

// Public contact submission
router.post('/', validateContactInput, ContactController.create);

// Admin Protected Routes
router.get('/', authenticate, ContactController.getAll);
router.get('/:id', authenticate, ContactController.getById);
router.put('/:id/read', authenticate, ContactController.markAsRead);
router.delete('/:id', authenticate, ContactController.delete);

export default router;
