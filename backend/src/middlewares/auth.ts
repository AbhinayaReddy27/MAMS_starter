
import { Request, Response, NextFunction } from 'express';

/**
 * Demo auth middleware:
 * - Reads x-demo-user-id and x-demo-role headers to simulate authentication.
 * - Replace with real JWT auth in production.
 */
export function demoAuth(req: Request, _res: Response, next: NextFunction) {
  const uid = req.header('x-demo-user-id');
  const role = req.header('x-demo-role') as 'ADMIN'|'OFFICER'|'CLERK'|undefined;
  if (uid && role) {
    (req as any).user = { id: uid, role };
  }
  next();
}

export function requireRole(...roles: Array<'ADMIN'|'OFFICER'|'CLERK'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    if (!roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  };
}
