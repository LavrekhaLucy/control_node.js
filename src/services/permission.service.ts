// import {IRole} from '../interfaces/role-interface';
// import {IPermission} from '../interfaces/permission-interface';
// import {userRepository} from '../repositories/user.repository';
// import {Types} from 'mongoose';
//
// export const hasPermission = async (
//     userId: string,
//     permissionCode: string,
//     orgId?: string
// ): Promise<boolean> => {
//
//     const objectId = new Types.ObjectId(userId);
//
//     const user = await userRepository.findByIdWithRoles(objectId);
//
//     if (!user) return false;
//
//     const roles = orgId
//         ? (user.roles as (IRole & { permissions: IPermission[] })[]).filter(
//             (role) => role.organizationId?.toString() === orgId
//         )
//         : (user.roles as (IRole & { permissions: IPermission[] })[]);
//
//
//     for (const role of roles) {
//         const permissions = Array.isArray(role.permissions) ? role.permissions : [];
//         for (const permission of permissions) {
//             if (permission.code === permissionCode) {
//                 return true;
//             }
//         }
//     }
//
//     console.log(user.roles?.map(r => ({
//         name: r.name,
//         permissions: r.permissions?.map(p => p.code) || []
//     })));
//
//     return false;
// };
import {Types} from 'mongoose';
import {userRepository} from '../repositories/user.repository';
import {IRole} from '../interfaces/role-interface';
import {IPermission} from '../interfaces/permission-interface';

export const hasPermission = async (
    userId: string,
    permissionCode: string,
    orgId?: string
): Promise<boolean> => {
    try {
        const objectId = new Types.ObjectId(userId);
        const user = await userRepository.findByIdWithRoles(objectId);
        if (!user) return false;

        // Type assertion: roles вже підвантажені
        const roles = ((user.roles as (IRole & { permissions: IPermission[] })[]) || [])
            .filter(role => role)
            .filter(role => !orgId || role.organizationId?.toString() === orgId);

        for (const role of roles) {
            const permissions = Array.isArray(role.permissions) ? role.permissions : [];
            for (const permission of permissions) {
                if (permission?.code === permissionCode) return true;
            }
        }

        console.log('User roles and permissions:', roles.map(r => ({
            name: r.name,
            permissions: (r.permissions || []).map(p => p?.code)
        })));

        return false;
    } catch (err) {
        console.error('hasPermission error:', err);
        return false;
    }
};
