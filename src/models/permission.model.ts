import {model, Schema} from 'mongoose';
import {IPermission} from "../interfaces/permission-interface";

const PermissionSchema = new Schema({
        code: {type: String, required: true, unique: true,},
        description: {type: String, required: true,},
    },
    {
        timestamps: true,
        versionKey: false,
    }

);

export const Permission = model<IPermission>('permissions', PermissionSchema);

