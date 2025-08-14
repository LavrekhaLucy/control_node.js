// import mongoose from 'mongoose';
// import { Permission } from '../models/permission.model';
// import { Role } from '../models/role.model';
// import { permissionsData, rolesData } from './seedData';
// import {configs} from '../configs/config';
//
// export const seedPermissionsAndRoles = async () => {
//     await mongoose.connect(configs.MONGO_URI);
//
//     await Permission.deleteMany({});
//     await Role.deleteMany({});
//
//     const permissions = await Permission.insertMany(permissionsData);
//
//     const rolesWithPermissions = rolesData.map(role => {
//         const perms = permissions.filter(p => role.permissions.includes(p.code));
//         return {
//             name: role.name,
//             scope: role.scope,
//             permissions: perms.map(p => p._id),
//         };
//     });
//
//     await Role.insertMany(rolesWithPermissions);
//
//     console.log('✅ Seed completed');
//     await mongoose.disconnect();
// };


// import mongoose from 'mongoose';
// import { Permission } from '../models/permission.model';
// import { Role } from '../models/role.model';
// import { configs } from '../configs/config';
// import { PermissionEnum, RoleEnum } from '../enums';
//
// export const seedPermissionsAndRoles = async () => {
//     await mongoose.connect(configs.MONGO_URI);
//
//     await Permission.deleteMany({});
//     await Role.deleteMany({});
//
//     // 1. Створюємо пермішни
//     const permissionsData = Object.values(PermissionEnum).map(code => ({
//         code,
//         description: `${code} permission`,
//     }));
//     const permissions = await Permission.insertMany(permissionsData);
//
//     // 2. Прив'язуємо до ролей
//     const getPermissionIds = (codes: PermissionEnum[]) =>
//         permissions.filter(p => codes.includes(p.code)).map(p => p._id);
//
//     const rolesData = [
//         { name: RoleEnum.BUYER, permissions: [] },
//         { name: RoleEnum.MANAGER, permissions: getPermissionIds([
//                 PermissionEnum.CREATE_CAR,
//                 PermissionEnum.EDIT_CAR,
//                 PermissionEnum.DELETE_CAR,
//                 PermissionEnum.BAN_USER,
//                 PermissionEnum.VERIFY_CAR,
//                 PermissionEnum.MANAGE_SALON,
//             ]) },
//         { name: RoleEnum.ADMIN, permissions: getPermissionIds(Object.values(PermissionEnum)) },
//     ];
//
//     await Role.insertMany(rolesData);
//
//     console.log('✅ Roles and permissions seeded');
//     await mongoose.disconnect();
// };
//
// seedPermissionsAndRoles();



import mongoose from 'mongoose';
import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';
import { configs } from '../configs/config';
import {PermissionEnum} from '../enums/permission.enum';
import {RoleEnum} from '../enums/role.enum';


export const seedPermissionsAndRoles = async () => {
    await mongoose.connect(configs.MONGO_URI);

    await Permission.deleteMany({});
    await Role.deleteMany({});

    const permissionsData = Object.values(PermissionEnum).map(code => ({
        code,
        description: `${code} permission`,
    }));
    const permissions = await Permission.insertMany(permissionsData);

    const getPermissionIds = (codes: PermissionEnum[]) =>
        permissions.filter(p => codes.includes(p.code)).map(p => p._id);

    const rolesData = [
        {
            name: RoleEnum.BUYER,
            permissions: getPermissionIds([PermissionEnum.VIEW_CAR]),
        },
        {
            name: RoleEnum.SELLER,
            permissions: getPermissionIds([
                PermissionEnum.CREATE_CAR,
                PermissionEnum.EDIT_CAR,
                PermissionEnum.VIEW_CAR,
            ]),
        },
        {
            name: RoleEnum.MANAGER,
            permissions: getPermissionIds([
                PermissionEnum.CREATE_CAR,
                PermissionEnum.EDIT_CAR,
                PermissionEnum.DELETE_CAR,
                PermissionEnum.BAN_USER,
                PermissionEnum.VERIFY_CAR,
                PermissionEnum.MANAGE_SALON,
                PermissionEnum.VIEW_CAR,
            ]),
        },
        {
            name: RoleEnum.ADMIN,
            permissions: getPermissionIds(Object.values(PermissionEnum)),
        },
    ];

    await Role.insertMany(rolesData);

    console.log('✅ Roles and permissions seeded');
    await mongoose.disconnect();
};

seedPermissionsAndRoles();

