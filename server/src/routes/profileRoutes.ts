import { Router } from 'express';
import { getProfile, updateProfile, uploadFile } from '../controllers/profileController';
import { authenticate } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getProfile);
router.put('/', authenticate, updateProfile);
router.post('/upload', authenticate, upload.single('file'), uploadFile);

export default router;
