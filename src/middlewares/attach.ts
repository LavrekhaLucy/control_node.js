// middlewares/permission.middleware.ts
import {NextFunction, Request, Response} from 'express';
import {IUser} from '../interfaces/user-interface';
import {userRepository} from '../repositories/user.repository';
import {ApiError} from '../errors/api-error';
import {Types} from 'mongoose';

// export const attachUserWithPermissions = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const user = req.user as IUser;
//         if (!user) throw new ApiError('Unauthorized', 401);
//
//         // Завантажуємо користувача з ролями та permissions
//         const fullUser = await userRepository.findByIdWithRoles(user._id)
//
//         if (!fullUser) throw new ApiError('User not found', 401);
//
//         // Формуємо зручний формат для перевірки permission
//         const rolesWithPermissions = (fullUser.roles || []).map(role => ({
//             _id: role._id,
//             name: role.name,
//             scope: role.scope,
//             permissions: (role.permissions || []).map(p => p.code), // тут будуть коди permission
//         }));
//
//         req.user = {
//             _id: fullUser._id.toString(),
//             name: fullUser.name,
//             email: fullUser.email,
//             roles: rolesWithPermissions,
//         };
//
//         next();
//     } catch (err) {
//         next(err);
//     }
// };

export interface IUserWithPermissions {
    _id: string; // рядок, бо в JWT і в req.user краще string
    name: string;
    email: string;
    roles: {
        _id: string;
        name: string;
        scope: string;
        permissions: string[];
    }[];
}
export const attachUserWithPermissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = req.user as IUser;
        if (!user) throw new ApiError('Unauthorized', 401);

        // Конвертуємо рядок в ObjectId для пошуку в БД
        const userObjectId = new Types.ObjectId(user._id);

        const fullUser = await userRepository.findByIdWithRoles(userObjectId);
        if (!fullUser) throw new ApiError('User not found', 401);

        // Формуємо формат для middleware
        const rolesWithPermissions = (fullUser.roles || []).map(role => ({
            _id: role._id.toString(),
            name: role.name,
            scope: role.scope,
            permissions: (role.permissions || []).map(p => p.code),
        }));

        const userForMiddleware: IUserWithPermissions = {
            _id: fullUser._id.toString(),
            name: fullUser.name,
            email: fullUser.email,
            roles: rolesWithPermissions,
        };

        req.user = userForMiddleware as unknown as IUser; // типізація для Express

        next();
    } catch (err) {
        next(err);
    }
};









// Перевірка конкретного permission
export const requirePermission = (permissionCode: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser;
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        const isSuperUser = user.roles?.some(r => r.permissions.includes('all'));
        if (isSuperUser) return next();

        const hasPermission = user.roles?.some(r => r.permissions.includes(permissionCode));
        if (!hasPermission)
            return res.status(403).json({ message: `You do not have permission to ${permissionCode.replace('_', ' ')}` });

        next();
    };
};
