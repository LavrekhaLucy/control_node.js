import {IRole} from '../interfaces/role-interface';
import {Role} from '../models/role.model';
import {UserRole} from '../enums/user-role.enum';
import {HydratedDocument} from 'mongoose';

class RoleRepository {
    public async getAll():Promise<HydratedDocument<IRole>[]> {
        return Role.find().populate('permissions');
    }

    public async getById(id: string):Promise<HydratedDocument<IRole> | null> {
        return Role.findById(id).populate('permissions');
    }

    public async create(dto: Partial<IRole>):Promise<HydratedDocument<IRole>> {
        return Role.create(dto);
    }

    public async update(id: string, dto: Partial<IRole>):Promise<HydratedDocument<IRole>> {
        return Role.findByIdAndUpdate(id, dto, { new: true });
    }

    public async delete(id: string):Promise<void> {
        await Role.findByIdAndDelete(id);
    }

    public async getByName(name: UserRole):Promise<HydratedDocument<IRole> | null> {
        return Role.findOne({ name }).populate('permissions');
    }
}

export const roleRepository = new RoleRepository();

