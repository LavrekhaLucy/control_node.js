// import {Types} from 'mongoose';
// import {userRepository} from '../repositories/user.repository';
// import {IRole} from '../interfaces/role-interface';
// import {IPermission} from '../interfaces/permission-interface';
//
// export const hasPermission = async (
//     userId: string,
//     permissionCode: string,
//     orgId?: string
// ): Promise<boolean> => {
//     try {
//         const objectId = new Types.ObjectId(userId);
//         const user = await userRepository.findByIdWithRoles(objectId);
//         if (!user) return false;
//
//         const roles = (user.roles || []) as Array<IRole & { permissions: IPermission[] }>;
//
//         for (const role of roles) {
//             const permissions = Array.isArray(role.permissions) ? role.permissions : [];
//             for (const permission of permissions) {
//                 if (permission?.code === permissionCode) return true;
//             }
//         }
//         const filteredRoles = roles.filter(role =>
//             !orgId || role.organizationId?.toString() === orgId
//         );
//
//         for (const role of filteredRoles) {
//             const permissions = Array.isArray(role.permissions) ? role.permissions : [];
//             for (const permission of permissions) {
//                 if (permission?.code === permissionCode) return true;
//             }
//         }
//
//         console.log('User roles and permissions:', roles.map(r => ({
//             name: r.name,
//             permissions: (r.permissions || []).map(p => p?.code)
//         })));
//
//         return false;
//     } catch (err) {
//         console.error('hasPermission error:', err);
//         return false;
//     }
// };

//
// import { userRepository } from '../repositories/user.repository';
// import { Types } from 'mongoose';
//
// export const hasPermission = async (userId: string, permissionCode: string): Promise<boolean> => {
// //     // Знаходимо користувача і підтягуємо ролі та permissions
// //     const user = await userRepository.findById(new Types.ObjectId(userId))
// //         .populate({
// //             path: 'roles',
// //             populate: { path: 'permissions' } // permissions у ролях
// //         });
// //
// //     if (!user) return false;
// //
// //     // Перевіряємо, чи є у будь-якій ролі потрібне право
// //     return user.roles.some((role: any) =>
// //         role.permissions.some((perm: any) => perm.code === permissionCode)
// //     );
// // };
//     const query = userRepository.findById(new Types.ObjectId(userId))
//         .populate({
//             path: 'roles',
//             populate: {path: 'permissions'}
//         });
//
//     const user = await query;
//
//     if (!user) return false;
//
//     return user.roles.some((role: any) =>
//         role.permissions.some((perm: any) => perm.code === permissionCode)
//     );
// };

import {Types} from 'mongoose';
import {userRepository} from '../repositories/user.repository';
import {IPermission} from '../interfaces/permission-interface';
import {IRole} from '../interfaces/role-interface';

export const hasPermission = async (
    userId: string,
    permissionCode: string,
    orgId?: string
): Promise<boolean> => {
    try {
        const objectId = new Types.ObjectId(userId);
        const user = await userRepository.findByIdWithRoles(objectId);
        if (!user) return false;

        // Використовуємо тільки filteredRoles
        const filteredRoles = (user.roles || []) as Array<IRole & { permissions: IPermission[] }>;
        const rolesToCheck = filteredRoles.filter(role =>
            !orgId || role.organizationId?.toString() === orgId
        );

        for (const role of rolesToCheck) {
            const permissions = Array.isArray(role.permissions) ? role.permissions : [];
            for (const permission of permissions) {
                if (permission?.code === permissionCode) return true;
            }
        }

        console.log('User roles and permissions:', rolesToCheck.map(r => ({
            name: r.name,
            permissions: (r.permissions || []).map(p => p?.code)
        })));

        return false;
    } catch (err) {
        console.error('hasPermission error:', err);
        return false;
    }
};

