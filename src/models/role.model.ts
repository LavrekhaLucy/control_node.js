import {model, Schema} from 'mongoose';
import {RoleScope} from '../enums/enum.role-scope';
import {IRole} from '../interfaces/role-interface';


const RoleSchema = new Schema({
        name: {type: String, required: true, unique: true,},
        scope: {type: String,  enum: Object.values(RoleScope), required: true,},
        permissions: [{
                type: Schema.Types.ObjectId,
                ref: 'Permission'},],
        },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Role = model<IRole>('Role', RoleSchema);

