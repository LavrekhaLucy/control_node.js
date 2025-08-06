//
// import { Request, Response, NextFunction } from 'express';
// import { hasPermission } from '../services/permission.service';
//
//
// export const requirePermission = (permissionCode: string) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const user = req.user; // припускаємо, що user вже є в req (наприклад, після jwt перевірки)
//
//         if (!user || !user._id) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }
//
//         const orgId = req.headers['x-org-id'] as string | undefined;
//
//         const allowed = await hasPermission(user._id.toString(), permissionCode, orgId);
//
//         if (!allowed) {
//             return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
//         }
//
//         next();
//     };
// };
