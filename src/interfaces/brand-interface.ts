import { ObjectId } from '../types/common';

export interface IBrand {
    _id?: ObjectId;
    name: string;
    createdAt?: Date;
}
