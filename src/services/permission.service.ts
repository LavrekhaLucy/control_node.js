// import {IRole} from '../interfaces/role-interface';
// import {IPermission} from '../interfaces/permission-interface';
// import {IUser} from '../interfaces/user-interface';
// import {userRepository} from "../repositories/user.repository";
//
//
// export const hasPermission = async (
//     userId: string,
//     permissionCode: string,
//     orgId?: string
// ): Promise<boolean> => {
//     const user = await userRepository.findById(userId).populate({
//         path: 'roles',
//         match: orgId ? { organizationId: orgId } : {},
//         populate: {
//             path: 'permissions',
//         },
//     });
//
//     if (!user) return false;
//
//
//     const populatedUser = user as IUser & {
//         roles: (IRole & { permissions: IPermission[] })[];
//     };
//
//     for (const role of populatedUser.roles) {
//         for (const permission of role.permissions) {
//             if (permission.code === permissionCode) {
//                 return true;
//             }
//         }
//     }
//     return false;
//
// };

import {IRole} from '../interfaces/role-interface';
import {IPermission} from '../interfaces/permission-interface';
import {userRepository} from '../repositories/user.repository';
import {Types} from 'mongoose';

export const hasPermission = async (
    userId: string,
    permissionCode: string,
    orgId?: string
): Promise<boolean> => {

    const objectId = new Types.ObjectId(userId);

    const user = await userRepository.findByIdWithRoles(objectId);

    if (!user) return false;

    const roles = orgId
        ? (user.roles as (IRole & { permissions: IPermission[] })[]).filter(
            (role) => role.organizationId.toString() === orgId
        )
        : (user.roles as (IRole & { permissions: IPermission[] })[]);

    for (const role of roles) {
        const permissions = Array.isArray(role.permissions) ? role.permissions : [];
        for (const permission of permissions) {
            if (permission.code === permissionCode) {
                return true;
            }
        }
    }
    console.log('User roles:', roles.map(r => ({
        name: r.name,
        org: r.organizationId?.toString(),
        permissions: r.permissions.map(p => p.code)
    })));

    return false;
};
// for (const role of roles) {
//     const permissions = Array.isArray(role.permissions) ? role.permissions : [];
//     for (const permission of permissions) {
//         if (permission.code === permissionCode) {
//             return true;
//         }
//     }
// }