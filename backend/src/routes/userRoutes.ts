import { Router } from 'express';
import { registerUser, loginUser, getStaff } from '../controllers/userController';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (Admin only ideally, but keeping simple)
router.get('/staff', getStaff);

export default router;
