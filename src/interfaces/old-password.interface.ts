import {ObjectId} from "../types/common";

export interface IOldPassword {
    _id?: ObjectId;
    _userId: ObjectId;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}