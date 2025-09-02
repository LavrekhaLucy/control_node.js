import {User} from '../models/user.model';
import {Role} from '../models/role.model';
import * as bcrypt from 'bcrypt';

export const seedAdmin = async () => {
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) return;

    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) throw new Error('Admin role must exist before creating admin user');

    const hashedPassword = await bcrypt.hash('AdminPassword123', 10);

    await User.create({
        name: 'Super Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        roles: [adminRole._id],
        isVerified: true,
    });

    console.log('Admin created: admin@example.com / AdminPassword123');
};