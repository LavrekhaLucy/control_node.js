import { Permission } from "../models/permission.model";
import { IPermission } from "../interfaces/permission-interface";
import {HydratedDocument} from "mongoose";

class PermissionRepository {
    public async getAll():Promise<HydratedDocument<IPermission>[]> {
        return Permission.find();
    }

    public async getById(id: string):Promise<HydratedDocument<IPermission> | null> {
        return Permission.findById(id);
    }

    public async create(dto: Partial<IPermission>):Promise<HydratedDocument<IPermission>> {
        return Permission.create(dto);
    }

    public async update(id: string, dto: Partial<IPermission>):Promise<HydratedDocument<IPermission>> {
        return Permission.findByIdAndUpdate(id, dto, { new: true });
    }

    public async delete(id: string):Promise<void> {
        await Permission.findByIdAndDelete(id);
    }
}

export const permissionRepository = new PermissionRepository();

