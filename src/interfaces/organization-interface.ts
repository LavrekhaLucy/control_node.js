import {Types} from 'mongoose';

export interface IOrganization {
    _id: string;
    name: string;
    type: 'dealer';
    roles: Types.ObjectId[];
    users: Types.ObjectId[];
}