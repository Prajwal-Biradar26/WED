import express from 'express';
import {
  getPublicWeddingBySlug,
  getMyWeddings,
  getWeddingById,
  createWedding,
  updateWedding,
  publishWedding,
  deleteWedding,
} from '../controllers/weddingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route for wedding invitations
router.get('/public/:slug', getPublicWeddingBySlug);

// Private authenticated routes
router.get('/my', protect, getMyWeddings);
router.get('/:id', protect, getWeddingById);
router.post('/', protect, createWedding);
router.put('/:id', protect, updateWedding);
router.patch('/:id/publish', protect, publishWedding);
router.delete('/:id', protect, deleteWedding);

export default router;
