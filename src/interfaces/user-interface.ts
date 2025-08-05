import {AccountType} from "../enums/enum-account-type";
import {Types} from "mongoose";
import {IRole} from "./role-interface";


export  interface IUser {
    _id: Types.ObjectId;
    email: string;
    password: string;
    roles: Types.ObjectId[] | IRole[];
    accountType: AccountType;
    createdAt?: Date;
    updatedAt?: Date;
}
