import {Types} from 'mongoose';
import {IPermission} from './permission-interface'; // Імпортуємо інтерфейс дозволу


export interface IRole {

    _id: Types.ObjectId;
    name: string;
    organizationId: Types.ObjectId;
    permissions: Types.ObjectId[] | readonly IPermission[];
    createdAt?: Date;
    updatedAt?: Date;
}