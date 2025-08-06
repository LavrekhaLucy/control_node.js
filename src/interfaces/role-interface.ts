import {IPermission} from './permission-interface';
import {Types} from 'mongoose';


export interface IRole {

    _id: Types.ObjectId;
    name: string;
    organizationId: Types.ObjectId;
    permissions: Types.ObjectId[] | IPermission[];
    createdAt?: Date;
    updatedAt?: Date;
}

