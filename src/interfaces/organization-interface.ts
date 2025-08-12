import {ObjectId} from 'mongoose';

export interface IOrganization {
    _id: ObjectId;
    name: string;
    type: 'dealer';
    roles: ObjectId[];
    users: ObjectId[];
}