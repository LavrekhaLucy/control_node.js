import {model, Schema} from 'mongoose';
import {IUser} from "../interfaces/user-interface";


const UserSchema = new Schema({
         email: {type: String, required: true, unique: true},
         password: {type: String, required: true, select: false},
         roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
         organizationId: {
             type: Schema.Types.String,
             ref: 'organizations',
             default: null,
         },
     },
     {
         timestamps: true,
         versionKey: false,
         _id: false,
     }
 );
export const User = model<IUser>('users', UserSchema);
