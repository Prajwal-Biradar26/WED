import express from 'express';
import {
  getStoryMilestones,
  createStoryMilestone,
  updateStoryMilestone,
  deleteStoryMilestone,
} from '../controllers/storyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/wedding/:weddingId', getStoryMilestones);
router.post('/wedding/:weddingId', protect, createStoryMilestone);
router.put('/:id', protect, updateStoryMilestone);
router.delete('/:id', protect, deleteStoryMilestone);

export default router;
