import {ObjectId} from "../types/common";
import {IRole} from './role-interface';


export interface IToken {
    _id?: ObjectId;
    _userId: ObjectId;
    accessToken: string;
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITokenPayload {
    userId: string;
    roles: ObjectId[] | IRole[];
    email?: string;
    name?: string;

}

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}


