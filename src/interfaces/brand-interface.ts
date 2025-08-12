import {ObjectId} from "mongoose";

export interface IBrand {
    _id?: ObjectId;
    name: string;
    createdAt?: Date;
}
