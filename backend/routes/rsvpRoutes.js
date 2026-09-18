import express from 'express';
import {
  submitRSVP,
  getAdminRSVPs,
  exportRSVPsCSV,
  deleteRSVP,
} from '../controllers/rsvpController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public RSVP submission
router.post('/', submitRSVP);

// Protected Admin RSVP management
router.get('/wedding/:weddingId', protect, getAdminRSVPs);
router.get('/wedding/:weddingId/export', protect, exportRSVPsCSV);
router.delete('/:id', protect, deleteRSVP);

export default router;
