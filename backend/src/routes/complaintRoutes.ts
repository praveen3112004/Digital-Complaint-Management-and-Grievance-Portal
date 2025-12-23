import { Router } from 'express';
import { getComplaints, createComplaint, updateStatus, assignComplaint } from '../controllers/complaintController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware); // Apply to all complaint routes

router.get('/', getComplaints);
router.post('/', createComplaint);
router.put('/:id/status', updateStatus);
router.put('/:id/assign', assignComplaint);

export default router;
