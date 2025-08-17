import {NextFunction, Request, Response} from 'express';
import {IUser} from '../interfaces/user-interface';
import {PermissionEnum} from '../enums/permission.enum';


export const requirePermissionMiddleware = (permissionCode: PermissionEnum) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as IUser;
            if (!user) return res.status(401).json({message: 'Unauthorized'});

            console.log('USER ROLES AND PERMISSIONS:', user.roles);

            const isSuperUser = user.roles?.some(role => role.permissions.includes(PermissionEnum.ALL));
            if (isSuperUser) return next();

            const hasPermission = user.roles?.some(role => role.permissions.includes(permissionCode));

            if (!hasPermission) return res.status(403).json({ message: `You do not have permission to ${permissionCode.replace('_', ' ')}` });

            next();
        } catch (err) {
            next(err);
        }
    };
};
