import {ObjectId} from 'mongoose';

export interface IOldPassword {
    _id?: ObjectId;
    password: string;
    _userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}