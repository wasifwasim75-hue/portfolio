import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validateLoginInput } from '../middleware/validator';

const router = Router();

router.post('/login', validateLoginInput, AuthController.login);
router.get('/me', authenticate, AuthController.getMe);
router.post('/register', AuthController.register);

export default router;
