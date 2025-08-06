import {ObjectId} from 'mongoose';

export interface IOrganization {
    _id: string;
    name: string;
    type: 'dealer';
    roles: ObjectId[];
    users: ObjectId[];
}