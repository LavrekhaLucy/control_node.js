import {model, Schema} from 'mongoose';
import {RoleScope} from '../enums/enum.role-scope';
import {IRole} from '../interfaces/role-interface';
import {UserRole} from '../enums/enum-user-role';


const RoleSchema = new Schema({
        name: {
                type: String,
                enum: Object.values(UserRole),
                required: true, unique: true,
        },
        organizationId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Organization',
            },
        scope: {
                type: String,
                enum: Object.values(RoleScope),
                required: true,
        },
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
