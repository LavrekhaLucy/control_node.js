import {ObjectId} from 'mongoose';
import {IRole} from './role-interface';


export interface IToken {
    _id?: ObjectId;
    accessToken: string;
    refreshToken: string;
    _userId: ObjectId;
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


