import {IRole} from '../interfaces/role-interface';
import {IUser} from '../interfaces/user-interface';
import {Role} from '../models/role.model';

class RoleRepository {
    public async getAll() {
        return Role.find();
    }

    public async getById(id: string) {
        return Role.findById(id).populate('permissions');
    }

    public async create(data: Partial<IRole>) {
        return Role.create(data);
    }

    public async update(id: string, data: Partial<IRole>) {
        return Role.findByIdAndUpdate(id, data, { new: true });
    }

    public async delete(id: string) {
        return Role.findByIdAndDelete(id);
    }

    public async getByName(name: IUser) {
        return Role.findOne({ name });
    }
}

export const roleRepository = new RoleRepository();
