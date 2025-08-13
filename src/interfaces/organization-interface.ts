import { ObjectId } from '../types/common';
import {RoleEnum} from '../enums/role.enum';

export interface IOrganization {
    _id: ObjectId;
    name: string;
    type: 'dealer';
    roles: ObjectId[] | RoleEnum[];
    users: ObjectId[];
}