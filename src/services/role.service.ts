import {Role} from "../models/role.model";

class RoleService {

    public async  getDefaultRole() {
        let role = await Role.findOne({ name: 'buyer' });
        if (!role) {
            role = await Role.create({
                name: 'buyer',
                permissions: ['VIEW_CAR']
            });
        }
        return role;
    }
}
export const roleService = new RoleService();

