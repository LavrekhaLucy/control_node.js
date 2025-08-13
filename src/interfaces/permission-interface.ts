import { ObjectId } from '../types/common';

export interface IPermission{

    _id: ObjectId;
    code: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

