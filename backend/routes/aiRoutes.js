import express from 'express';
import { generateWeddingContent } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateWeddingContent);

export default router;
