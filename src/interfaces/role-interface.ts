import {IPermission} from './permission-interface';
import { ObjectId } from '../types/common';


export interface IRole {

    _id: ObjectId;
    name: string;
    organizationId: ObjectId;
    permissions: ObjectId[] | IPermission[];
    createdAt?: Date;
    updatedAt?: Date;
}

