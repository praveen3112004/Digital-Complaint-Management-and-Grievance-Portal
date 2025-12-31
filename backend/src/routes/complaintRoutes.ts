import { Router } from 'express';
import { getComplaints, createComplaint, updateStatus, assignComplaint } from '../controllers/complaintController';
import { authMiddleware } from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, 'uploads/'); },
    filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

const router = Router();

router.use(authMiddleware); // apply to all complaint routes

router.get('/', getComplaints);
router.post('/', upload.single('image'), createComplaint);
router.put('/:id/status', updateStatus);
router.put('/:id/assign', assignComplaint);

export default router;
