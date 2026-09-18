import express from 'express';
import {
  getFamilyMembers,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from '../controllers/familyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/wedding/:weddingId', getFamilyMembers);
router.post('/wedding/:weddingId', protect, createFamilyMember);
router.put('/:id', protect, updateFamilyMember);
router.delete('/:id', protect, deleteFamilyMember);

export default router;
