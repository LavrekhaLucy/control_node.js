import {permissionRepository} from '../repositories/permission.repository';
import {roleRepository} from '../repositories/role.repository';
import {PermissionEnum} from '../enums/permission.enum';

export const seedDatabase = async () => {
    try {
            // --- Створюємо permissions ---
            const permissionsData = [
                { code: PermissionEnum.ALL, description: 'Full access (super admin only)' },
                { code: PermissionEnum.VIEW_CAR, description: 'View cars' },
                { code: PermissionEnum.CREATE_CAR, description: 'Create car' },
                { code: PermissionEnum.EDIT_CAR, description: 'Edit car' },
                { code: PermissionEnum.DELETE_CAR, description: 'Delete car' },
                { code: PermissionEnum.BAN_USER, description: 'Ban users' },
                { code: PermissionEnum.UNBAN_USER, description: 'Unban users' },
                { code: PermissionEnum.VIEW_USERS, description: 'View users' },
                { code: PermissionEnum.DELETE_USER, description: 'Delete users' },
                { code: PermissionEnum.VERIFY_CAR, description: 'Verify car ads' },
                { code: PermissionEnum.CREATE_MANAGER, description: 'Create manager accounts' },
                { code: PermissionEnum.MANAGE_SALON, description: 'Manage car salon' },
            ];

            const createdPermissions = [];
            for (const perm of permissionsData) {
                const updated = await permissionRepository.upsert(perm.code, perm.description);
                createdPermissions.push(updated);
            }

            // --- Допоміжна функція для отримання _id по коду ---
            // const findByCode = (code: PermissionEnum) =>
            //     createdPermissions.find(p => p.code === code)?._id!;

            // --- Створюємо ролі ---
            await roleRepository.upsert('buyer', 'platform', [
                (PermissionEnum.VIEW_CAR),
            ]);

            await roleRepository.upsert('seller', 'platform', [
                (PermissionEnum.CREATE_CAR),
                (PermissionEnum.EDIT_CAR),
                (PermissionEnum.VIEW_CAR),
            ]);

            await roleRepository.upsert('manager', 'platform', [
                (PermissionEnum.BAN_USER),
                (PermissionEnum.DELETE_CAR),
                (PermissionEnum.VERIFY_CAR),
                (PermissionEnum.MANAGE_SALON),
                (PermissionEnum.VIEW_CAR),
            ]);

            await roleRepository.upsert('admin', 'platform', [
                (PermissionEnum.ALL),
                (PermissionEnum.VIEW_CAR),
                (PermissionEnum.CREATE_CAR),
                (PermissionEnum.EDIT_CAR),
                (PermissionEnum.DELETE_CAR),
                (PermissionEnum.BAN_USER),
                (PermissionEnum.UNBAN_USER),
                (PermissionEnum.VIEW_USERS),
                (PermissionEnum.DELETE_USER),
                (PermissionEnum.CREATE_MANAGER),
                (PermissionEnum.MANAGE_SALON),
                (PermissionEnum.VERIFY_CAR),
            ]);

            console.log('Permissions and roles seeded successfully');

    } catch (error) {
        console.error(' Seed error:', error);
    }
};


// await roleRepository.upsert('buyer', 'platform', [
//     findByCode(PermissionEnum.VIEW_CAR),
// ]);
//
// await roleRepository.upsert('seller', 'platform', [
//     findByCode(PermissionEnum.CREATE_CAR),
//     findByCode(PermissionEnum.EDIT_CAR),
//     findByCode(PermissionEnum.VIEW_CAR),
// ]);
//
// await roleRepository.upsert('manager', 'platform', [
//     findByCode(PermissionEnum.BAN_USER),
//     findByCode(PermissionEnum.DELETE_CAR),
//     findByCode(PermissionEnum.VERIFY_CAR),
//     findByCode(PermissionEnum.MANAGE_SALON),
//     findByCode(PermissionEnum.VIEW_CAR),
// ]);
//
// const adminRole =  await roleRepository.upsert('admin', 'platform', [
//     findByCode(PermissionEnum.ALL),
//     findByCode(PermissionEnum.VIEW_CAR),
//     findByCode(PermissionEnum.CREATE_CAR),
//     findByCode(PermissionEnum.EDIT_CAR),
//     findByCode(PermissionEnum.DELETE_CAR),
//     findByCode(PermissionEnum.BAN_USER),
//     findByCode(PermissionEnum.UNBAN_USER),
//     findByCode(PermissionEnum.VIEW_USERS),
//     findByCode(PermissionEnum.DELETE_USER),
//     findByCode(PermissionEnum.CREATE_MANAGER),
//     findByCode(PermissionEnum.MANAGE_SALON),
//     findByCode(PermissionEnum.VERIFY_CAR),
// ]);