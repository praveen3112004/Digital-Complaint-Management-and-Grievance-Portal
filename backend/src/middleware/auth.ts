import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.headers['x-user-id'];
    const userRole = req.headers['x-user-role'];

    if (!userId || !userRole) {
        res.status(401).json({ message: 'Unauthorized: Missing User Context' });
        return;
    }

    (req as any).user = { id: userId, role: userRole };
    next();
};
