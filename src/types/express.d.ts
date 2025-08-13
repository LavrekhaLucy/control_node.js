import { IUser } from '../../interfaces/user.interface';

declare module 'express' {
    export interface Request {
        user?: IUser;
    }
}
