import express from 'express';
import { uploadMediaFile, getMediaByWedding, deleteMedia } from '../controllers/mediaController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('file'), uploadMediaFile);
router.get('/wedding/:weddingId', getMediaByWedding);
router.delete('/:id', protect, deleteMedia);

export default router;
