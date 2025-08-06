import mongoose from 'mongoose';
import { Permission } from '../models/permission.model';
import { Role } from '../models/role.model';
import { permissionsData, rolesData } from './seedData';
import {configs} from '../configs/config';

export const seedPermissionsAndRoles = async () => {
    await mongoose.connect(configs.MONGO_URI);

    await Permission.deleteMany({});
    await Role.deleteMany({});

    const permissions = await Permission.insertMany(permissionsData);

    const rolesWithPermissions = rolesData.map(role => {
        const perms = permissions.filter(p => role.permissions.includes(p.code));
        return {
            name: role.name,
            scope: role.scope,
            permissions: perms.map(p => p._id),
        };
    });

    await Role.insertMany(rolesWithPermissions);

    console.log('✅ Seed completed');
    await mongoose.disconnect();
};
