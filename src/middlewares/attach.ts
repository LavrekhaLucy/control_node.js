// export interface IUserForPermissions {
//     _id: string;  // string після toString()
//     name: string;
//     email: string;
//     roles: {
//         _id: string;
//         name: string;
//         scope: string;
//         permissions: string[]; // масив кодів permission
//     }[];
// }
// import { Request, Response, NextFunction } from 'express';
// import { userRepository } from '../repositories/user.repository';
//
//
// export const attachUserWithPermissions = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     try {
//         const user = req.user as { _id: string }; // отримали ID користувача з токена
//         if (!user) throw new Error('Unauthorized');
//
//         const fullUser = await userRepository.findByIdWithRoles(user._id);
//         if (!fullUser) throw new Error('User not found');
//
//         const rolesWithPermissions = (fullUser.roles || []).map(role => ({
//             _id: role._id.toString(),
//             name: role.name,
//             scope: role.scope,
//             permissions: (role.permissions || []).map(p => p.code),
//         }));
//
//         req.user = {
//             _id: fullUser._id.toString(),
//             name: fullUser.name,
//             email: fullUser.email,
//             roles: rolesWithPermissions,
//         } as IUserForPermissions;
//
//         next();
//     } catch (err) {
//         next(err);
//     }
// };