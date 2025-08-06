import {ObjectId} from 'mongoose';

export interface IPermission{

    _id: ObjectId;
    code: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

