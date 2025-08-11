import {AccountType} from '../enums/account-type.enum';
import {ObjectId} from 'mongoose';
import {IRole} from './role-interface';


export  interface IUser {
    _id: ObjectId;
    email: string;
    password: string;
    roles: ObjectId[] | IRole[];
    accountType: AccountType;
    createdAt?: Date;
    updatedAt?: Date;
}


