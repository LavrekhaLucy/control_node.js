import {Permission} from '../models/permission.model';
import {Role} from '../models/role.model';
import {IPermission} from '../interfaces/permission-interface';
import {Organization} from '../models/organization.model';
import {userRepository} from '../repositories/user.repository';
import {Types} from 'mongoose';
import {User} from '../models/user.model';


export const seedDatabase = async () => {
    try {
        const org = await Organization.findOneAndUpdate(
            { name: 'Toyota Dealership' },
            { $set: { address: 'Kyiv' } },
            { upsert: true, new: true }
        );


        // Дані для permission
        const permissionsData = [
            { code: 'CREATE_CAR', description: 'Створювати авто' },
            { code: 'EDIT_CAR', description: 'Редагувати авто' },
            { code: 'DELETE_CAR', description: 'Видаляти авто' },
            { code: 'BAN_USER', description: 'Банити користувачів' },
            { code: 'VERIFY_CAR', description: 'Перевіряти авто' },
            { code: 'MANAGE_SALON', description: 'Керувати автосалоном' },
        ];

        // Upsert permissions
        const permissions: IPermission[] = [];
        for (const perm of permissionsData) {
            const updatedPerm = await Permission.findOneAndUpdate(
                { code: perm.code },
                { $set: { description: perm.description } },
                { upsert: true, new: true }
            );
            permissions.push(updatedPerm);
        }

        // Дані для ролей
        const rolesData = [
            { name: 'buyer', scope: 'platform', permissions: [] },
            { name: 'seller', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR'] },
            { name: 'manager', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR', 'DELETE_CAR', 'BAN_USER', 'VERIFY_CAR', 'MANAGE_SALON'] },
            { name: 'admin', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR', 'DELETE_CAR', 'BAN_USER', 'VERIFY_CAR', 'MANAGE_SALON'] },
        ];

        // Upsert roles
        for (const role of rolesData) {
            const perms = permissions.filter(p => role.permissions.includes(p.code));
            await Role.findOneAndUpdate(
                { name: role.name },
                { $set: { scope: role.scope, permissions: perms.map(p => p._id) } },
                { upsert: true, new: true }
            );
        }
        // const user = await User.findOne({ email: 'example@gmail.com' });
        const user = await User.findOne({ email: 'example@gmail.com' }).populate({
            path: 'roles',
            populate: { path: 'permissions', model: 'Permission' }
        });

        const userId = new Types.ObjectId('689efc4e84c42323bd719138');
        const newUser = await userRepository.findByIdWithRoles(userId);

        console.log(user.roles.map(r => ({
            name: r.name,
            permissions: r.permissions?.map(p => p.code) || []
        })));






        const sellerRole = await Role.findOne({ name: 'seller' });
        if (sellerRole) {
            sellerRole.organizationId = org._id; // прив’язка до організації
            await sellerRole.save();
        }

        if (newUser && sellerRole) {
            newUser.roles = [sellerRole._id];       // ObjectId ролі
            newUser.organizationId = org._id;       // optional
            await newUser.save();
        }



        // const sellerRole = await Role.findOne({ name: 'seller' });
        // sellerRole.organizationId = org._id;
        // await sellerRole.save();
        //
        // if (user) {
        //     user.roles = [sellerRole._id];
        //     user.organizationId = org._id;
        //     await user.save();
        // }

        console.log('✅ Permissions and roles seeded successfully!');
    } catch (error) {
        console.error('Seed error:', error);
    }
};


//
// import { Permission } from '../models/permission.model';
// import { Role } from '../models/role.model';
// import { User } from '../models/user.model';
// import { Organization } from '../models/organization.model';
// import { IPermission } from '../interfaces/permission-interface';
//
// export const seedDatabase = async () => {
//     try {
//         // 1. Створюємо/оновлюємо організацію
//         const org = await Organization.findOneAndUpdate(
//             { name: 'Toyota Dealership' },
//             { $set: { address: 'Kyiv' } },
//             { upsert: true, new: true }
//         );
//
//         // 2. Permissions
//         const permissionsData = [
//             { code: 'CREATE_CAR', description: 'Створювати авто' },
//             { code: 'EDIT_CAR', description: 'Редагувати авто' },
//             { code: 'DELETE_CAR', description: 'Видаляти авто' },
//             { code: 'BAN_USER', description: 'Банити користувачів' },
//             { code: 'VERIFY_CAR', description: 'Перевіряти авто' },
//             { code: 'MANAGE_SALON', description: 'Керувати автосалоном' },
//         ];
//
//         const permissions: IPermission[] = [];
//         for (const perm of permissionsData) {
//             const updatedPerm = await Permission.findOneAndUpdate(
//                 { code: perm.code },
//                 { $set: { description: perm.description } },
//                 { upsert: true, new: true }
//             );
//             permissions.push(updatedPerm);
//         }
//
//         // 3. Ролі
//         const rolesData = [
//             { name: 'buyer', scope: 'platform', permissions: [] },
//             { name: 'seller', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR'] },
//             { name: 'manager', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR', 'DELETE_CAR', 'BAN_USER', 'VERIFY_CAR', 'MANAGE_SALON'] },
//             { name: 'admin', scope: 'platform', permissions: ['CREATE_CAR', 'EDIT_CAR', 'DELETE_CAR', 'BAN_USER', 'VERIFY_CAR', 'MANAGE_SALON'] },
//         ];
//
//         const roleMap: Record<string, any> = {};
//
//         for (const role of rolesData) {
//             const perms = permissions.filter(p => role.permissions.includes(p.code));
//             const updatedRole = await Role.findOneAndUpdate(
//                 { name: role.name },
//                 {
//                     $set: {
//                         scope: role.scope,
//                         permissions: perms.map(p => p._id),
//                         organizationId: org._id
//                     }
//                 },
//                 { upsert: true, new: true }
//             );
//             roleMap[role.name] = updatedRole;
//         }
//
//         // 4. Призначаємо користувачу роль seller
//         const user = await User.findOne({ email: 'example@gmail.com' });
//         if (user && roleMap['seller']) {
//             user.roles = [roleMap['seller']._id];
//             user.organizationId = org._id;
//             await user.save();
//         }
//
//         console.log('✅ Permissions, roles and user seeded successfully!');
//     } catch (error) {
//         console.error('Seed error:', error);
//     }
// };
