import { Permission } from '../models/permission.model';
import { IPermission } from '../interfaces/permission-interface';

class PermissionRepository {
    public async upsert(code: string, description?: string): Promise<IPermission> {
        return Permission.findOneAndUpdate(
            { code },
            { $set: { description } },
            { upsert: true, new: true }
        ).exec();
    }

    public async findByCode(code: string): Promise<IPermission | null> {
        return Permission.findOne({ code }).exec();
    }

    public async findAll(): Promise<IPermission[]> {
        return Permission.find().exec();
    }
}

export const permissionRepository = new PermissionRepository();
