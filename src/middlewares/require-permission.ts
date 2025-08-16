
import { Request, Response, NextFunction } from 'express';
import { hasPermission } from '../services/permission.service';
import { IUser } from '../interfaces/user-interface';
import { ApiError } from '../errors/api-error';

export const requirePermission = (permissionCode: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {

            const user = req.user as IUser | undefined;
            if (!user) throw new ApiError('Unauthorized', 401);

            console.log('USER PERMISSIONS:', req.user.permissions);

            const orgId = req.headers['x-org-id'] as string | undefined;

            const allowed = await hasPermission(user._id.toString(), permissionCode, orgId);

            if (!allowed) throw new ApiError('Forbidden: insufficient permissions', 403);

            next();
        } catch (err) {
            next(err);
        }
    };
};
