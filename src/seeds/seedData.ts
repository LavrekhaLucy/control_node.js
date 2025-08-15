
import {Permission} from '../models/permission.model';
import {Role} from '../models/role.model';
import {IPermission} from '../interfaces/permission-interface';


export const seedDatabase = async () => {
    try {
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

        console.log('✅ Permissions and roles seeded successfully!');
    } catch (error) {
        console.error('Seed error:', error);
    }
};

