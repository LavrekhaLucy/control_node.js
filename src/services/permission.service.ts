// import {User} from "../models/user.model";
// import {IRole} from "../interfaces/role-interface";
//
//
// export const hasPermission = async (
//     userId: string,
//     permissionCode: string,
//     orgId?: string
// ): Promise<boolean> => {
//     const user = await User.findById(userId).populate({
//         path: 'roles',
//         match: orgId ? { organizationId: orgId } : {},
//         populate: {
//             path: 'permissions',
//         },
//     });
//
//     if (!user) return false;
//
//     const roles = user.roles as IRole[];
//
//     for (const role of user.roles) {
//         for (const perm of role.permissions) {
//             if (perm.code === permissionCode) return true;
//         }
//     }
//
//     return false;
// };

//
// import {User} from "../models/user.model";
// import {IRole} from "../interfaces/role-interface";
// import {IPermission} from "../interfaces/permission-interface";
//
// export const hasPermission = async (
//     userId: string,
//     permissionCode: string,
//     orgId?: string
// ): Promise<boolean> => {
//     // Шукаємо користувача і заселяємо його ролі та дозволи
//     const user = await User.findById(userId).populate({
//         path: 'roles',
//         match: orgId ? { organizationId: orgId } : {},
//         populate: {
//             path: 'permissions',
//             model: 'Permission' // Явно вказуємо модель для populate, це гарна практика
//         },
//         model: 'Role' // Явно вказуємо модель для populate, це гарна практика
//     });
//
//     // Перевіряємо, чи користувача знайдено
//     if (!user) {
//         return false;
//     }
//
//     // Твердження типу: тут ми повідомляємо TypeScript,
//     // що після populate `user.roles` є масивом об'єктів IRole.
//     const rolesWithPermissions = user.roles as (IRole & { permissions: IPermission[] })[];
//
//     // Проходимося по кожній ролі
//     for (const role of rolesWithPermissions) {
//         // Перевіряємо, чи у ролі є дозволи
//         if (role.permissions && Array.isArray(role.permissions)) {
//             // Проходимося по кожному дозволу в ролі
//             for (const perm of role.permissions) {
//                 // Перевіряємо, чи код дозволу співпадає
//                 if (perm.code === permissionCode) {
//                     return true;
//                 }
//             }
//         }
//     }
//
//     // Якщо ми пройшли всі цикли і не знайшли збігу
//     return false;
// };
//
