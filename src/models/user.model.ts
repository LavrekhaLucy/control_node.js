// import {model, Schema} from 'mongoose';
// import {IUser} from '../interfaces/user-interface';
//
//
// const UserSchema = new Schema({
//         name: {type: String, required: true},
//         email: {type: String, required: true, unique: true},
//         password: {type: String, required: true, select: false},
//         age: {type: Number, required: true},
//         phone: {type: String, required: false},
//         avatar: {type: String, required: false},
//         roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
//         isVerified: {type: Boolean, default: false},
//         isDeleted: {type: Boolean, default: false},
//         organizationId: {
//             type: Schema.Types.ObjectId,
//             ref: 'Organization',
//             default: null,
//         },
//     },
//      {
//          timestamps: true,
//          versionKey: false,
//
//      }
//  );
