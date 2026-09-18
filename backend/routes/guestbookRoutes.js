import express from 'express';
import {
  submitBlessing,
  getPublicBlessings,
  getAdminBlessings,
  updateBlessingStatus,
  deleteBlessing,
} from '../controllers/guestbookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', submitBlessing);
router.get('/wedding/:weddingId', getPublicBlessings);

// Protected Admin routes
router.get('/wedding/:weddingId/admin', protect, getAdminBlessings);
router.patch('/:id', protect, updateBlessingStatus);
router.delete('/:id', protect, deleteBlessing);

export default router;
