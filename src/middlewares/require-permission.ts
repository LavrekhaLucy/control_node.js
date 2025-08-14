import { Request, Response, NextFunction } from 'express';
import { hasPermission } from '../services/permission.service';
import {ApiError} from '../errors/api-error';


export const requirePermission = (permissionCode: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user || !user._id) throw new ApiError('Unauthorized', 401);

            const orgId = req.headers['x-org-id'] as string | undefined;
            const allowed = await hasPermission(user._id.toString(), permissionCode, orgId);

            if (!allowed) throw new ApiError('Forbidden: insufficient permissions', 403);

            next();
        } catch (err) {
            next(err);
        }
    };
};
//
// export const requirePermission = (permissionCode: string) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const user = req.user;
//
//         if (!user || !user._id) {
//             throw new ApiError('Unauthorized', 401, );
//             // return res.status(401).json({ message: });
//         }
//
//         const orgId = req.headers['x-org-id'] as string | undefined;
//
//         const allowed = await hasPermission(user._id.toString(), permissionCode, orgId);
//
//         if (!allowed) {
//             throw new ApiError('Forbidden: insufficient permissions', 403, );
//
//             // return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
//         }
//
//         next();
//     };
// };
