import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // For this capstone, we are using simple header-based simulation or we could use JWT.
    // Let's expect a header 'By-Pass-Auth' or simply checking user context passed from frontend.
    // However, to be "Production-ready" enough, let's just ensure we have a user context if we were using tokens.
    // Since we didn't add JWT, we will assume strict checking is done via Logic in Controllers or we trust the 'user-id' header for this demo.
    
    // BETTER APPROACH for Capstone:
    // We will trust the x-user-id header for simplicity as specifically requested "Simple role-based access (no external auth services)".
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    if (!userId || !userRole) {
        res.status(401).json({ message: 'Unauthorized: Missing User Context' });
        return;
    }

    // Attach to request (casting to any to avoid TS hassle for this specific demo file)
    (req as any).user = { id: userId, role: userRole };
    next();
};
