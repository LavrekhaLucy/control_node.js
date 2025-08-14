import {model, Schema} from 'mongoose';
import {AccountType} from '../enums/account-type.enum';
import {IUser} from '../interfaces/user-interface';
import {RoleEnum} from '../enums/role.enum';



const UserSchema = new Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, select: false},
        age: {type: Number, required: true},
        phone: {type: String, required: false},
        avatar: {type: String, required: false},
        roles: { type: [String], enum: Object.values(RoleEnum), default: [RoleEnum.BUYER] },
        isVerified: {type: Boolean, default: false},
        isDeleted: {type: Boolean, default: false},
        organizationId: {
            type: Schema.Types.ObjectId,
            ref: 'Organization',
            default: null,
        },
        accountType: {
            type: String,
            enum: Object.values(AccountType),
            default: AccountType.BASE,
        },
    },
     {
         timestamps: true,
         versionKey: false,

     }
 );
export const User = model<IUser>('User', UserSchema);

//
// import mongoose, {Document, Schema} from 'mongoose';
//
// export interface IUser extends Document {
//     name: string;
//     age: number;
//     email: string;
//     password: string;
//     accountType: string;
//     role: string[];
// }
//
// const userSchema = new Schema<IUser>(
//     {
//         name: { type: String, required: true },
//         age: { type: Number, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         accountType: { type: String, required: true, enum: ['base', 'premium'] },
//         role: {
//             type: [String],
//             enum: ['buyer', 'seller', 'manager', 'admin'],
//             default: ['buyer']
//         },
//
//            },
//     {
//         timestamps: true
//     }
// );
//
// export const User = mongoose.model<IUser>('User', userSchema);