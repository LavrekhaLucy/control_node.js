
import { IRole } from '../interfaces/role-interface';
import { RoleEnum } from '../enums/role.enum';
import { Types } from 'mongoose';
import {Role} from '../models/role.model';

export  async function mapRolesToEnum(roles: Types.ObjectId[] | IRole[]): Promise<RoleEnum[]> {
    if (roles.length === 0) return [];

    if ('name' in roles[0]) {
        // roles вже розгорнуті як IRole[]
        return (roles as IRole[]).map(role => role.name as RoleEnum);
    } else {
        // roles збережені як ObjectId[], підтягуємо з БД
        const roleIds = roles as Types.ObjectId[];
        const rolesFromDB: IRole[] = await Role.find({ _id: { $in: roleIds } });
        return rolesFromDB.map(role => role.name as RoleEnum);
    }
}
