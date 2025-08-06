import {Types} from 'mongoose';

export interface IPermission{

    _id: Types.ObjectId;
    code: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

