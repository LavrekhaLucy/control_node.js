import mongoose from 'mongoose';
import {configs} from '../configs/config';
import {Role} from '../models/role.model';
import {Permission} from '../models/permission.model';

export const seedDatabase = async () => {
    try {
        await mongoose.connect(configs.MONGO_URI);


        // Очищаємо старі дані
        await Permission.deleteMany({});
        await Role.deleteMany({});

        // Створюємо пермішни
        const permissionsData = [
            {code: 'CREATE_CAR', description: 'Створювати авто'},
            {code: 'EDIT_CAR', description: 'Редагувати авто'},
            {code: 'DELETE_CAR', description: 'Видаляти авто'},
            {code: 'BAN_USER', description: 'Банити користувачів'},
            {code: 'VERIFY_CAR', description: 'Перевіряти авто'},
            {code: 'MANAGE_SALON', description: 'Керувати автосалоном'},
        ];

        const permissions = await Permission.insertMany(permissionsData);

        // Ролі та їх пермішни
        const rolesData = [
            {name: 'buyer', scope: 'platform', permissions: []},
            {name: 'seller', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR']},
            {name: 'manager', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR', 'DELETE_CAR', 'BAN_USER', 'VERIFY_CAR', 'MANAGE_SALON']},
            {name: 'admin', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR', 'DELETE_CAR', 'BAN_USER', 'VERIFY_CAR', 'MANAGE_SALON']},
        ];

        // Підставляємо _id пермішнів у ролі
        const rolesWithPermissions = rolesData.map(role => {
            const perms = permissions.filter(p => role.permissions.includes(p.code));
            return {
                name: role.name,
                scope: role.scope,
                permissions: perms.map(p => p._id),
            };
        });

        await Role.insertMany(rolesWithPermissions);

        console.log(' Permissions and roles seeded successfully!');
    } catch (error) {
        console.error(' Seed error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

// Запуск
seedDatabase().catch(err => {
    console.error(' Error seeding database:', err);
});



//     // 1️⃣ Створення пермішнів
//     const permissionsMap: Record<string, mongoose.Types.ObjectId> = {};
//     for (const perm of Object.values(PermissionEnum)) {
//         let permission = await Permission.findOne({ name: perm });
//         if (!permission) {
//             permission = await Permission.create({ name: perm });
//             console.log(`✅ Permission created: ${perm}`);
//         }
//         permissionsMap[perm] = permission._id;
//     }
//
//     // 2️⃣ Створення ролей з автоматичними пермішнами
//     const rolesPermissions: Record<RoleEnum, PermissionEnum[]> = {
//         [RoleEnum.ADMIN]: Object.values(PermissionEnum), // адмін має всі
//         [RoleEnum.SELLER]: [
//             PermissionEnum.MANAGE_PRODUCTS,
//             PermissionEnum.VIEW_ORDERS
//         ],
//         [RoleEnum.BUYER]: [
//             PermissionEnum.VIEW_PRODUCTS,
//             PermissionEnum.MAKE_PURCHASE
//         ]
//     };
//
//     for (const roleName of Object.values(RoleEnum)) {
//         let role = await Role.findOne({ name: roleName });
//         if (!role) {
//             role = await Role.create({
//                 name: roleName,
//                 permissions: rolesPermissions[roleName].map(perm => permissionsMap[perm])
//             });
//             console.log(`✅ Role created: ${roleName}`);
//         } else {
//             console.log(`ℹ️ Role already exists: ${roleName}`);
//         }
//     }
//
//     // 3️⃣ Створення типів акаунтів
//     for (const type of Object.values(AccountType)) {
//         const exists = await AccountTypeModel.findOne({ name: type });
//         if (!exists) {
//             await AccountTypeModel.create({ name: type });
//             console.log(`✅ Account type created: ${type}`);
//         } else {
//             console.log(`ℹ️ Account type already exists: ${type}`);
//         }
//     }
//
//     await mongoose.disconnect();
//     console.log('✅ Database seeding complete');
// };